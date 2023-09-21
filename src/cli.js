import fs from 'node:fs';
import validateLinks from './validate-url.js';
import getLinksFromText from "./index.js";

const dirPath = process.argv

function showListLinks(links, validate=true, fileName=''){
    if (validate){
        console.log(`The list of links captured in file ${fileName} is: `, validateLinks(links))


    }else{
        console.log(`The list of links captured in file ${fileName} is: `, links)

    }
}

async function textProcess(dirPath){
    const path = dirPath[2]
    const validate = dirPath[3] === '--validate'

    console.log('Try verify if directory or file exists...', path)

    try{
        fs.lstatSync(path);
    }catch(error){
        if (error.code === "ERR_INVALID_ARG_TYPE"){
            console.log('Has not exists file or directory informed')
            return
        }
    }

    if (fs.lstatSync(path).isFile()){
        console.log('IS FILE')

        const linksObject = await getLinksFromText(path)

        showListLinks(linksObject, validate, path)

    }else if(fs.lstatSync(path).isDirectory()){
        console.log('IS DIR')

        const files = await fs.promises.readdir(path)

        files.forEach(async fileName => {
            const linksObject = await getLinksFromText(`${path}/${fileName}`)

            showListLinks(linksObject, validate, fileName)
        });
    }
}

textProcess(dirPath)
