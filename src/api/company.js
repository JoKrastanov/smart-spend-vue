import axios from "axios"

const endPoint = "http://localhost:5000"

export const getCompanyDetails = async (companyId) => {
    try {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh')
        const config = {
            method: 'GET',
            url: `${endPoint}/company/${companyId}`,
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

export const getLicenseDetails = async (companyId) => {
    try {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh')
        const config = {
            method: 'GET',
            url: `${endPoint}/license/${companyId}`,
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

export const registerUser = async (
    companyId,
    firstName,
    lastName,
    address,
    phone,
    country,
    email,
    password,
    department,
    accountType
) => {
    try {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh')
        const config = {
            method: 'PUT',
            url: `${endPoint}/license/${companyId}/register/employee`,
            headers: {
                token,
                refresh
            },
            data: {
                firstName,
                lastName,
                address,
                phone,
                country,
                email,
                password,
                department,
                accountType
            }
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}
