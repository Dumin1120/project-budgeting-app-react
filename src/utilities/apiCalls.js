import axios from "axios";

const apiURL = window.location.hostname === "localhost"
    ? "http://localhost:9000/transactions"
    : "https://dumin1120-proj-budgeting-app.herokuapp.com/transactions";

export const apiGetTransactions = async () => {
    try {
        const { data } = await axios.get(apiURL);
        return data;
    } catch (e) {
        return "error";
    }
}

export const apiGetTransactionsWithIds = async (ids) => {
    try {
        const { data } = await axios.get(`${apiURL}/${ids}`);
        return data;
    } catch (e) {
        return "error";
    }
}

export const apiPostTransactions = async (newData) => {
    try {
        const { data } = await axios.post(apiURL, newData);
        return data;
    } catch (e) {
        return "error";
    }
}

export const funcName2 = () => {
    
}