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

## Permission Flag

Bit wise AND `&` and power of 2 numbers(1, 2, 4, 8,...) can be used for implement permission up to 31 flags.
For an example, an audio-accessible, international blog might have these permissions:

- 1: Authors can edit text.
- 2: Illustrators can replace illustrations.
- 4: Narrators can replace the audio file corresponding to any paragraph.
- 8: Translators can edit translations.

This approach allows for all sorts of permission flag combinations for users:

- An author’s (or editor’s) permission flags value will be just the number 1.
- An illustrator’s permission flags will be the number 2. But some authors are also illustrators. In that case, we sum the relevant permissions values: 1 + 2 = 3.
- A narrator’s flags will be 4. In the case of an author who narrates their own work, it will be 1 + 4 = 5. If they also illustrate, it’s 1 + 2 + 4 = 7.
  A translator will have a permission value of 8. Multilingual authors would then have flags of 1 + 8 = 9. A translator who also narrates (but is not an author) would have 4 + 8 = 12.
- If we want to have a sudo admin, having all combined permissions, we can simply use 2,147,483,647, which is the maximum safe value for a 32-bit integer.
  Readers can test this logic as plain JavaScript:

- User with permission 5 trying to edit text (permission flag 1):
  `Input: 5 & 1
Output: 1`

- User with permission 1 trying to narrate (permission flag 4):
  `Input: 1 & 4
Output: 0`

- User with permission 12 trying to narrate:
  `Input: 12 & 4
Output: 4`

When the output is 0, we block the user; otherwise, we let them access what they are trying to access.

### Important Notes for Permission and JWT

When a site owner changes a user’s permissions—for example, to attempt to lock out a misbehaving user—the user won’t see this take effect until their next JWT refresh. That’s because the permissions check uses the JWT data itself to avoid an extra database hit.

Services like Auth0 can help by offering automatic token rotation, but users will still experience unexpected app behavior during the time between rotations, however short that normally may be. To mitigate this, developers must take care to actively revoke refresh tokens in response to permissions changes.

## Start Up the App

### Feature from TS

1. `"start": "tsc && node --unhandled-rejections=strict ./dist/app.js"` for compile TS code to JS to `./dist`. Meanwhile, `--unhandled-rejections=strict`, app will shutdown if there is any unhandled Error, forcing handle any expected Error during dev and shutdown the app to prevent any unknown issue.

## Run local DB service

`docker-compose up -d`
`docker-compose down`
