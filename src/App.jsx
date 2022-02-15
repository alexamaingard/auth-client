import { useState } from 'react';
import './App.css';
import { APIEndPoints } from './config';

export default function App() {
    const [registerUserData, setRegisterUserData] = useState({
        username: "",
        password: ""
    });

    const [loginUserData, setLoginUserData] = useState({
        username: "",
        password: ""
    });

    const [user, setUser] = useState();
    const [loginResponse, setLoginResponse] = useState();

    const fetchConfig = (reqBody) => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(reqBody)
        }
    }

    const postFetch = async (endpoint, data) => {
        try {
            const res = await fetch(APIEndPoints[endpoint], fetchConfig(data));
            return res.json();
        }
        catch(error){
            console.log(error);
        }
    }

    const registerUser = async () => {
        try{
            const registeredUser = await postFetch('register', registerUserData);
            if(registeredUser){
                return registeredUser;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const loginUser = async () => {
        try{
            const token = await postFetch('login', loginUserData);
            console.log(token);
            if(token){
                return token;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const handleRegisterChange = event => {
        const {name, value} = event.target;
        setRegisterUserData({...registerUserData, [name]: value});
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        setRegisterUserData(registerUserData);

        const registeredUser = await registerUser();
        setUser(registeredUser);
    }

    const handleLoginChange = event => {
        const {name, value} = event.target;
        setLoginUserData({...loginUserData, [name]: value});
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLoginUserData(loginUserData);

        const token = await loginUser();
        localStorage.setItem("userToken", token);
        setLoginResponse(token);
    }

    return (
        <div className="App">
            <div className="forms">
                <form onSubmit={handleRegisterSubmit}>
                    <h4>Register:</h4>
                    <label htmlFor="username">Username:
                        <input 
                            type="text" 
                            name="username" 
                            onChange={handleRegisterChange}
                            required/>
                    </label>
                    <label htmlFor="password">Password:
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleRegisterChange}
                            required/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <form onSubmit={handleLoginSubmit}>
                    <h4>Login:</h4>
                    <label htmlFor="username">Username:
                        <input 
                            type="text" 
                            name="username" 
                            onChange={handleLoginChange}
                            required/>
                    </label>
                    <label htmlFor="password">Password:
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleLoginChange}
                            required/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            {user && (
                    <div className="user">
                        <h2>Registered User:</h2>
                        <p><b>Username: </b>{user.data.username}</p>
                    </div>
                )
            }
            {loginResponse && !loginResponse.error && (
                    <div className="user">
                        <h2>Logged In User:</h2>
                        <p><b>Token: </b>{loginResponse.data}</p>
                    </div>
                )
            }
            {loginResponse && loginResponse.error && (
                <div className="user">
                    <h2>{loginResponse.error}</h2>
                </div>
            )}
            <form>
                <button type="submit">Log Out</button>
            </form>
        </div>
    );
}