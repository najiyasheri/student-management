import { Request, Response, NextFunction } from "express";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  if ((req.session as any).isAdmin) {
    return next();
  }

  res.redirect("/login");
}
