import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Message, Loader } from 'semantic-ui-react';
import FormWidget from './FormWidget';
import * as widgetActions from '../../actions/widget';

const defaultProps = {
  error: null,
  message: null,
};

const propTypes = {
  actions: PropTypes.shape({ createWidget: PropTypes.func }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  message: PropTypes.string,
  error: PropTypes.bool,
};

class NewWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'organizations',
      type: 'Card',
      params: 'name',
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeParams = this.onChangeParams.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  onCancel() {
    this.props.history.push('/widgets');
  }

  onChange(e, target) {
    const fields = this.state;
    fields[`${target.name}`] = target.value;
    this.setState({ fields });
  }

  onChangeParams(e, { value }) {
    this.setState({ params: value });
  }

  checkResult() {
    const { error } = this.props;
    if (!error) this.props.history.push('/widgets');
  }

  handleCreate() {
    const widget = {
      name: this.state.name,
      type: this.state.type,
      params: this.state.params.split(' '),
    };
    this.props.actions
      .createWidget(widget)
      .then(() => {
        this.checkResult();
      })
      .catch(() => {});
  }

  renderForm() {
    const { message, isFetching } = this.props;
    return (
      <div>
        {!message ? null : <Message error header={message} />}
        <h1>Add Widget</h1>
        <hr />
        <FormWidget
          defaultValue={this.state}
          onChange={this.onChange}
          onChangeParams={this.onChangeParams}
        />
        <hr />
        <Grid>
          <Grid.Column width={2} floated={'right'}>
            <Button color={'green'} loading={isFetching} onClick={this.handleCreate}>
              Save
            </Button>
          </Grid.Column>
          <Grid.Column width={6} floated={'right'}>
            <Button onClick={this.onCancel}>Cancel</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        <Loader active={isFetching} inline />
        {this.renderForm()}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(widgetActions, dispatch),
  };
}
function mapStateToProps(state) {
  return {
    isFetching: state.widget.isFetching,
    error: state.widget.error,
    message: state.widget.message,
  };
}

NewWidget.defaultProps = defaultProps;
NewWidget.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewWidget));
