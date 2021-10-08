import { useState, useEffect } from "react"
import axios from "axios"

const HomePage = () => {
  const [search, setSearch] = useState("")
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)

  const updateSearch = e => setSearch(e.target.value)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search) {
          const {data} = await axios.get(`https://openlibrary.org/search.json?title=${search.trim().toLowerCase().replace(/ /g, "+")}`)
          setBooks(data.docs)
        }
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [search])

  return (
    <div className="page">
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={updateSearch}
      />
      <div className="books">
        {books && search ? books.map((book, index) => (
          <div key={index}>
            <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />
            <h2>{book.title}</h2>
          </div>
        ))
         : (
          <h3>Please enter a search above</h3>
        )}
      </div>
    </div>
  )
}

export default HomePage