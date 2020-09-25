import React from "react";
import Login from "./Login";
import Join from "./Join";

const routes = [
    {
        name: "Join",
        path: "/",
        exact: true,
        main: () => (
            <body>
                <div className="main">
                    <Join />

                    <Login />
                </div>
            </body>
        )
    }
];

export default routes;
