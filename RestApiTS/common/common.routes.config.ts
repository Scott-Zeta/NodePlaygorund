// common route config for extends
import express from 'express';
export class CommonRoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

/* 
A common Route can be useful when:
1. Scalling to create serveral route files.
2. Add more Generic features like logging, it will be auto extended by all children
*/
