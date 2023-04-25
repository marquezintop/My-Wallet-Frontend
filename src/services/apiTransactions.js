import axios from "axios";

const BASE_URL = "//localhost:5000/transactions"

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