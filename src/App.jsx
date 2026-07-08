import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=computer+science&limit=20"
      );

      const data = await response.json();

      setBooks(data.docs);
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const year = book.first_publish_year;

    const matchesYear =
      yearFilter === "all" ||
      (yearFilter === "old" && year < 2000) ||
      (yearFilter === "new" && year >= 2000);

    return matchesSearch && matchesYear;
  });

  return (
    <div className="App">
      <h1>📚 Book Explorer Dashboard</h1>

      <p>
        Explore computer science books and discover information about authors,
        publication years, and editions.
      </p>

      <h2>🔍 Search and Filter</h2>

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
      >
        <option value="all">All Years</option>
        <option value="old">Before 2000</option>
        <option value="new">2000 and Newer</option>
      </select>

      <h2>📊 Statistics</h2>

      <p>Total Books: {books.length}</p>

      <p>Books Displayed: {filteredBooks.length}</p>

      <p>
        Unique Authors:{" "}
        {
          new Set(
            books.flatMap((book) => book.author_name || [])
          ).size
        }
      </p>

      <h2>📖 Book List</h2>

      {filteredBooks.map((book, index) => (
        <div className="book-card" key={index}>
          <h3>{book.title}</h3>

          <p>
            Author:{" "}
            {book.author_name
              ? book.author_name[0]
              : "Unknown"}
          </p>

          <p>
            First Published:{" "}
            {book.first_publish_year || "Unknown"}
          </p>

          <p>
            Editions:{" "}
            {book.edition_count || "Unknown"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;