const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const http=require("http");
const {Server}=require("socket.io");

const yargs=require('yargs');
const {hideBin}=require('yargs/helpers');
const {initRepo}=require("./controllers/init");
const { addRepo } = require('./controllers/aad');
const {commitRepo}=require('./controllers/commit');
const {pushRepo}=require('./controllers/push');
const {pullRepo}=require('./controllers/pull');
const {revertRepo}=require('./controllers/revert');
const mainRouter=require('./routes/main.router');
dotenv.config();

yargs(hideBin(process.argv))
.command("start","Start the server",{},startServer)
.command("init","initialise a new reopsitory",{},initRepo)

.command("add <file>", "add a file to the staging area",(yargs)=>{
    yargs.positional("file",{
        describe:"file to add to staging area",
        type:"string"
    })
}, 
(argv)=>{
    addRepo(argv.file);
}
)
.command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
.command("push","push commit to s3",{},pushRepo)
.command("pull","pull the commit from s3",{},pullRepo)
.command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Comit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
.demandCommand(1,"you need at least one command")
.help().argv;
function startServer(){
  console.log("ser logic called");
  const app=express();
  const port=process.env.PORT ||300
  const mongo_URI=process.env.MONGODB_URI;
  app.use(bodyParser.json());
  app.use(express.json());
  mongoose.connect(mongo_URI).then(()=>{
    console.log("mongodb connected successfully")
  }).catch((err)=>{
    console.log("mongdh not connected ",err);
  });
  app.use(cors({ origin: "*" }));

  app.use("/", mainRouter);
  


  let user = "test";
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("=====");
      console.log(user);
      console.log("=====");
      socket.join(userID);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD operations called");
    // CRUD operations
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
}