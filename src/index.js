import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Login from "./Login";
import Join from "./Join";
import "bootstrap/dist/css/bootstrap.min.css";
import * as firebase from "firebase";
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);
export const AuthContext = React.createContext(null);

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            <body>
                <div className="main">
                    <Join />
                    <h1 className="text-center text-danger">
                        Is logged in? {JSON.stringify(isLoggedIn)}
                    </h1>
                    <Login />
                </div>
            </body>
        </AuthContext.Provider>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
