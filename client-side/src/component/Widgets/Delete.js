import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../../actions/widget';

const defaultProps = {
  headerText: 'Delete Widget',
  contentText: 'Are you Sure you want to delete this Widget',
  message: null,
  error: null,
};

const propTypes = {
  headerText: PropTypes.string,
  contentText: PropTypes.string,
  actions: PropTypes.shape({
    fetchAll: PropTypes.func.isRequired,
    deleteWidget: PropTypes.func.isRequired,
  }).isRequired,
  widgets: PropTypes.shape({ content: PropTypes.array }).isRequired,
  message: PropTypes.string,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
  error: PropTypes.bool,
};

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.onClose = this.onClose.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchAll();
  }

  onClose() {
    this.props.history.push('/widgets');
  }

  onDelete() {
    const { widgets } = this.props;
    const id = this.props.match.params.id;
    const widget = widgets.find(w => w.id === id);
    this.props.actions
      .deleteWidget(widget)
      .then(() => {
        this.checkResult();
      })
      .catch(() => {});
  }

  checkResult() {
    const { error } = this.props;
    if (!error) this.props.history.push('/widgets');
  }

  render() {
    const { message, isFetching, error } = this.props;
    return (
      <Modal open closeOnEscape closeOnRootNodeClick={false} onClose={this.onClose}>
        <Modal.Header>{this.props.headerText}</Modal.Header>
        <Modal.Content>
          {error && (
            <Message negative>
              <Message.Header>{message}</Message.Header>
            </Message>
          )}
          <p>{this.props.contentText}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button default onClick={this.onClose}>
            No
          </Button>
          <Button
            negative
            labelPosition="right"
            icon="x"
            content="yes"
            onClick={this.onDelete}
            loading={isFetching}
          />
        </Modal.Actions>
      </Modal>
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
    widgets: state.widget.widgets,
    message: state.widget.message,
    error: state.widget.error,
  };
}
PopUp.defaultProps = defaultProps;
PopUp.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
