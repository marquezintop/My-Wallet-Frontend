import axios from "axios";

const BASE_URL = "https://my-wallet-api-lsj3.onrender.com/transactions"

function createConfig(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

function getTransactions(token) {
    const promise = axios.get(BASE_URL, createConfig(token))
    return promise
}

function createTransaction(type, body, token) {
    const promise = axios.post(`${BASE_URL}/${type}`, body, createConfig(token))
    return promise
}

const apiTransactions = {getTransactions, createTransaction}
export default apiTransactions