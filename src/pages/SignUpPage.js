import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import apiAuth from "../services/apiAuth"

export default function SignUpPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({name: "", email: "", password: "", confirmedPassword: ""})

  function handleForm(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSignUp(e) {
    e.preventDefault();
    if (form.confirmedPassword !== form.password) {
      setForm({...form, password: "", confirmedPassword: ""})
      return alert("As senhas escritas não são iguais.")
    }
    const {name, email, password} = form
    const body = {name, email, password}
    apiAuth.signUp(body)
    .then(res => {
      console.log(res.data)
      navigate("/")
    }).catch(err => {
      alert(err.response.data)
      setForm({...form, password: "", confirmedPassword: ""})
    })
  }


  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input name="name"
        placeholder="Nome" 
        type="text"
        required 
        value={form.name}
        onChange={handleForm}
        />
        <input placeholder="E-mail" 
        type="email"
        name="email"
        required 
        value={form.email}
        onChange={handleForm} />
        <input placeholder="Senha" 
        type="password" 
        name="password"
        required 
        value={form.password}
        onChange={handleForm}
        autoComplete="new-password" />
        <input placeholder="Confirme a senha" 
        type="password"
        name="confirmedPassword"
        required 
        value={form.confirmedPassword}
        onChange={handleForm}
        autoComplete="new-password" />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
