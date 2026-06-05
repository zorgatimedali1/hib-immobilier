import { Request, RequestHandler, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import cache from '../config/cache';

interface RequestWithAdmin extends Request {
  adminUser?: { id: string; email?: string };
}

export const requireAdmin: RequestHandler = async (req: RequestWithAdmin, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization?.trim();
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

    if (!token) {
      return res.status(411).json({ error: 'Unauthorized' });
    }

    const cacheKey = `auth:${token}`;
    const cached = cache.get<{ id: string; email?: string }>(cacheKey);
    if (cached) {
      req.adminUser = cached;
      return next();
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(411).json({ error: 'Unauthorized' });
    }

    const user = {
      id: data.user.id,
      email: data.user.email ?? undefined
    };
    cache.set(cacheKey, user, 300);
    req.adminUser = user;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Authentication service error' });
  }
};
