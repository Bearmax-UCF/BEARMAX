import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Images/face.png";

function Register ()
{
    const navigate = useNavigate();

    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    async function registerUser (event)
    {
        event.preventDefault();

        const response = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                pass
            })
        });

        const data = await response.json();

        console.log(data);
    }

    return (
        <div className="Register">
            
            <img src={Logo} className="regLogo" alt="Logo: bear max face" />

            <form onSubmit={registerUser}>
                
                <input type="text" className="regText" id="regName" placeholder="First Name" value={firstName} onChange={(e) => setFName(e.target.value)}/> <br />
                
                <input type="text" placeholder="Last Name" className="regText" value={lastName} onChange={(e) => setLName(e.target.value)}  /> <br />

                <input value={email} className="regText" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@bearmax.com" /> <br />

                <input  value={pass} className="regText" onChange={(e) => setPass(e.target.value)}type="password" placeholder="Password" /> <br />
                
                <input className="regButton" type="submit" value="Register" /> <br />
            </form>
            <a className="regToLog" onClick={() => navigate("/login")}><u>Already have an account? Login!</u></a> 
        </div>
    );
}

export default Register;