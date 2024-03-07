/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import axios from "axios"
import { useState, useEffect } from "react"

export default function Account({ token }) {
  const [account, setAccount] = useState(null)
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    async function loadAccount() {
      try {
        const accountReponse = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        // accountResponse looks like { data: actual data }
        setAccount(accountReponse.data) // instead of `const { data } =`

        const reservationsResponse = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        // reservationsResponse looks like { data: actual data }
        console.log('reservationsResponse', reservationsResponse)
        setReservations(reservationsResponse.data.reservation)
      } catch (e) {
        console.error(e)
      }
    }
    loadAccount()
  }, [token])

  if (!account) {
    return <div>Not logged in</div>
  }

  async function returnBook(reservationId) {
    try {
      const { data } = await axios.delete(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    } catch(e) {
      console.error(e)
    }
  }

  return <main>
    <h1>{account.firstname} {account.lastname}</h1>
    <h2>{account.email}</h2>
    <div>Checked out books:
      <div>
        {
          reservations.map(reservation => {
            return (
              <article key={reservation.id}>
                <h2>{reservation.title}</h2>
                <button onClick={() => returnBook(reservation.id)}>Return</button>
              </article>
            )
          })
        }
      </div>
    </div>
  </main>
}