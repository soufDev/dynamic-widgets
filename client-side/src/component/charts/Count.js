import React from 'react';
import { Statistic, Card } from 'semantic-ui-react';
import propTypes from 'prop-types';

const propType = {
  value: propTypes.number.isRequired,
  label: propTypes.string.isRequired,
};
const Count = ({ value, label }) => (
  <Card>
    <Card.Content header={<h1>{label}</h1>} style={{ textAlign: 'center' }} />
    <Card.Content>
      <Statistic size="large">
        <Statistic.Value>{value}</Statistic.Value>
      </Statistic>
    </Card.Content>
  </Card>
);
Count.propTypes = propType;
export default Count;
