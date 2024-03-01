/* TODO - add your code to create a functional React component that renders a login form */

/* TODO - add your code to create a functional React component that renders a registration form */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      email: email,
      password: password
    }

    try {
      const { data } = await axios.post('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', body)

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
          Password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button>Submit</button>
      </form>
    </>
  )
}