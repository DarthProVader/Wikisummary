let baseUrl = window.location.href

let searchPage = document.querySelector(".search")
let aboutPage = document.querySelector(".about")
let resultPage = document.querySelector(".second")

document.querySelector(".search-link").addEventListener("click", function () {
    searchPage.style.display = "block"
    resultPage.style.display = "block"
    aboutPage.style.display = "none"
})
document.querySelector(".about-link").addEventListener("click", function () {
    searchPage.style.display = "none"
    resultPage.style.display = "none"
    aboutPage.style.display = "block"
})

function checkLocalStorage(word) {
    let lsWord = localStorage.getItem(word)
    if (lsWord != null) {
        return lsWord
    } else {
        return null
    }
}

let searchButton = document.querySelector("#vycuc")
let wordInput = document.querySelector("#inp")
let loader = `<div class="loader">Loading...</div>`

document.querySelector(".search-form").addEventListener("submit", function (event) {
    event.preventDefault()
    resultPage.innerHTML = loader

    let searchedWord = event.target.elements.searchWiki.value
    let searchedWordPar = document.createElement("p")
    searchedWordPar.innerHTML = `Hledaný výraz: ${searchedWord}`
    searchedWordPar.style.textAlign = "center"

    if (searchedWord == "") {
        let par = document.createElement("p")
        par.innerHTML = "Nezadán žádný výraz"
        par.style.textAlign = "center"
        resultPage.innerHTML = ""
        resultPage.appendChild(par)
        return null
    }

    //check local storage for searched word if found write on the screen
    if (checkLocalStorage(searchedWord) != null) {

        let par = document.createElement("p")
        par.innerHTML = checkLocalStorage(searchedWord)
        resultPage.innerHTML = ""
        resultPage.appendChild(searchedWordPar)
        resultPage.appendChild(par)
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
                    par.style.textAlign = "center"
                    resultPage.innerHTML = ""
                    resultPage.appendChild(searchedWordPar)
                    resultPage.appendChild(par)

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
                            resultPage.innerHTML = ""
                            resultPage.appendChild(searchedWordPar)
                            resultPage.appendChild(par)
                        }
                        //list of pages if searched word is a disambiguation page 
                        else {
                            let par = document.createElement("p")
                            par.innerHTML = `Článek s tímto názvem: "${searchedWord}" nebyl nalezen. Zadaný text se vysktuje v článcích s tímto názvem: <li> ${data.suggested_pages}`
                            resultPage.innerHTML = ""
                            resultPage.appendChild(searchedWordPar)
                            resultPage.appendChild(par)
                        }

                    })
            })
    }
    event.target.elements.searchWiki.value = ""
})