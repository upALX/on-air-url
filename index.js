import fs from 'node:fs';
import chalk from 'chalk';


function treatErrors(errorObject, filePath){
    throw new Error(
        chalk.red(errorObject.code, `Ocorreu um erro durante o processo de pegar o arquivo no caminho: ${filePath}`)
    )
}

function getFile(filePath){
    const encoding = 'utf-8'
    fs.readFile(filePath, encoding, (error, text) => {

        if (error){
            treatErrors(error, filePath)
        }
        console.log(chalk.yellow(text))
    })
}

getFile('./files/text')
