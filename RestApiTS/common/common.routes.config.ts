// common route config for extends
import express from 'express';
export abstract class CommonRoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }
  getName() {
    return this.name;
  }
  abstract configureRoutes(): express.Application;
  // Using Typescript abstract class to force the child class to implement the configureRoutes method.
  // Any class extending CommonRoutesConfig must implement the configureRoutes methods matching the signature.
}

/* 
A common Route can be useful when:
1. Scalling to create serveral route files.
2. Add more Generic features like logging, it will be auto extended by all children
*/
