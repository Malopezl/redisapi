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

router.get("/:id/following", following);

router.post("/follow/:id", secure("follow"), follow);

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
function list(req, res, next) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function follow(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function following(req, res, next) {
  return Controller.following(req.params.id)
    .then((data) => {
      return response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
