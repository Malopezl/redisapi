const express = require("express");

const response = require("../../../network/response");
const auth = require("./secure");
const Controller = require("./index");

const router = express.Router();

/* Routes */

/**
 * GET /api/post
 * @summary Get a post list
 * @tags post
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Internal server error
 * @example response - 200 - success response example
 * {
 *  "error": false,
 *  "status": 200,
 *  "body": [
 *      {
 *          "id": "999",
 *          "text": "Mi primer post",
 *          "user": "123"
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
router.get("/", auth("list"), list);

router.get("/like", auth("list_own"), postsLiked);

/**
 * GET /api/post/{id}
 * @summary Get an specific post
 * @tags post
 * @param {string} id.query.required - post uniqueID param
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Internal server error
 * @example response - 200 - success response example
 * {
 *  "error": false,
 *  "status": 200,
 *  "body": {
 *      "id": "999",
 *      "text": "Mi primer post",
 *      "user": "123"
 *   }
 * }
 * @example response - 500 - Internal server error example
 * {
 *  "error": true,
 *  "status": 500,
 *  "body": "Internal Server Error"
 * }
 */
router.get("/:id", auth("get"), get);

/**
 * POST /api/post
 * @summary Create post
 * @tags post
 * @param {object} request.body.required - new post info
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Internal server error
 * @example request - example payload
 * {
 *   "id": "1",
 *   "text": "some text",
 *   "user": "1"
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
router.post("/", auth("add"), upsert);

/**
 * PUT /api/post
 * @summary Update post
 * @tags post
 * @param {object} request.body.required - post info
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Internal server error
 * @example request - example payload
 * {
 *   "id": "1",
 *   "text": "some text 1",
 *   "user": "1"
 * }
 * @example response - 200 - success response example
 * {
 *  "error": false,
 *  "status": 200,
 *  "body": {
 *      "id": "1",
 *      "text": "some text 1",
 *      "user": "1"
 *   }
 * }
 * @example response - 500 - Internal server error example
 * {
 *  "error": true,
 *  "status": 500,
 *  "body": "Internal Server Error"
 * }
 */
router.put("/", auth("update", { owner: "user" }), upsert);

router.post("/:id/like", auth("add"), like);

router.get("/:id/like", auth("list"), postLikers);

function list(req, res, next) {
  Controller.list()
    .then((post) => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((post) => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  Controller.upsert(req.body, req.user.id)
    .then((post) => {
      response.success(req, res, post, 201);
    })
    .catch(next);
}

function like(req, res, next) {
  Controller.like(req.params.id, req.user.sub)
    .then((post) => {
      response.success(req, res, post, 201);
    })
    .catch(next);
}

function postLikers(req, res, next) {
  Controller.postLikers(req.params.id)
    .then((post) => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

function postsLiked(req, res, next) {
  Controller.postsLiked(req.user.sub)
    .then((post) => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

module.exports = router;
