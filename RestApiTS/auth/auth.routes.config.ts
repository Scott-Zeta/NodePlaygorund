import { CommonRoutesConfig } from '../common/common.routes.config';
import authController from './controllers/auth.controllers';
import authMiddleware from './middleware/auth.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import jwtMiddleware from './middleware/jwt.middleware';
import { body } from 'express-validator';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    // Initial token issue route
    this.app.post(`/auth`, [
      body('email').isEmail(),
      body('password').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);

    //token refresh route
    //granting a new access token and a refresh token if both previous tokens are valid
    this.app.post(`/auth/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createJWT,
    ]);
    return this.app;
  }
}
