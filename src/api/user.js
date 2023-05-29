import axios from "axios"

const endPoint = "http://localhost:4000"

export const login = async (email, password) => {
    try {
        const data = {
            email: email,
            password: password
        }
        const config = {
            method: 'POST',
            url: `${endPoint}/auth/login`,
            data: data
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const getLoggedUserDetails = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh')
        const config = {
            method: 'GET',
            url: `${endPoint}/auth/user/${userId}`,
            headers: {
                token,
                refresh
            }
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}