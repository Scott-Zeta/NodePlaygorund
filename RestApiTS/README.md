# REST API

Intend to recall what I learned before and implement with more professional debug and logging features

## Library in use

- **debug** is a module that we will use to avoid calling console.log() while developing our application. This way, we can easily filter debug statements during troubleshooting. They can also be switched off entirely in production instead of having to be removed manually.
- **winstonis** responsible for logging requests to our API and the responses (and errors) returned. express-winston integrates directly with Express.js, so that all standard API-related winston logging code is already done.
- **cors** is a piece of Express.js middleware that allows us to enable cross-origin resource sharing. Without this, our API would only be usable from front ends being served from the exact same subdomain as our back end.

## Module Design

- **Route Configuration**: Define the requests API can handle

- **Service**: Tasks such as connecting to Database models, doing queries, connecting to external services that requried by specific request. (Functional Features)

- **Middleware**: Running specific request validations before the final controller of a route handles its specifics. (Validation and Authentication)

- **Models**: Defining data models matching a given database schema, to facilitate data storage and retrieval. (Processing data Defining)

- **Controllers**: Separating the route configuration from the code that finally (after any middleware) processes a route request, calls the above service functions if necessary, and gives a response to the client. (Deliver result to clients)
