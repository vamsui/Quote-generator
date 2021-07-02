const quoteContainer = document.getElementById('quote-container');
let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let newQuoteBtn = document.getElementById("new-quote");
let apiQoutes = [];
/**
 * show new quotes
 */
function newQuote() {
    // pick a random qoute from api using random function
    const quote = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
    //if author is null
    if (!quote.author) {
        authorText.textContent = "Unknown";
    }
    else {
        authorText.textContent = quote.author;
    }
    //if length of quote is more can adjust the font size
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;

}

//get quotes from api
async function getQoutes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQoutes = await response.json();
        newQuote();
    } catch (error) {

    }
}


//adding tweet functionality
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

/**
 * adding event listener
 */

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


getQoutes();