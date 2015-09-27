/* Static dependencies */
import "../app.html";
import "../stylesheets/base";

/* JS dependencies */
import React from "react";
import VenyooApp from "./components/VenyooApp";
import Cookies from "js-cookie";

/* Login information */
if (Cookies.get("login") === undefined) {
	document.location.href = "login.html";
}

React.render(<VenyooApp />, document.querySelector("#main"));