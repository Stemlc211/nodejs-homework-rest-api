

const express = require("express");
const ctrl = require("../controllers/users");
const auth = require("../middlewares/auth");

const router = express.Router();


router.post("/signup", ctrl.signup);


router.post("/login", ctrl.login);


router.get("/logout", auth, ctrl.logout);


router.get("/current", auth, ctrl.current);


router.patch("/", auth, ctrl.updateSubscription); 

module.exports = router;
