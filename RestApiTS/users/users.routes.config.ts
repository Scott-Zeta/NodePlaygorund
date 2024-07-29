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

    this.app
      .route(`/users/:userId`)
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          // this middleware function runs before any request to /users/:userId
          // but it doesn't accomplish anything just yet---
          // it simply passes control to the next applicable function below using next()
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.userId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id ${req.params.userId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.userId}`);
      });
    return this.app;
  }
}
