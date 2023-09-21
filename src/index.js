import fs from 'node:fs';
import chalk from 'chalk';

const textRandom = "blablalbal[Custom containers](https://github.com/markdown-it/markdown-it-container)sdadassdsa Third paragraph of definition 2 [Definition lists](https://github.com/markdown-it/markdown-it-deflist)"



function treatErrors(errorObject, filePath){
    console.log('Error:', errorObject)
    throw new Error(
        chalk.red(errorObject.code, `There is an error on get the file on path: ${filePath}`)
    )
}

async function getLinksFromText(filePath){
    const encoding = 'utf-8'

    try{
        console.log('Try get text from file...')

        const textFromFile = await fs.promises.readFile(filePath, encoding)

        console.log('TYPE OF CONTENT FILE: ', typeof(textFromFile))

        return  getUrlLinks(textFromFile)

   
       
    }catch(error){
        treatErrors(error, filePath)
    }

}

function getUrlLinks(text){
    const regPatternUrl = new RegExp(/\[([^[\]]*?)\]\((https?:\/\/[^s?#.].[^\s]*)\)/gm)

    console.log('Getting and creating a Pattern object with constructor regEXP: ', regPatternUrl)

    const allResultPattern = [...text.matchAll(regPatternUrl)]

    const linksFromText = allResultPattern.map(response => ({
        [response[1]]: response[2]
    }))

    return linksFromText.length !== 0 ? linksFromText : 'The quantity of url links is nullable.'  
}

export default getLinksFromText