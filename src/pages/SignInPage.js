import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import apiAuth from "../services/apiAuth"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/userContext"

export default function SignInPage() {
  const navigate = useNavigate()

  const {setUser} = useContext(UserContext)

  const [form, setForm] = useState({email: "", password: ""})

  function handleForm(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSignIn(e) {
    e.preventDefault()
    const body = form
    apiAuth.signIn(body)
    .then(res => {
      const { userId, name, token} = res.data
      setUser({userId, name, token})
      navigate("/home")
    }).catch(err => {
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
        type="email" />
        <input 
        name="password" 
        placeholder="Senha" 
        type="password"
        required
        value={form.password}
        onChange={handleForm}
        autoComplete="new-password" />
        <button type="submit" >Entrar</button>
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
