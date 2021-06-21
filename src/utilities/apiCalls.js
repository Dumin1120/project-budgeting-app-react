import axios from "axios";

const apiURL = window.location.hostname === "localhost"
    ? "http://localhost:9000/transactions"
    : "https://dumin1120-proj-budgeting-app.herokuapp.com/transactions";

const errorFunc = (err) => {
    console.log(err);
    return "error";
}

export const apiGetTransactions = async () => {
    try {
        const { data } = await axios.get(apiURL);
        return data;
    } catch (e) {
        return errorFunc(e);
    }
}

export const apiGetTransactionsByIds = async (ids) => {
    try {
        const { data } = await axios.get(`${apiURL}/${ids}`);
        return data;
    } catch (e) {
        return errorFunc(e);
    }
}

export const apiPostTransactions = async (newData) => {
    try {
        const { data } = await axios.post(apiURL, newData);
        return data;
    } catch (e) {
        return errorFunc(e);
    }
}

export const apiPutTransactions = async (ids, newData) => {
    try {
        const { data } = await axios.put(`${apiURL}/${ids}`, newData);
        return data;
    } catch (e) {
        return errorFunc(e);
    }
}

export const apiDeleteTransactions = async (ids) => {
    try {
        const { data } = await axios.delete(`${apiURL}/${ids}`);
        return data;
    } catch (e) {
        return errorFunc(e);
    }
}
