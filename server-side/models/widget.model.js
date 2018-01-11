import mongoose from 'mongoose';

const widgetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  params: {
    type: Array,
    required: false,
  },
  activated: {
    type: Boolean,
  },
});

const widgetModel = mongoose.model('Widget', widgetSchema);

widgetModel.getAll = () => {
  return widgetModel.find({});
};

widgetModel.getAllActivated = () => {
  return widgetModel.find({ activated: true });
};

widgetModel.addWidget = (newWidget) => {
  return newWidget.save();
};

widgetModel.updateWidget = (widget) => {
  return widgetModel.findByIdAndUpdate(widget._id, widget);
};

widgetModel.removeWidget = (widgetId) => {
  return widgetModel.remove({ _id: widgetId });
};

export default widgetModel;
