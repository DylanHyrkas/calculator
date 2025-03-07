let display = document.getElementById("display");
let historyList = document.getElementById("history-list");

// Load history from local storage
document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
});

// Append input to the display
function appendToDisplay(value) {
    if (!isValidInput(value)) return;
    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Validate input to prevent invalid characters
function isValidInput(value) {
    let lastChar = display.value.slice(-1);
    let operators = ["+", "-", "*", "/", "%"];
    
    // Prevent multiple consecutive operators
    if (operators.includes(lastChar) && operators.includes(value)) {
        return false;
    }
    return true;
}

// Calculate the result
function calculateResult() {
    try {
        let result = eval(display.value);
        if (!isFinite(result)) throw new Error("Invalid");

        addToHistory(display.value + " = " + result);
        display.value = result;
        if(result === 500){
            window.location.href = "home";
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Store history in Local Storage
function addToHistory(entry) {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    history.push(entry);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    loadHistory();
}

// Load history from Local Storage
function loadHistory() {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    historyList.innerHTML = "";
    history.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Clear history
function clearHistory() {
    localStorage.removeItem("calcHistory");
    loadHistory();
}

// Keyboard Support
document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (!isNaN(key) || "+-*/.%".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

// Toggle Theme
function toggleTheme() {
    document.body.classList.toggle("light-theme");
}

// Service worker stuff

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
  
        // Listen for the 'controllerchange' event when a new service worker takes control
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          showToast('A new version of the app is available!'); // Show a toast to the user
        });
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  }
  
  function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
  
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 4000);
  }
  