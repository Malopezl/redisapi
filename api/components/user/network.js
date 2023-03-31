const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

/* Routes */

/**
 * GET /api/user
 * @summary Get a user list
 * @tags user
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Internal server error
 * @example response - 200 - success response example
 * {
 *  "error": false,
 *  "status": 200,
 *  "body": [
 *      {
 *          "id": "1",
 *          "name": "Carlos"
 *      }
 *   ]
 * }
 * @example response - 500 - Internal server error example
 * {
 *  "error": true,
 *  "status": 500,
 *  "body": "Internal Server Error"
 * }
 */
router.get("/", list);
/**
 * GET /api/user/{id}
 * @summary Get an specific user
 * @tags user
 * @param {string} id.query.required - User uniqueID param
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Internal server error
 * @example response - 200 - success response example
 * {
 *  "error": false,
 *  "status": 200,
 *  "body": {
 *      "id": "1",
 *      "name": "Carlos"
 *   }
 * }
 * @example response - 500 - Internal server error example
 * {
 *  "error": true,
 *  "status": 500,
 *  "body": "Internal Server Error"
 * }
 */
router.get("/:id", get);
/**
 * POST /api/user
 * @summary Create user
 * @tags user
 * @param {object} request.body.required - new user info
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Internal server error
 * @example request - example payload
 * {
 *   "id": "1",
 *   "name": "Carlos"
 * }
 * @example response - 200 - success response example
 * {
 *  "error": false,
 *  "status": 200,
 *  "body": "OK"
 * }
 * @example response - 500 - Internal server error example
 * {
 *  "error": true,
 *  "status": 500,
 *  "body": "Internal Server Error"
 * }
 */
router.post("/", upsert);
/**
 * PUT /api/user
 * @summary Update user
 * @tags user
 * @param {object} request.body.required - user info
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Internal server error
 * @example request - example payload
 * {
 *   "id": "1",
 *   "name": "Juan"
 * }
 * @example response - 200 - success response example
 * {
 *  "error": false,
 *  "status": 200,
 *  "body": {
 *      "id": "1",
 *      "name": "Juan"
 *   }
 * }
 * @example response - 500 - Internal server error example
 * {
 *  "error": true,
 *  "status": 500,
 *  "body": "Internal Server Error"
 * }
 */
router.put("/", secure("update"), upsert);

/* Internal functions */
function list(req, res) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function get(req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function upsert(req, res) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;
