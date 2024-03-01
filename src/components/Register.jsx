/* TODO - add your code to create a functional React component that renders a registration form */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      email: email,
      firstname: firstName,
      lastname: lastName,
      password: password
    }

    try {
      const { data } = await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', body)

      setToken(data.token)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <h2>Signup</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          First name: <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last name: <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button>Submit</button>
      </form>
    </>
  )
}