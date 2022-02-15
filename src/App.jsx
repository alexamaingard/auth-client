import { useState } from 'react';
import './App.css';
import { APIEndPoints } from './config';

export default function App() {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });
    const [user, setUser] = useState();

    const fetchConfig = (reqBody) => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(reqBody)
        }
    }

    const registerUser = async () => {
        try{
            const res = await fetch(APIEndPoints.register, fetchConfig(userData));
            if(res){
                const registeredUser = await res.json();
                console.log("Registered user:", registeredUser);

                return registeredUser;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUserData(userData);

        const registeredUser = await registerUser();
        setUser(registeredUser);
    }

    console.log(user);

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:
                    <input 
                        type="text" 
                        name="username" 
                        onChange={handleChange}
                        required/>
                </label>
                <label htmlFor="password">Password:
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handleChange}
                        required/>
                </label>
                <button type="submit">Submit</button>
            </form>

            {user && (
                    <div className="user">
                        <h2>Registered User:</h2>
                        <p><b>Username: </b>{user.data.username}</p>
                    </div>
                )
            }
        </div>
    );
}
