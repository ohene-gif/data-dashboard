import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import BookDetails from "./pages/BookDetails";
import Charts from "./Charts";


function Dashboard() {

  const [books, setBooks] = useState([]);


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



  return (

    <div className="App">

      <h1>
        📚 Book Explorer Dashboard
      </h1>


      <p>
        Explore computer science books using Open Library data.
      </p>



      <h2>
        Dashboard Statistics
      </h2>


      <p>
        Total Books: {books.length}
      </p>


      <p>
        Books With Authors: {
          books.filter(
            book => book.author_name
          ).length
        }
      </p>


      <p>
        Books With Publication Year: {
          books.filter(
            book => book.first_publish_year
          ).length
        }
      </p>



      <Charts books={books} />



      <h2>
        Book List
      </h2>


      {
        books.map((book,index)=>(

          <div 
            className="book-card"
            key={index}
          >

            <Link to={`/book/${index}`}>

              <h3>
                {book.title}
              </h3>

            </Link>


            <p>
              Author: {
                book.author_name
                ? book.author_name[0]
                : "Unknown"
              }
            </p>


            <p>
              Published: {
                book.first_publish_year
                || "Unknown"
              }
            </p>


          </div>

        ))
      }


    </div>

  );
}



function App(){

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />


        <Route
          path="/book/:id"
          element={<BookDetails />}
        />

      </Routes>

    </BrowserRouter>

  );

}



export default App;