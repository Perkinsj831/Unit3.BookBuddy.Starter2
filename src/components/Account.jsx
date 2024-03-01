/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import axios from "axios"
import { useState, useEffect } from "react"

export default function Account({ token }) {
  const [account, setAccount] = useState(null)

  useEffect(() => {
    async function loadAccount() {
      try {
        const { data } = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        setAccount(data)
      } catch (e) {
        console.error(e)
      }
    }
    loadAccount()
  })

  if (!account) {
    return <div>Not logged in</div>
  }

  return <main>
    <h1>{account.firstname} {account.lastname}</h1>
    <h2>{account.email}</h2>
    <div>Checked out books:
      <div>
        {
          account.books.map(book => {
            return (
              <h2 key={book.id}>{book.title}</h2>
            )
          })
        }
      </div>
    </div>
  </main>
}