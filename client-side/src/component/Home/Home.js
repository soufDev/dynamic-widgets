import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Loader, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import MyCard from '../charts/Card';
import SimplePiChart from '../charts/PieChartWithCustomizedLabel';
import StraightAnglePieChart from '../charts/StraightAnglePieChart';
import SimpleAreaChart from '../charts/SimpleAreaChart';
import StackedBarChart from '../charts/StackedBarChart';
import Count from '../charts/Count';
import * as widgetActions from '../../actions/widget';

const defaultProps = {
  message: null,
  error: null,
};

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  widgets: PropTypes.shape({ content: PropTypes.func }).isRequired,
  message: PropTypes.string,
  error: PropTypes.bool,
  actions: PropTypes.shape({ fetchAllActivated: PropTypes.func }).isRequired,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.fetchAllActivated();
  }

  printTheWidget() {
    const { widgets } = this.props;
    const filteredWidgets = widgets.map((w) => {
      let components = [];
      if (w.type === 'Count') {
        components.push(<Count value={100000} label={w.name.toUpperCase()} />);
      } else if (w.type === 'Card') {
        const item = {
          id: 1,
          header: 'Project Report - April',
          description:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
          meta: 'ROI: 30%',
        };
        components.push(
          <MyCard
            key={item.id}
            header={item.header}
            description={item.description}
            meta={item.meta}
          />,
        );
      } else if (w.type === 'PieChartWithCustomizdLabel') {
        components.push(<SimplePiChart />);
      } else if (w.type === 'SimpleAreaChart') {
        components.push(<SimpleAreaChart />);
      } else if (w.type === 'StackedBarChart') {
        components.push(<StackedBarChart />);
      } else if (w.type === 'StraightAnglePieChart') {
        components.push(<StraightAnglePieChart />);
      } else {
        components = [];
      }
      return components;
    });

    return filteredWidgets;
  }
  render() {
    const { message, isFetching } = this.props;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <h1 textAlign="center">Hello in PropTotiping</h1>
          </Grid.Row>
          <Grid.Row>{message && <Message error>{message}</Message>}</Grid.Row>
          <Grid.Row>
            <Loader active={isFetching} inline />
            <Card.Group>{this.printTheWidget().map(w => w)}</Card.Group>
          </Grid.Row>
        </Grid>
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
    widgets: state.widget.widgets,
  };
}
Home.defaultProps = defaultProps;
Home.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
