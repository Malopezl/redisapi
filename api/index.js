const express = require("express");
const expressJSDocSwagger = require("express-jsdoc-swagger");

const config = require("../config");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const post = require("./components/post/network");
const errors = require("../network/errors");

const options = {
  info: {
    version: "1.0.0",
    title: "Red Social Node",
    description: "Una red social en NodeJS",
    license: {
      name: "MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
  filesPattern: "./**/*.js",
  baseDir: __dirname,
};

const app = express();

expressJSDocSwagger(app)(options);

app.use(express.json());

// Routes to be defined
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/post", post);

app.use(errors);

app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});
