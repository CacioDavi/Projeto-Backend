import app from "../App.js";

function GetUser(req, res) {
    res.send(req.path);

}

export {
    GetUser
}