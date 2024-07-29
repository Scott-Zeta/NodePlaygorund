// UsersRoute extends from common Route config
import { CommonRoutesConfig } from '../common/common.routes.config';
// import methods from class controller and middleware
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application {
    // Two routes for /users and /users/:userId
    /* 
      1. Let any client call users endpoint with GET and POST request
      2. Let any client call users/:userId endpoint with GET, PUT, PATCH, DELETE request
        Middlewares will be added to the /users/:userId endpoint
    */
    this.app.route(`/users`).get(UsersController.listUsers).post(
      // As export new UsersMiddleware() with OOP, call the method from the class that has already created a new instance.
      UsersMiddleware.validateRequiredUserBodyFields,
      UsersMiddleware.validateSameEmailDoesntExist,
      UsersController.createUser
    );

    // extract userId from the url parameter, assign to the body content
    /* 
    Middleware shall always be registered before the route need it.
    */
    this.app.param(`userId`, UsersMiddleware.extractUserId);

    this.app
      .route(`/users/:userId`)
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    /* ".all(UsersMiddleware.validateUserExists)" seems has conflict with the instruction,
      instruction said it applied to every route including Put and Patch,
      waiting for further validation.
    */
    this.app.put(`/users/:userId`, [
      UsersMiddleware.validateRequiredUserBodyFields,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      UsersController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      UsersMiddleware.validatePatchEmail,
      UsersController.patch,
    ]);

    return this.app;
  }
}
