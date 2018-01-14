import Widget from '../models/widget.model';
import logger from '../core/logger/app-logger';

const controller = {};

controller.getAll = async (req, res) => {
  try {
    const widgets = await Widget.getAll();
    logger.info('sending all widgets...');
    res.send(widgets);
  } catch (err) {
    logger.error(`error in getting Widgets-${err}`);
    res.send('Got error in getAll');
  }
};

controller.getAllActivated = async (req, res) => {
  try {
    const widgets = await Widget.getAllActivated();
    logger.info('sending all widgets...');
    res.send(widgets);
  } catch (err) {
    logger.error(`error in getting Widgets-${err}`);
    res.send('Got error in getAll');
  }
};

controller.addWidget = async (req, res) => {
  const newWidget = Widget({
    name: req.body.name,
    type: req.body.type,
    params: req.body.params,
    activated: true,
  });
  try {
    const savedWidget = await Widget.addWidget(newWidget);
    logger.info('adding Widget...');
    res.send(savedWidget);
  } catch (err) {
    logger.error(`Error in adding widget-${err}`);
    res.send('Got error in addWidget');
  }
};

controller.updateWidget = async (req, res) => {
  const newWidget = Widget({
    _id: req.body.id,
    name: req.body.name,
    type: req.body.type,
    params: req.body.params,
    activated: req.body.activated,
  });
  try {
    const savedWidget = await Widget.updateWidget(newWidget);
    logger.info('updating Widget...');
    res.send(newWidget);
  } catch (err) {
    logger.error(`Error in updating widget-${err}`);
    res.send('Got error in updateWidget');
  }
};

controller.deleteWidget = async (req, res) => {
  console.log('delete id', req.body.id);
  const widgetId = req.body.id;
  try {
    const removedWidget = await Widget.removeWidget(widgetId);
    logger.info(`Deleted Widget-${removedWidget}`);
    res.send('Widget successfully Deleted');
  } catch (err) {
    logger.error(`Faild to delete Widget-${err}`);
    res.send('Delete Failed!..');
  }
};

export default controller;
