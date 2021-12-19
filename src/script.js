document.querySelector(".search-form").addEventListener("submit", function(event){
    event.preventDefault()

    let searchedWord = event.target.elements.searchWiki.value
    console.log(searchedWord)
})

/*  1, check local storage for searched word
    2, if not there, call api and write out the result 
        if there write out the contents
    3, if not there save word + contents to local storage, save only if it was the summary text (not suggested pages for example)*/