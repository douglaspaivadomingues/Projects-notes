import express from 'express';
import controller from '../controller/controller.js';

const route = express.Router();

route.get('/', controller.findLog);
route.get('/:id', controller.findLogById);
route.get('/user', controller.findUser);
route.get('/username/:username', controller.findUserName);
route.post('/', controller.addLog);
route.post('/create', controller.addUser);

export default route;