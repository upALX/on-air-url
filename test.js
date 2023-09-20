async function getGithubName(){
    const response = await fetch('https://api.github.com/users/upalx').then(
        (res) => {
            console.log(res.ok)

            return res.json()
        }
    )
    console.log(response)

}

getGithubName()
