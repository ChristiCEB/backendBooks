const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: "harry-potter", title: "Harry Potter and the Philosopher's Stone", genre: "fantasy", author: "J.K. Rowling", date: "1997" },
  { id: "lord-of-the-rings", title: "The Lord of the Rings", genre: "fantasy", author: "J.R.R. Tolkien", date: "1954" },
];

const content = [
  { bookId: "harry-potter", title: "Harry Potter and the Philosopher's Stone", chapter: 1, content: "Mr and Mrs Dursley were proud to say they were perfectly normal..." },
  { bookId: "harry-potter", title: "Harry Potter and the Philosopher's Stone", chapter: 2, content: "Nearly ten years had passed since the Dursleys had woken up..." },
  { bookId: "lord-of-the-rings", title: "The Lord of the Rings", chapter: 1, content: "When Mr. Bilbo Baggins announced his eleventy-first birthday..." },
  { bookId: "lord-of-the-rings", title: "The Lord of the Rings", chapter: 2, content: "The next day they were busy in the garden from morning until dusk..." },
];

app.get("/api/getbooks/:book", (req, res) => {
  const term = req.params.book.toLowerCase();
  const q = req.query;
  let list = term === "all" ? books : books.filter(b => b.title.toLowerCase().includes(term) || b.id.includes(term));
  ["genre", "author", "title", "date"].forEach(k => { if (q[k]) list = list.filter(b => (b[k] || "").toLowerCase().includes(String(q[k]).toLowerCase())); });
  res.json(list.map(({ title, genre, author, date }) => ({ title, genre, author, date })));
});

app.get("/api/getcontent/:book", (req, res) => {
  const id = req.params.book.toLowerCase();
  const chapters = content.filter(c => c.bookId === id || c.bookId.includes(id) || id.includes(c.bookId));
  if (!chapters.length) return res.status(404).json({ error: "Book not found" });
  res.json(chapters.map(({ title, chapter, content }) => ({ title, chapter, content })));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
