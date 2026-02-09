/* =========================================
   BOOK DATA
   User can paste course content here
========================================= */

const books = [
  {
    title: "Book html",
    content: `
{HEADING}Chapter 1: Introduction to HTML
{BODY}Welcome to your journey into web development 🎉

{HEADING}What is HTML?
{BODY}HTML stands for Hyper Text Markup Language.

{HEADING}Why is HTML Important?
{BODY}HTML is the foundation of every website.
`
  },
  {
    title: "Book css",
    content: `
{HEADING}Chapter 1: CSS Basics
{BODY}CSS is used to style web pages.
`
  },
  {
    title: "Book js",
    content: `
{HEADING}Chapter 1: JavaScript Basics
{BODY}JavaScript makes websites interactive.
`
  }
];


/* =========================================
   DOM ELEMENTS
========================================= */

const bookList = document.getElementById("bookList");
const contentDiv = document.getElementById("content");
const themeToggle = document.getElementById("themeToggle");
const highlightBtn = document.getElementById("highlightBtn");


/* =========================================
   LOAD BOOKS INTO SIDEBAR
========================================= */

books.forEach((book, index) => {
  const li = document.createElement("li");
  li.textContent = book.title;

  li.addEventListener("click", () => loadBook(index));

  bookList.appendChild(li);
});


/* =========================================
   LOAD BOOK CONTENT
   Convert {HEADING} and {BODY}
========================================= */

function loadBook(index) {
  let text = books[index].content;

  text = text
    .replaceAll("{HEADING}", "<h2>")
    .replaceAll("{BODY}", "<p>")
    .replace(/\n/g, "</p>");

  contentDiv.innerHTML = text;
}


/* =========================================
   THEME TOGGLE
========================================= */

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});


/* =========================================
   TEXT HIGHLIGHTER
========================================= */

highlightBtn.addEventListener("click", () => {
  const selection = window.getSelection();

  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  const span = document.createElement("span");
  span.className = "highlight";

  range.surroundContents(span);

  selection.removeAllRanges();
});


/* Optional: remove highlight on click */
contentDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("highlight")) {
    const parent = e.target.parentNode;
    parent.replaceChild(
      document.createTextNode(e.target.textContent),
      e.target
    );
  }
});
