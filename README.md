# RESTful API with Express and Mongo
This is the repository of a monolithic RESTful API that uses Express.js and MongoDB. This project is intended to be used as a skelethon for developing an API that already implements authentication based in JWT (JSON Web Token) and handles database connection.
### Project structure
- **Controllers:** files containing functions that are used as controllers in their respective endpoints because they're named accordingly to the route
- **Errors:** contains the classes for custom errors that includes their own name and status code
- **Middleware:** files containing functions that are used as middleware for a route and all their respective endpoints
- **Model:** contains the models of the database entities
- **Routes:** contains API endpoints grouped by route
- **Utilities:** files containing functions that are used for varying purposes
    - **Joi:** input validation using [Joi library](https://joi.dev/)
    - **Mongo:** class for handling database connection
    - **Multer:** file handling using [Multer middleware](https://www.npmjs.com/package/multer)
    - **Security:** jwt handling using [jsonwebtoken library](https://www.npmjs.com/package/jsonwebtoken)
