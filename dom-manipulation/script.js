// Initial array of quote objects
const quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Design" }
];

// Display random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <em>— ${randomQuote.category}</em>
  `;
}

// Add new quote dynamically
function addQuote() {
  const newText = document.getElementById('newQuoteText').value.trim();
  const newCategory = document.getElementById('newQuoteCategory').value.trim();

  if (!newText || !newCategory) {
    alert('Please enter both a quote and a category!');
    return;
  }

  // Create new quote object and push to array
  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);

  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  alert('New quote added successfully!');
  showRandomQuote(); // Immediately show the new quote
}

// Add event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
