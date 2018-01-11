import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Grid, Message, Loader, Table, Button, Icon } from 'semantic-ui-react';
import * as widgetActions from '../../actions/widget';

const defaultProps = {
  message: null,
};

const propTypes = {
  actions: PropTypes.shape({
    fetchAll: PropTypes.func.isRequired,
    updateWidget: PropTypes.func.isRequired,
  }).isRequired,
  widgets: PropTypes.shape({ content: PropTypes.array }).isRequired,
  message: PropTypes.string,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.fetchAll();
  }

  handleActivate(widgetEntity, activated) {
    const widget = { ...widgetEntity };
    widget.activated = activated;
    this.props.actions
      .updateWidget(widget)
      .then(() => {})
      .catch(() => {});
  }

  renderTableData() {
    const { widgets } = this.props;
    return widgets.map((w, i) => (
      <Table.Row key={i}>
        <Table.Cell>{i + 1}</Table.Cell>
        <Table.Cell>{w.name}</Table.Cell>
        <Table.Cell>{w.type}</Table.Cell>
        <Table.Cell>
          <Button
            floated={'left'}
            onClick={() => this.props.history.push(`widget/delete/${w._id}`)}
          >
            <Icon name={'delete'} />
            Delete
          </Button>
          <Button
            onClick={() => this.handleActivate(w, !w.activated)}
            color={w.activated ? 'green' : 'red'}
            floated={'left'}
          >
            <Icon name={'delete'} />
            {w.activated ? 'Enable' : 'Disable'}
          </Button>
        </Table.Cell>
      </Table.Row>
    ));
  }

  renderTable() {
    const { message, isFetching } = this.props;
    return (
      <Grid centered>
        <Grid.Row>{message && <Message error>{message}</Message>}</Grid.Row>
        <Grid.Row>
          <Loader active={isFetching} inline />
          <Table sortable celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.renderTableData()}</Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan={3}>
                  <Button
                    floated={'right'}
                    icon
                    labelPosition={'left'}
                    primary
                    size={'small'}
                    onClick={() => this.props.history.push('/widget/new')}
                  >
                    <Icon name={'add'} />
                    New
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        <h1>Widgets</h1>
        {this.renderTable()}
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
    widgets: state.widget.widgets,
    message: state.widget.message,
    error: state.widget.error,
  };
}

Widget.defaultProps = defaultProps;
Widget.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Widget);
