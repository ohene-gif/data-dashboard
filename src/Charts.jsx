import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

function Charts({ books }) {

  const yearData = books
    .filter((book) => book.first_publish_year)
    .slice(0, 10)
    .map((book) => ({
      year: book.first_publish_year,
      books: 1
    }));


  const authorCount = {};

  books.forEach((book) => {
    const author = book.author_name
      ? book.author_name[0]
      : "Unknown";

    authorCount[author] = (authorCount[author] || 0) + 1;
  });


  const authorData = Object.keys(authorCount)
    .map((author) => ({
      name: author,
      value: authorCount[author]
    }))
    .slice(0, 5);


  return (
    <div>

      <h2>📊 Books by Publication Year</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={yearData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="year" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="books"
            fill="#8884d8"
          />

        </BarChart>
      </ResponsiveContainer>



      <h2>📚 Top Authors</h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={authorData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {authorData.map((entry, index) => (
              <Cell key={index} />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}


export default Charts;