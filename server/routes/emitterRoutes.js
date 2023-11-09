// emitterRoutes.js
import express from 'express';
import emitterController from '../controllers/emitterController.js';

const router = express.Router();

router.get('/emit', (req, res) => {
  emitterController.emitData();
  console.log(emitterController.emitData())();
  res.send('Data emission started');
});

export default router;
