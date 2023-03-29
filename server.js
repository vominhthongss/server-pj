/* Importing the express module and creating an express application. */
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
/* Importing the express-fileupload module. */
const fileUpload = require("express-fileupload");

/* Importing the swagger-jsdoc module. */
const swaggerJSDoc = require("swagger-jsdoc");
/* Defining the swagger definition. */
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3002",
      description: "Development server",
    },
  ],
  basePath: "/",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

/* Defining the options for the swagger-jsdoc module. */
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};
/* Creating a swagger specification from the options defined above. */
const swaggerSpec = swaggerJSDoc(options);
/* Importing the swagger-ui-express module. */
const swaggerUi = require("swagger-ui-express");

/* Serving the swagger specification. */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Setting the port to 3002. */
port = process.env.PORT || 3002;
/* Creating a server. */
var server = require("http").Server(app);
/* Creating a server and listening on port 3002. */
server.listen(3002);
/* Logging the port number to the console. */
console.log("API server started on: " + port);
/* Parsing the body of the request. */
app.use(bodyParser.urlencoded({ extended: true }));
/* Parsing the body of the request. */
app.use(bodyParser.json());

/* Setting the file size limit to 100MB. */
app.use(
  fileUpload({
    limits: {
      fileSize: 100000000,
    },
    abortOnLimit: true,
  })
);
/* Serving the static files from the `routes/upload` directory. */
app.use(express.static("routes/upload"));
/* Importing the appRoutes.js file. */
var routes = require("./routes/appRoutes");
/* Calling the function `routes` and passing the `app` object to it. */
routes(app);
