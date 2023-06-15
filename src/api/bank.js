import axios from "axios"

const endPoint = process.env.VUE_APP_BANK_SERVICE

export const getComapnyBankAccounts = async (companyId, department) => {
    try {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh')
        const config = {
            method: 'GET',
            url: `${endPoint}/bank/company/${companyId}/department/${department}`,
            headers: {
                token,
                refresh
            }
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getBankAccountTransactions = async (IBAN) => {
    try {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh')
        const config = {
            method: 'GET',
            url: `${endPoint}/bank/transactions/${IBAN}`,
            headers: {
                token,
                refresh
            }
        }
        const response = await axios(config);
        return response.data.reverse();
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const sendMoney = async (ibanFrom, ibanTo, amount) => {
    try {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh')
        const config = {
            method: 'POST',
            url: `${endPoint}/bank/${ibanFrom}/send`,
            headers: {
                token,
                refresh
            },
            data: {
                IBANReciever: ibanTo,
                amount: amount
            }
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}