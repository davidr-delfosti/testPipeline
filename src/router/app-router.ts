import { Router } from 'express';

export class AppRouter {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.init();
  }

  init() {}
}
