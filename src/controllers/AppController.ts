import { Request, Response } from 'express';

class AppController {
  public health(req: Request, res: Response): Response {
    return res.json({ healthy: true });
  }
}

export default new AppController();
