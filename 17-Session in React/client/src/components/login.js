import React, {useState, useEffect} from "react";
import {useNavigate as useHistory} from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        const checkUser = async() => {
            const response= await fetch('/checkuser', {
                method: 'POST'
            });
            const result = await response.json();
            if(result === 'done') {
                history('/')
            }
        }
        checkUser();
    }, [])

    const loginBtnClick = async() => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await response.json();
        if(result === 'done') {
            history('/admin')

        }else {
            alert('Login Error')
        }
    }

    return(
        <>
        <div>
            <label htmlFor="usernameInp">
                Username
            </label>
            <input value={username} onChange={e => setUsername(e.target.value)} id="usernameInp" type="text"/>
        </div>
        <div>
            <label htmlFor="passwordInp">
                Password
            </label>
            <input value={password} onChange={e => setPassword(e.target.value)} id="passwordInp" type="text"/>
        </div>
        <button onClick={loginBtnClick}>Login</button>
        </>
    )
}