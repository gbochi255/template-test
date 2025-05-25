const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');

//set a global variable with an initial empty array
let apiQuotes = [];
//show loading function
/*function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}*/

//show new quote 
function newQuote() {
   // loader();
    if(!apiQuotes.length){
        console.error("No quotes loaded.");
        return;
    }
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    quoteText.textContent = quote.quote; 
    authorText.textContent = quote.author || "Unknown";
}
//fetching data with javascript fetching quote from api
async function getQuotes() {
    
    const apiUrl = "https://dummyjson.com/quotes?limit=100";
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        apiQuotes = data.quotes;
        newQuote();
        //console.log(apiQuote);
    }catch(err) {
        console.error('Unable to fetch data', err)
    }
}


//tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
//load a new quote when button is clicked
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);
//initial load
getQuotes();

//<div class="loader" id="loader"></div>
