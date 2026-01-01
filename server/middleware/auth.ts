import { Request, Response, NextFunction } from 'express';
const protect = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement authentication logic
    const { isLoggedIn, userId } = req.session;
    if (!isLoggedIn || !userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    next();
}
export default protect;