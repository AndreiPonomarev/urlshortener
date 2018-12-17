const goButton = document.querySelector(".go-button")
const copyResultButton = document.querySelector(".copy-result-button")

console.log(goButton)

/* Get short link */
goButton.addEventListener("click", async event => {
    const urlArea = document.querySelector(".url-area")
    const resultInput = document.querySelector(".result-input")
    const resMessage = document.querySelector(".res-message")
    
    resultInput.value = ''
    resMessage.innerHTML = ''

    const rawResponse = await fetch(`/shortener?url=${urlArea.value}`)
    const content = await rawResponse.json()

    if (content) {
        urlArea.value = ''

        if (content.url) {
            resultInput.value = content.url
            let range = document.createRange()
            range.selectNode(resultInput)
            window.getSelection().addRange(range)
        } 
        if (content.error) {
            console.log(content.error)
            console.log(resMessage)

            resMessage.innerHTML = content.error
        }
    }
})

/* Copy result to clipboard */
copyResultButton.addEventListener("click", event => {
    const resultInput = document.querySelector(".result-input")

    let range = document.createRange()
    range.selectNode(resultInput)
    window.getSelection().addRange(range)
    try {
        var successful = document.execCommand("copy")
        var msg = successful ? "successful" : "unsuccessful"
        console.log("Copy command was " + msg)
    } catch (err) {
        console.log("Oops, unable to copy")
    }
    window.getSelection().removeAllRanges()
})
