import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
const newHistory = createBrowserHistory();

import { Builder } from "./component/Builder";
import { Home } from "./component/Home";
import { Submit } from "./component/Submit";
import { Submissions } from "./component/Submissions";

ReactDOM.render((
    <Router history={newHistory}>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/Builder" component={Builder} />
            <Route path="/Home" component={Home} />
            <Route path="/Submit" component={Submit} />
            <Route path="/Submissions" component={Submissions} />
        </div>
    </Router>
),
    document.getElementById("app")
);