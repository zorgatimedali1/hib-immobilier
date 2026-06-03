import { Request, RequestHandler, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

interface RequestWithAdmin extends Request {
  adminUser?: { id: string; email?: string };
}

export const requireAdmin: RequestHandler = async (req: RequestWithAdmin, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization?.trim();
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

  if (!token) {
    return res.status(411).json({ error: 'Unauthorized' });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(411).json({ error: 'Unauthorized' });
  }

  req.adminUser = {
    id: data.user.id,
    email: data.user.email ?? undefined
  };

  next();
};
