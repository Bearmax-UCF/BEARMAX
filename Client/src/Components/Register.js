import React, { useState } from "react";

function Register ()
{
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
            <h1>New Friend!</h1>
            <form onSubmit={registerUser}>
                <label>First Name</label> <br />
                <input value={firstName} onChange={(e) => setFName(e.target.value)} type="text" placeholer="First Name" /> <br />

                <label>Last Name</label> <br />
                <input value={lastName} onChange={(e) => setLName(e.target.value)} type="text" placeholer="Last Name" /> <br />

                <label>Email</label> <br />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholer="email@example.com" /> <br />

                <label>Password</label> <br />
                <input  value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholer="********" /> <br />
                
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default Register;