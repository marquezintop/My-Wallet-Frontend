import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import apiAuth from "../services/apiAuth"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/userContext"

export default function SignInPage() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const {setUser} = useContext(UserContext)

  const [form, setForm] = useState({email: "", password: ""})

  function handleForm(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSignIn(e) {
    e.preventDefault()
    const body = form
    setLoading(true)
    apiAuth.signIn(body)
    .then(res => {
      setLoading(false)
      const { userId, name, token} = res.data
      setUser({userId, name, token})
      navigate("/home")
    }).catch(err => {
      setLoading(false)
      alert(err.response.data)
      setForm({...form, password: ""})
    })
  }

  return (
    <SingInContainer>
      <form onSubmit={handleSignIn}>
        <MyWalletLogo />
        <input 
        name="email" 
        placeholder="E-mail" 
        required
        value={form.email}
        onChange={handleForm}
        disabled={loading}
        type="email" />
        <input 
        name="password" 
        placeholder="Senha" 
        type="password"
        required
        value={form.password}
        onChange={handleForm}
        disabled={loading}
        autoComplete="new-password" />
        <button type="submit" disabled={loading}>Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
