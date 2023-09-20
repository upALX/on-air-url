import fs from 'node:fs';
import chalk from 'chalk';

const text = "blablalbal[Custom containers](https://github.com/markdown-it/markdown-it-container)sdadassdsa Third paragraph of definition 2 [Definition lists](https://github.com/markdown-it/markdown-it-deflist)"

const regPatternUrl = new RegExp(/\[([^[\]]*?)\]\((https?:\/\/[^s?#.].[^\s]*)\)/)
const allResultPattern = [...text.matchAll(regPatternUrl)]
const results = allResultPattern.map(response => ({
    [response[1]]: response[2]
}))


function treatErrors(errorObject, filePath){
    throw new Error(
        chalk.red(errorObject.code, `There is an error on get the file on path: ${filePath}`)
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

const fileText = getFile('./files/text.md')

console.log(fileText)

//const matchPattern = 

