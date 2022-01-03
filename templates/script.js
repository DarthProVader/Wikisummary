
function checkLocalStorage(word){
    let lsWord = localStorage.getItem(word)
    if (lsWord != null){
        return lsWord
    }else{
        return null
    }
}

function callApi(word){
    let url = `http://127.0.0.1:5000/search/${word}`
    fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => response.json())
    return response
}

console.log(callApi("kniha"))

document.querySelector(".search-form").addEventListener("submit", function(event){
    event.preventDefault()

    let searchedWord = event.target.elements.searchWiki.value
    //console.log(searchedWord)
    //localStorage.setItem(searchedWord, "wordwordwrod")

    console.log(checkLocalStorage(searchedWord))
})

/*  1, check local storage for searched word
    2, if not there, call api and write out the result 
        if there write out the contents
    3, if not there save word + contents to local storage, save only if it was the summary text (not suggested pages for example)*/