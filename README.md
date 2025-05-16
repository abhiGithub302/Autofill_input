# Autofill Input with LRU Cache in React (Vite + JavaScript)

This project is a simple Autofill Input feature built using **React** with **Vite** and **JavaScript**. It allows users to search through dummy JSON data and displays suggestions based on user input, with several optimizations like debouncing and caching for improved performance.

## 🚀 Features

- ✅ **Live Search with Filtered Results**
- ✅ **Debounced Input (300ms)**
- ✅ **Matched Substring Highlighted in Bold**
- ✅ **LRU (Least Recently Used) Cache with Capacity of 10 Items**
- ✅ **Built with Vite for fast development**

---
---

## 🧰 Tech Stack

**Frontend:**
- [React](https://reactjs.org/) – UI library
- [Vite](https://vitejs.dev/) – Build tool for fast development
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Programming language

**Others:**
- HTML5 & CSS3 – Markup and basic styling
- [Node.js](https://nodejs.org/) – Runtime environment (for local development)


---

## 🧠 How It Works

- **Input Debouncing:** Introduces a 300ms delay after the user stops typing to reduce unnecessary renders.
- **Filtering Logic:** Filters dummy data based on case-insensitive substring match.
- **Text Highlighting:** Uses `<strong>` tags to bold the matched portion of the text.
- **LRU Cache:** Stores the 10 most recent search results to minimize computation and improve response time.

---

## 🧪 Example

**User Input:** `react`  
**Output Suggestions:**
- **React** Tutorials  
- **React** Query  
- **React** Redux  

---

## 🛠️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/abhiGithub302/Autofill_input.git
cd Autofill_input

# Install dependencies
npm install

# Run the development server
npm run dev


