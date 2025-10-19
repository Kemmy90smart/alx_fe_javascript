// Check for the existence of the quotes array with text and category properties
let quotes = [
  { text: "Success is not final; failure is not fatal.", category: "Motivation" },
  { text: "Dream big and dare to fail.", category: "Inspiration" },
  { text: "The best way to predict the future is to create it.", category: "Wisdom" }
];

// Check for the displayRandomQuote function
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  // Check for logic to select a random quote and update the DOM
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}

// Check for the addQuote function
function addQuote() {
  const quoteText = document.getElementById("quoteText").value.trim();
  const quoteCategory = document.getElementById("quoteCategory").value.trim();

  // Check for logic to add a new quote and update DOM
  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    document.getElementById("quoteText").value = "";
    document.getElementById("quoteCategory").value = "";
    displayRandomQuote();
  }
}

// Check for event listener on the “Show New Quote” button
document.getElementById("newQuoteBtn").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Display a quote when page loads
displayRandomQuote();
