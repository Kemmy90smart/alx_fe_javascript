// --- QUOTES ARRAY ---
let quotes = [];

// --- LOAD QUOTES FROM LOCAL STORAGE ---
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes
    quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Do what you can with what you have, wherever you are.", category: "Inspiration" }
    ];
    saveQuotes();
  }
}

// --- SAVE QUOTES TO LOCAL STORAGE ---
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// --- POPULATE CATEGORIES DROPDOWN ---
function populateCategories() {
  const dropdown = document.getElementById('categoryFilter');
  dropdown.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    dropdown.appendChild(option);
  });
}

// --- FILTER QUOTES BASED ON SELECTED CATEGORY ---
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastSelectedCategory', selectedCategory);

  let filteredQuotes = quotes;
  if (selectedCategory !== 'all') {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    document.getElementById('quoteDisplay').innerText = "No quotes in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  document.getElementById('quoteDisplay').innerText = `"${quote.text}" — ${quote.category}`;
}

// --- ADD NEW QUOTE ---
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) {
    alert("Please provide both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

// --- EXPORT QUOTES AS JSON ---
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// --- IMPORT QUOTES FROM JSON ---
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (!Array.isArray(importedQuotes)) throw new Error("Invalid JSON format");
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert('Quotes imported successfully!');
    } catch (err) {
      alert('Failed to import quotes: ' + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// --- EVENT LISTENERS ---
document.getElementById('newQuote').addEventListener('click', filterQuotes);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
document.getElementById('exportBtn').addEventListener('click', exportQuotes);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

// --- INITIALIZE ---
loadQuotes();
populateCategories();

const lastCategory = localStorage.getItem('lastSelectedCategory') || 'all';
document.getElementById('categoryFilter').value = lastCategory;

filterQuotes();
