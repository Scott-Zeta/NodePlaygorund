# REST API

Intend to recall what I learned before for RESTApi, introducing the TS features into the backend dev and implement with more professional debug and logging features.

## Library in use

- **debug** is a module that we will use to avoid calling console.log() while developing our application. This way, we can easily filter debug statements during troubleshooting. They can also be switched off entirely in production instead of having to be removed manually.
- **winstonis** responsible for logging requests to our API and the responses (and errors) returned. express-winston integrates directly with Express.js, so that all standard API-related winston logging code is already done.
- **cors** is a piece of Express.js middleware that allows us to enable cross-origin resource sharing. Without this, our API would only be usable from front ends being served from the exact same subdomain as our back end.

## Module Design

- **Route Configuration**: Define the requests API can handle.

- **Service**: Tasks such as connecting to Database models, doing queries, connecting to external services that requried by specific request. Encapsulating Business Logic into functions that Middleware and Controllers can call.

- **Middleware**: Running specific request validations before the final controller of a route handles its specifics. Validate prerequisite conditions before app calls the appropriate controller function.

- **Models**: Defining data models matching a given database schema, to facilitate data storage and retrieval. Describe the data and aid in compile-time checks.

- **Controllers**: Separating the route configuration from the code that finally (after any middleware) processes a route request, calls the above service functions if necessary, and gives a response to the client. Use Services to process the request before finally sending a response to requester.

## Route Configuration

### Feature from TS

1. Extend abstract method in TS. Ensure children class always match with parent's signature or TS Complier will alarm.

## Middleware

Any piece of middleware, there are three types of fields:

- **Request**: The Request is the way Express.js represents the HTTP request to be handled. This type upgrades and extends the native Node.js request type.

- **Response**: The Response is likewise how Express.js represents the HTTP response, again extending the native Node.js response type.

- **NextFunction**: The NextFunction serves as a callback function, allowing control to pass through any other middleware functions. Along the way, **all middleware will share the same request and response objects before the controller finally sends a response back to the requester.**

## Models

### DAOs and DTOs

- **Data Access Objects(DAOs)**: Responsible for connectiong to a defined DB and performing CRUD operations. DAOs are the service that use the DTOs.

- **Data Transfer Objects(DTOs)**: An Object that holds the raw data that DAO will send to/receive from the DB. DTOs are objects that conform to data model types.

DAOs and DTOs can provide a native solution for interacting with DB and validation, similar to Schema and ORM. Usually it is not the preference for smaller projects, sometimes DTOs can get more complicated such as representing nested DB entities.

### Workflow Conclusion

1. Request accepted by endpoint, content will be validated and transformed into a DTO(Data Transfer Objects) instance.
2. DTO instance will be passed to DAO(Data Access Object).
3. In DAO, a DB model will be created by its library, apply with Schema validation.
4. Once all validation passed, DB Operation will be applied.
   (Key Difference between workflow I used before: An addtional DTO instance layer between the request and DB operation. Since most simpler app just copy the request content without further change or decision, the DTO step has been droped)

### New features from TS

Partial<T> in TS can create a new type by copying another type but making all fields be optional.

## Start Up the App

### Feature from TS

1. `"start": "tsc && node --unhandled-rejections=strict ./dist/app.js"` for compile TS code to JS to `./dist`. Meanwhile, `--unhandled-rejections=strict`, app will shutdown if there is any unhandled Error, forcing handle any expected Error during dev and shutdown the app to prevent any unknown issue.

## Run local DB service

`docker-compose up -d`
`docker-compose down`
