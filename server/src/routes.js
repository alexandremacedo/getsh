import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';
import PhotoController from './app/controllers/PhotoController';
import UserPhotoController from './app/controllers/UserPhotoController';
const routes = new Router();
const upload = multer(multerConfig);

routes.get('/home', (req, res) => {
  return res.json({ message: 'HOME' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/photos', PhotoController.store);
routes.get('/photos/:userId/userphotos', UserPhotoController.index);



routes.post('/files', upload.single('file'), FileController.store);

export default routes;
