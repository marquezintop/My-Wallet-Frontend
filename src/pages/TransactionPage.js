import { useContext, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../contexts/userContext"
import { useNavigate, useParams } from "react-router-dom"
import apiTransactions from "../services/apiTransactions"

export default function TransactionsPage() {

  const navigate = useNavigate()

  const type = useParams()

  const [form, setForm] = useState({value: "", description: ""})

  const {user} = useContext(UserContext)

  function handleForm(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleTransaction(e) {
    e.preventDefault()
    const body = form
    apiTransactions.createTransaction(type.tipo, body, user.token)
    .then(res => {
      navigate("/home")
    })
    .catch(err => alert(err.response.data))
}

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleTransaction}>
        <input 
        placeholder="Valor" 
        type="text"
        name="value"
        required
        value={form.value}
        onChange={handleForm}
        />
        <input 
        placeholder="Descrição" 
        type="text" 
        name="description"
        required
        value={form.description}
        onChange={handleForm}
        />
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
