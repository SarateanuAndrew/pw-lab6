import React, {useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let role = "";
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            console.log('Response:', response); // Add this line
            const receivedToken = response.data.token;
            localStorage.setItem('token', receivedToken);
            let role2 = jwtDecode(receivedToken);
            role = role2.role;
            localStorage.setItem('role', role);
            window.location.reload();
        } catch (error) {
            if (error.response) {
                console.error('Login failed:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error in setting up request:', error.message);
            }
        }

    };
    return (
        <div id="login-form">
            <h1>Login</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Submit" onClick={handleLogin}/>
            </form>
        </div>
    );
};

export default Login;
