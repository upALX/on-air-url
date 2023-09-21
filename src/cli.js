import fs from 'node:fs';
import getLinksFromText from "./index.js";

const dirPath = process.argv

function showListLinks(links){
    console.log('The list of links captured in files is: ', links)
}

async function textProcess(dirPath){
    const path = dirPath[2]
   

    if (fs.lstatSync(path).isFile()){
        const linksObject = await getLinksFromText(path)
        showListLinks(linksObject)
    }else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path)

        files.forEach(async fileName => {
            const values = await getLinksFromText(`${path}/${fileName}`)

            showListLinks(values)
        });

    }

}

textProcess(dirPath)
