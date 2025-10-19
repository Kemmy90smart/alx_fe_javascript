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
  const dropdown = document.getElementById('categoryDropdown');
  dropdown.innerHTML = '<option value="all">All</option>'; // reset

  const categories = [...new Set(quotes.map(q => q.category))]; // unique categories
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    dropdown.appendChild(option);
  });
}

// --- DISPLAY RANDOM QUOTE OR FILTERED QUOTE ---
function filterQuote() {
  const selectedCategory = document.getElementById('categoryDropdown').value;
  localStorage.setItem('lastSelectedCategory', selectedCategory); // save selection

  let filteredQuotes = quotes;
  if (selectedCategory !== 'all') {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    document.getElementById('quoteDisplay').innerText = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  document.getElementById('quoteDisplay').innerText = `"${quote.text}" — ${quote.category}`;
}

// --- ADD NEW QUOTE ---
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please provide both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  filterQuote();

  textInput.value = "";
  categoryInput.value = "";
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
      filterQuote();
      alert('Quotes imported successfully!');
    } catch (err) {
      alert('Failed to import quotes: ' + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// --- EVENT LISTENERS ---
document.getElementById('newQuote').addEventListener('click', filterQuote);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
document.getElementById('exportBtn').addEventListener('click', exportQuotes);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
document.getElementById('categoryDropdown').addEventListener('change', filterQuote);

// --- INITIALIZE ---
loadQuotes();
populateCategories();

const lastCategory = localStorage.getItem('lastSelectedCategory') || 'all';
document.getElementById('categoryDropdown').value = lastCategory;

filterQuote();
