import React, {useContext} from 'react';
import { useHistory } from "react-router-dom";
import "./Login.css";
import {auth, firebase} from "../../firebase";
import {UserIDContext} from "../../App";
import GoogleButton from 'react-google-button';
import Cookies from 'universal-cookie';

const Login = (props) => {
    const cookies = new Cookies();
    const {_, setUserID} = useContext(UserIDContext);

    async function sendLoginRequest(idToken, email, displayName) {

        const responseJSON = {
            "idToken": idToken,
            "email": email,
            "displayName": displayName
        }
        const request = new Request("/api/login", {
            method: "post",
            body: JSON.stringify(responseJSON),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
        const response = await fetch(request);
        if (response.status === 401) {
          throw new Error("auth failed")
        }
        
    }

    const history = useHistory();


    async function googleLogin() {
      //1 - init Google Auth Provider
      const provider = new firebase.auth.GoogleAuthProvider();
      //2 - create the popup signIn
      await auth.signInWithPopup(provider).then(
        async (result) => {
            const idToken = await firebase.auth().currentUser.getIdToken()
            console.log({idToken})
            console.log(result.user)
            console.log(result.user.email, result.user.displayName)
            try {
              await sendLoginRequest(idToken, result.user.email, result.user.displayName);
              cookies.set('userID', result.user.uid);
              // cookies.set('resumeID', "");
              history.replace("/select");
            } catch (error) {
              alert("Login failed")
              console.error({message: "Login failed", error})
            }
        },
        function (error) {
          console.error(error);
        }
      );
    }

        return (
            <div className="loginComp">
                <div className="loginButton">
                    <GoogleButton onClick={googleLogin} />
                </div>
            </div>
        )
}
export default Login;