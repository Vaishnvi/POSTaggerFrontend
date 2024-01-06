import React from "react";
import '../styles/signIn.css'

function SignIn(props) {
    return (
        <div className="signinbox" onClick={props.onClick}>
            <div className="si">Sign In</div>
        </div>
    );
}

export default SignIn