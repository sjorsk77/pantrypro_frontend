import { useState, useEffect } from "react";
import Cookies from "js-cookie";



export async function ApiLogin(email, password) {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });


        if (!response.ok) {
            console.log('ello');
            throw new Error('Network response was not ok')
        }

        const data = await response.json();
        const { token } = data;
        const { id } = data;
        Cookies.set('token', token, {expires : 1})
        Cookies.set('uId', id, {expires : 1});
        console.log("Token:" + Cookies.get('token'));

    } catch(error) {
        throw new Error();
    }
}

export async function ApiRegister(userName, email, password, confirmPassword) {
    try {
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }),
        });

        console.log('eyo');


        if (!response.ok) {
            throw new Error(response.Error)
        }

        const data = await response.json();
        const { token } = data;
        console.log(token);

    } catch(error) {
        return error;
    }
}

export async function ApiGetUser(token) {
    try {
        const response = await fetch('http://localhost:8080/user/' + Cookies.get('uId'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });


        if (!response.ok) {
            throw new Error(response.Error)
        }

        const data = await response.json();
        return data;

    } catch(error) {
        return error;
    }
}