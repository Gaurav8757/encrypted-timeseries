
import express from 'express';
import listenerController from './listenerController';

const router = express.Router();

router.post('/save', listenerController.saveData);

export default router;
