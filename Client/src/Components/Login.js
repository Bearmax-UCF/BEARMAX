import React from "react";
import { useNavigate } from "react-router-dom";
//import { buildPath } from './path';

import Logo from "./Images/face.png";

function Login ()
{
    var loginName;
    var loginPassword;

    const navigate = useNavigate();

    const doLogin = async (event) => {
        event.preventDefault();

        var obj = {UserName: loginName.value, Password: loginPassword.value };
        var js = JSON.stringify(obj);

        if (loginName.value === "" || loginPassword === "") {
            //setMessage("Please fille in both feilds.");
            return;
        } else {
            // api calls will happen here
        }
    }

    return (
        <div>
            <img src={Logo} className="landingLogo" alt="Logo: bear max face" />

            <form onSubmit={doLogin}>
                <input type="text" id="loginName" placeholder="Username" ref={(c) => (loginName = c)}/> {" "}
                <br />

                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => (loginPassword = c)}/> {" "}
                <br />

                <button type="submit" className="login" onClick={doLogin}>Login</button>
            </form>

            
        </div>
    );
}

export default Login;