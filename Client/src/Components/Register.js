import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {buildPath } from "./BuildPath";

import Logo from "./Images/face.png";

function Register ()
{
    const navigate = useNavigate();

    var firstName;
    var lastName;
    var email;
    var pass;
    var reType;

    let bp = require("./BuildPath.js");

    const registerUser = async (event) => {
        event.preventDefault();

        var obj = {
            FirstName: firstName.value,
            LastName: lastName.value,
            Email: email.value,
            Password: pass.value
        };

        var js = JSON.stringify(obj);

        if (
            firstName.value === "" ||
            lastName.value  === "" ||
            email.value     === "" ||
            pass.value      === "" 
        ) {
            //setMessage("Please fill in all feilds.");
            return; 
        } else if (pass.value.length < 8) {
            //setMessage ( "Please make sure the pasword is at least 8 characters long.");
            return;
        } else if (reType.value !== pass.value) {
            //setMessage ("Passwords don't match.");
            return ; 
        } else {
            try {
                const response = await fetch(buildPath("api/register"), {
                    method: "POST",
                    body: js,
                    header: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                });

                var res = JSON.parse(await response.text());

                //setMessage(" ");
                window.location.href="/login";
            } catch (e) {
                alert(e.toString());
                return ;
            }
        }
    };

    return (
        <div className="Register">
            
            <img src={Logo} className="regLogo" alt="Logo: bear max face" />

            <form onSubmit={registerUser}>
                
                <input type="text" className="regText" placeholder="First Name"  ref={(c) => (firstName = c)}/> <br />
                
                <input type="text" placeholder="Last Name" className="regText" ref={(c) => (lastName = c)}  /> <br />

                <input value={email} className="regText" ref={(c) => (email = c)} type="email" placeholder="email@bearmax.com" /> <br />

                <input  value={pass} className="regText" ref={(c) => (pass = c)} type="password" placeholder="Password" /> <br />

                <input  value={pass} className="regText" ref={(c) => (reType = c)} type="password" placeholder="Retype Password" /> <br />
                
                <input className="regButton" type="submit" value="Register" onClick={registerUser}/> <br />
            </form>
            <a className="regToLog" onClick={() => navigate("/login")}><u>Already have an account? Login!</u></a> 
        </div>
    );
}

export default Register;