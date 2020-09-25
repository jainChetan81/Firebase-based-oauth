import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import * as firebase from "firebase";

const Join = history => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                if (res.user) Auth.setLoggedIn(true);
            })
            .catch(e => {
                setErrors(e.message);
            });
    };
    const handleGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(result => {
                        console.log("result join.js : ", result);
                        // history.push("/reports");
                        console.log("history : ", history);
                        Auth.setLoggedIn(true);
                    })
                    .catch(e => setErrors(e.message));
            });
    };

    return (
        <section className="signup" id="sign-up">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form
                            onSubmit={e => handleForm(e)}
                            className="register-form"
                            id="register-form">
                            <div className="form-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    name="email"
                                    id="email"
                                    placeholder="Your Email"
                                    className="px-4"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}
                                    name="password"
                                    value={password}
                                    id="pass"
                                    placeholder="Password"
                                    className="px-4"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="checkbox"
                                    name="agree-term"
                                    id="agree-term"
                                    className="agree-term"
                                />
                                <label
                                    htmlFor="agree-term"
                                    className="label-agree-term">
                                    <span>
                                        <span />
                                    </span>
                                    I agree all statements in{" "}
                                    <strong className="term-service">
                                        Terms of service
                                    </strong>
                                </label>
                            </div>
                            <button
                                onClick={() => handleGoogleLogin()}
                                className="googleBtn"
                                type="button">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                    alt="visual for googlebutton join.js"
                                />
                                Join With Google
                            </button>
                            <div className="form-group form-button">
                                <button
                                    type="submit"
                                    name="signup"
                                    id="signup"
                                    className="form-submit">
                                    Register
                                </button>
                            </div>
                            <span>{error}</span>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure>
                            <img
                                src="images/signup-image.jpg"
                                alt="visual for join.js"
                            />
                        </figure>
                        <a href="#sign-in" class="signup-image-link">
                            I am already member
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Join;
