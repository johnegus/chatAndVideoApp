import { useState } from 'react';
import axios from 'axios';
import chatCat from "../chatCat.png"


const LoginForm = () => {
    const [username, setUsername] = useState('demo');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': "1ceeec71-3b6d-4e7e-b7c5-32cff3567c4d", "User-Name": username, 'User-Secret': password };
        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        } catch (error) {
            setError('Oops, incorrect credentials.')
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <div className="logo-container"> 
                    <img  className="centered middled" src={chatCat} alt="logo"></img>
                </div>
                
                {/* <h1 className="title">chatCat</h1> */}
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                        <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm