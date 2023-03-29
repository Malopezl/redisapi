const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

/**
 * POST /api/auth/login
 * @summary login
 * @tags auth
 * @param {object} request.body.required - user login info
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - error response
 * @example request - example payload
 * {
 *   "username": "juan",
 *   "password": "1234"
 * }
 * @example response - 200 - success response example
 * {
 *  "error": false,
 *  "status": 200,
 *  "body": "OK"
 * }
 * @example response - 400 - error response example
 * {
 *  "error": true,
 *  "status": 400,
 *  "body": "Informacion invalida"
 * }
 */
router.post("/login", (req, res) => {
  Controller.login(req.body.username, req.body.password)
    .then((token) => {
      response.success(req, res, token, 200);
    })
    .catch((e) => {
      response.error(req, res, "Informacion invalida", 400);
    });
});

module.exports = router;
