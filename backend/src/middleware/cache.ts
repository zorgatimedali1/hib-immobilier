import { Request, Response, NextFunction } from 'express';
import cache from '../config/cache';

export function cacheMiddleware(duration: number = 300) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `__cache__${req.originalUrl}`;
    const cached = cache.get(key);
    if (cached) {
      return res.status(200).json(cached);
    }
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      cache.set(key, body, duration);
      return originalJson(body);
    };
    next();
  };
}

export function invalidateCache(pattern?: string) {
  if (pattern) {
    const keys = cache.keys().filter((k) => k.includes(pattern));
    keys.forEach((k) => cache.del(k));
  } else {
    cache.flushAll();
  }
}
