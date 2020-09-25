import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import * as firebase from "firebase";

const Login = history => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                if (res.user) Auth.setLoggedIn(true);
            })
            .catch(e => setErrors(e.message));
    };
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(result => {
                        console.log("result in login.js : ", result);
                        // history.push("/reports");
                        console.log("history : ", history);
                        Auth.setLoggedIn(true);
                    })
                    .catch(e => setErrors(e.message));
            });
    };

    return (
        <section class="sign-in" id="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure>
                            <img
                                src="images/signin-image.jpg"
                                alt="something visual for login"
                            />
                        </figure>
                        <a href="#sign-up" class="signup-image-link">
                            Create an account
                        </a>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Log in</h2>
                        <form
                            onSubmit={e => handleForm(e)}
                            class="register-form"
                            id="login-form">
                            <div class="form-group">
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    name="email"
                                    type="email"
                                    placeholder="email"
                                    className="px-4"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    name="password"
                                    id="your_pass"
                                    placeholder="Password"
                                    className="px-4"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="checkbox"
                                    name="remember-me"
                                    id="remember-me"
                                    class="agree-term"
                                />
                                <label
                                    for="remember-me"
                                    class="label-agree-term">
                                    <span>
                                        <span />
                                    </span>
                                    Remember me
                                </label>
                            </div>
                            <button
                                onClick={() => signInWithGoogle()}
                                className="googleBtn"
                                type="button">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                    alt="logo"
                                />
                                Login With Google
                            </button>
                            <div class="form-group form-button">
                                <button
                                    type="submit"
                                    name="signin"
                                    id="signin"
                                    class="form-submit">
                                    Log in
                                </button>
                            </div>

                            <span>{error}</span>
                        </form>
                        <div class="social-login">
                            <span class="social-label">Contact me on </span>
                            <ul class="socials">
                                <li>
                                    <a href="https://www.facebook.com/cjrules12">
                                        <i class="display-flex-center zmdi zmdi-facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/jainchetn">
                                        <i class="display-flex-center zmdi zmdi-twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/terminatorDX">
                                        <i class="display-flex-center zmdi zmdi-github" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
