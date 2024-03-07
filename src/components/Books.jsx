/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import axios from "axios"
import { useState, useEffect } from "react"

export default function Books({ token }) {
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

  async function checkOut(bookId) {
    const body = {
      available: false
    }

    try {
      const { data } = await axios.patch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, body, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    } catch(e) {
      console.error(e)
    }
  }

  return <main>
    {
      books.map(book => {
        return <article key={book.id}>
          <h2>{book.title}</h2>
          <button onClick={() => checkOut(book.id)}>Check out</button>
        </article>
      })
    }
  </main>
}