import JSONHelpers from "./JSONHelpers.js";

export let UserType;

(function (UserType) {
    UserType[UserType["Librarian"] = 0] = "Librarian";
    UserType[UserType["Student"] = 1] = "Student";
})(UserType || (UserType = {}));

export default class FrontEndAPI {
    cookie = "";

    constructor(path) {
        this.ServerPath = path;
    }

    async apiCall(path, params) {
        const response = await fetch(`${this.ServerPath}${path}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cookie: this.cookie
            },
            body: JSON.stringify(params, JSONHelpers.stringify),
            credentials: "include"
        });

        const setCookie = response.headers.get("set-cookie");
        if (setCookie) {
            this.cookie = setCookie;
        }

        return response.text().then(it => JSON.parse(it, JSONHelpers.parse));
    }

    // API methods as defined before
}
