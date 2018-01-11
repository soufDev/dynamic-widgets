import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const defaultProps = {
  message: null,
};

const propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Menu fixed="top" size="huge" inverted color="blue">
        <Container>
          <Menu.Item header onClick={() => this.props.history.push('/')}>
            Home
          </Menu.Item>
          <Menu.Item header onClick={() => this.props.history.push('/widgets')}>
            Widgets
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;
export default withRouter(Header);
