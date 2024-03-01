/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import axios from "axios"
import { useState, useEffect } from "react"

export default function Books() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    async function loadBooks() {
      try {
        const { data } = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
        setBooks(data.books)
      } catch(e) {
        console.error(e)
      }
    }
    loadBooks()
  }, [])

  return <main>
    {
      books.map(book => {
        return (
          <h2 key={book.id}>{book.title}</h2>
        )
      })
    }
  </main>
}