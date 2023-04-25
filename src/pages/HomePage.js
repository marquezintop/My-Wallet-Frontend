import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/userContext" 
import apiTransactions from "../services/apiTransactions"
import { useNavigate } from "react-router-dom"


export default function HomePage() {

  const navigate = useNavigate()

  const [transactions, setTransactions] = useState([])

  const [balance, setBalance] = useState(0)

  const {user} = useContext(UserContext)

  useEffect(getTransactionsList, [user.token])
  useEffect(calculateBalance, [transactions])

  function getTransactionsList() {
    apiTransactions.getTransactions(user.token)
    .then(res => {
      setTransactions(res.data)
    })
    .catch(err => {
      if(!user.token) {
        return alert("Faça login!")
      }
      alert(err.respose.data.message)
    })
  }

  function disconnect (){
    localStorage.removeItem("user");
    navigate("/");
  }

  function calculateBalance() {
    let sum = 0;
    for(let i = 0; i < transactions.length; i++){
      if(transactions[i].type === "entry"){
        sum += Number(transactions[i].value);
      } else {
        sum -=  Number(transactions[i].value);
      }
    }
    return setBalance(sum.toFixed(2))
  }

  if (transactions.length === 0) {
    return (
      <HomeContainer>
        <Header>
          <h1>Olá, {user.username}</h1>
          <BiExit onClick={disconnect} cursor="pointer"/>
        </Header>
  
        <TransactionsContainerCenter>
            Não há registros de entrada ou saída
        </TransactionsContainerCenter>
  
  
        <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entry")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/exit")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
        </ButtonsContainer>
  
      </HomeContainer>
    )
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.username}</h1>
        <BiExit onClick={disconnect} cursor="pointer"/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(t => (
            <ListItemContainer key={t.id}>
              <div>
                <span>{t.date}</span>
                <strong>{t.description}</strong>
              </div>
              <Value color={`${t.type}`}>{Number(t.value).toFixed(2)}</Value>
            </ListItemContainer>
          ))}
          </ul>
        <article>
          <strong>Saldo</strong>
          <Value color={balance > 0 ? "entry" : "exit"}>{balance}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entry")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/exit")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const TransactionsContainerCenter = styled.article`
flex-grow: 1;
background-color: #fff;
color: #868686;
border-radius: 5px;
padding: 16px;
display: flex;
flex-direction: center;
justify-content: center;
align-items: center;
font-size: 20px;
article {
  display: flex;
  justify-content: space-between;   
  strong {
    font-weight: 700;
    text-transform: uppercase;
  }
}
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entry" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`