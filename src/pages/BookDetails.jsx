import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(
        "https://openlibrary.org/search.json?q=computer+science&limit=20"
      );

      const data = await response.json();

      setBook(data.docs[id]);
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>📖 Book Details</h1>

      <div className="book-card">
        <h2>{book.title}</h2>

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
          Number of Editions:{" "}
          {book.edition_count || "Unknown"}
        </p>

        <p>
          Subjects:{" "}
          {book.subject
            ? book.subject.slice(0, 3).join(", ")
            : "Unknown"}
        </p>
      </div>

      <a href="/">
        ← Back to Dashboard
      </a>
    </div>
  );
}

export default BookDetails;