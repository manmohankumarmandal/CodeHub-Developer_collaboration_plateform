const fs=require("fs").promises;
const path=require("path");

async function addRepo(filePath){
    console.log("add COMMAND CALLED");
    const repoPath=path.resolve(process.cwd(),".apnaGit");
    const stagingPath=path.join(repoPath,"staging");
    try{
        await fs.mkdir(stagingPath,{recursive:true});
        const fileName=path.basename(filePath);
        await fs.copyFile(filePath,path.join(stagingPath,fileName));
        console.log(`File ${fileName} added to staging area`);

    }catch(err){
        console.log("Error addig file to staging area:",err);
    }
}
module.exports={addRepo};