const fs= require("fs").promises;
const path=require("path");
async function initRepo(){
    console.log("Init command callled");
    const repoPath=path.resolve(process.cwd(),".apnaGit");
    const commitsPath=path.join(repoPath,"commits");
    try{
        await fs.mkdir(repoPath,{recursive:true});
        await fs.mkdir(commitsPath,{recursive:true});
        await fs.writeFile(path.join(repoPath,"config.json"),
        JSON.stringify({bucket:process.env.S3_BUCKET}));
        console.log("Repostory initialized successfully");

    }catch(err){
        console.log("Error initializing repository:",err);

    }
}
module.exports={initRepo}; 