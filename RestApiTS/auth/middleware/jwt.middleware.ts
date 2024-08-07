import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Jwt } from '../../common/types/jwt';
import usersService from '../../users/services/users.service';

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

class JwtMiddleware {
  verifyRefreshBodyField(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res
        .status(400)
        .send({ errors: ['Missing required field: refreshToken'] });
    }
  }

  async validRefreshNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user: any = await usersService.getUserByEmail(res.locals.jwt.email);
    // get refreshkey(salt) from jwt payload
    const salt = crypto.createSecretKey(
      Buffer.from(res.locals.jwt.refreshKey.data)
    );
    // recreate refresh token with same salt, payload, and hash method for comparison
    const recreateRefreshToken = crypto
      .createHmac('sha512', salt)
      .update(res.locals.jwt.userId + jwtSecret)
      .digest('base64');
    if (recreateRefreshToken === req.body.refreshToken) {
      //if pass the comparison, set user info from DB query to req.body
      req.body = {
        userId: user._id,
        email: user.email,
        permissionFlags: user.permissionFlags,
      };
      return next();
    } else {
      return res.status(400).send({ errors: ['Invalid refresh token'] });
    }
  }

  validJWTNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send();
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
          next();
        }
      } catch (err) {
        console.log(err);
        return res.status(403).send();
      }
    } else {
      return res.status(401).send();
    }
  }
}

export default new JwtMiddleware();
