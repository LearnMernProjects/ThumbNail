import express from 'express'
import { getUsersThumbnails, getThumbnailbyId } from '../controllers/UserController.js';

const UserRouter = express.Router();

console.log('UserRoutes loaded - setting up routes');

UserRouter.get('/thumbnails', (req, res, next) => {
    console.log('GET /thumbnails route hit');
    next();
}, getUsersThumbnails);

UserRouter.get('/thumbnail/:id', getThumbnailbyId);

export default UserRouter;