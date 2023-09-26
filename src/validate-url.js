function extractLinks(objectLinksToExtract){
    return objectLinksToExtract.map(objectLink => Object.values(objectLink).join())
}

export default async function validateLinks(links){

    const linksExtracted = extractLinks(links)

    const listNotExists = []

    try{
        for (let link of linksExtracted){
            console.log(`The link in list with length ${linksExtracted.length} and type ${typeof(linksExtracted)} is: `, link)
            
            const httpResponse = await fetch(link, {method: 'HEAD'}).then(
                objectResponse => {
                   if (objectResponse.ok){
                    console.log(`The link ${link} is OK`)
                   }else{
                    listNotExists.push()
                    return listNotExists
                   }
                }
            )
        }
    }catch(errorObject){
        console.log('Deu erro aqui', errorObject.stack)
    }

}