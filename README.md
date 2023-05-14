# Curso de Node.js: Autenticación, Microservicios y Redis

### _Este repositorio contiene la practica realizada en el curso._

## Tech

Este proyecto utiliza los siguientes paquetes:

- [express] - Fast, unopinionated, minimalist web framework for Node.js
- [express-jsdoc-swagger] - Document your express endpoints using swagger OpenAPI 3 Specification.
- [jsonwebtoken] - JSON Web Token implementation for Node.js
- [bcrypt] - A library to help you hash passwords.
- [redis] - An open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.

## Installation

Este proyecto requiere [Node.js](https://nodejs.org/) v16.18.0 para correr.

### Este proyecto esta dividido en varias partes.

- Para la administracion de usuarios y autenticacion se debe ejecutar el archivo index.js de la carpeta api.
- Para los posts se debe ejecutar el archivo index.js de la carpeta post.
- Para la conexion a DB se debe ejecutar el archivo index.js de la carpeta mysql.
- Para el uso de cache se debe ejecutar el archivo index.js de la carpeta cache.

| Tomar en cuenta los puertos utilizados dentro del archivo config.js de la carpeta raiz.

## License

MIT

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[express]: http://expressjs.com
[express-jsdoc-swagger]: https://brikev.github.io/express-jsdoc-swagger-docs/#/
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[bcrypt]: https://www.npmjs.com/package/bcrypt
[redis]: https://redis.com/
