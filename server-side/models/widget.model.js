import mongoose, { Schema } from 'mongoose';

const widgetSchema = Schema({
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
widgetSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
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
  return widgetModel.findByIdAndUpdate(widget.id, widget);
};

widgetModel.removeWidget = (widgetId) => {
  return widgetModel.remove({ _id: widgetId });
};

export default widgetModel;
