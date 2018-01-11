import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Checkbox } from 'semantic-ui-react';
import 'react-select/dist/react-select.css';

const defaultProps = {
  errors: null,
  isFetching: false,
};

const propTypes = {
  onChange: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  defaultValue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    params: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onChangeParams: PropTypes.func.isRequired,
};

const charts = [
  { text: 'Card', value: 'Card' },
  { text: 'Count', value: 'Count' },
  { text: 'PieChartWithCustomizedLabel', value: 'PieChartWithCustomizdLabel' },
  { text: 'SimpleAreaChart', value: 'SimpleAreaChart' },
  { text: 'StackedBarChart', value: 'StackedBarChart' },
  { text: 'StraightAnglePieChart', value: 'StraightAnglePieChart' },
];

const entitiesName = [
  { text: 'Organizations', value: 'organizations' },
  { text: 'Users', value: 'users' },
  { text: 'Groups', value: 'groups' },
  { text: 'Form Types', value: 'formtypes' },
];

const organizationParams = ['name', 'userlimit', 'label', 'creationDate', 'activated'];
const userParams = ['username', 'email', 'activated', 'group'];
const groupParams = ['GroupName', 'tags'];
const formtypeParams = ['name', 'user', 'activated'];

const params = (name) => {
  if (name.toLowerCase().trim() === 'organizations') {
    return organizationParams;
  }
  if (name.toLowerCase().trim() === 'users') {
    return userParams;
  }
  if (name.toLowerCase().trim() === 'groups') {
    return groupParams;
  }
  if (name.toLowerCase().trim() === 'formtypes') {
    return formtypeParams;
  }
  return [];
};

const RadioGroupParams = ({ entityName, onChange, paramValue }) =>
  params(entityName).map(value => (
    <Form.Field>
      <Checkbox
        radio
        label={value}
        name="params"
        value={value}
        onChange={onChange}
        checked={paramValue === value}
      />
    </Form.Field>
  ));

const FormWidget = ({ onChange, onChangeParams, defaultValue, isFetching }) => (
  <div>
    <Form loading={isFetching}>
      <Form.Field required>
        <label htmlFor="name">Name</label>
        <Select onChange={onChange} value={defaultValue.name} options={entitiesName} name="name" />
      </Form.Field>
      <Form.Field required>
        <label htmlFor="type">Charts</label>
        <Select onChange={onChange} value={defaultValue.type} options={charts} name="type" />
      </Form.Field>
      {defaultValue.name && (
        <Form.Field required>
          <label htmlFor="params">Params</label>
        </Form.Field>
      )}
      <RadioGroupParams
        entityName={defaultValue.name}
        onChange={onChangeParams}
        paramValue={defaultValue.params}
      />
    </Form>
  </div>
);

FormWidget.defaultProps = defaultProps;
FormWidget.propTypes = propTypes;

export default FormWidget;
