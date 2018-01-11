import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const defaultProps = {};
const propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired,
};
const MyCard = ({ header, description, meta }) => (
  <Card>
    <Card.Content header={header} />
    <Card.Content description={description} />
    <Card.Content extra>{meta}</Card.Content>
  </Card>
);

MyCard.defaultProps = defaultProps;
MyCard.propTypes = propTypes;

export default MyCard;
