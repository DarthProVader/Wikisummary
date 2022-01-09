let baseUrl = window.location.href

function checkLocalStorage(word) {
    let lsWord = localStorage.getItem(word)
    if (lsWord != null) {
        return lsWord
    } else {
        return null
    }
}

document.querySelector(".search-form").addEventListener("submit", function (event) {
    event.preventDefault()
    /* let result = document.querySelector(".result")
    console.log(result) */
    document.querySelector(".second").innerHTML = ""

    let searchedWord = event.target.elements.searchWiki.value

    //check local storage for searched word if found write on the screen
    if (checkLocalStorage(searchedWord) != null) {

        let par = document.createElement("p")
        par.innerHTML = checkLocalStorage(searchedWord)
        document.querySelector(".second").appendChild(par)
    }
    //use API for finding the summary of the searched word
    else {
        let url = `${baseUrl}/search/${searchedWord}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            //server responds 404 - no such expression
            .then(function (response) {
                if (!response.ok) {

                    let par = document.createElement("p")
                    par.innerHTML = `Zadaný výraz neexistuje, zkuste prosím jiný.`
                    document.querySelector(".second").appendChild(par)

                    return null //for stopping the rest of the code from executing

                }
                return response.json()
                    //200 - add to the local storage and write on screen 
                    .then(data => {

                        let sWord = Object.keys(data)[0]
                        let res = Object.values(data)[0]

                        if (typeof res == "string") {

                            localStorage.setItem(sWord, res)

                            let par = document.createElement("p")
                            par.innerHTML = res
                            document.querySelector(".second").appendChild(par)
                        }
                        //list of pages if searched word is a disambiguation page 
                        else {
                            let par = document.createElement("p")
                            par.innerHTML = `Článek s tímto názvem: "${searchedWord}" nebyl nalezen. Zadaný text se vysktuje v článcích s tímto názvem: <li> ${data.suggested_pages}`
                            document.querySelector(".second").appendChild(par)
                        }

                    })
            })
    }
    event.target.elements.searchWiki.value = ""
})