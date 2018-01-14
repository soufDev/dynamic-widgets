import express from 'express';
import widgetController from '../controllers/widget.controller';

const router = express.Router();

router.get('/widgets', (req, res) => {
  widgetController.getAll(req, res);
});
router.get('/activated/widgets', (req, res) => {
  widgetController.getAllActivated(req, res);
});

router.put('/widget', (req, res) => {
  widgetController.updateWidget(req, res);
});
router.post('/widget', (req, res) => {
  widgetController.addWidget(req, res);
});

router.delete('/widget', (req, res) => {
  widgetController.deleteWidget(req, res);
});

export default router;
