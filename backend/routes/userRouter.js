const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.route("/").get().post();
router.route("/verify/:id").get(userController.verifyUser);
router.route("/:id").get(userController.getUser).patch().delete();

module.exports = router;
