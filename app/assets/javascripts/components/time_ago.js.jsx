var TimeAgo = React.createClass({
  getInitialState: function() {
    return {
      interval: setInterval(this.setTimeAgo, 5000),
      timeAgo: moment(this.props.createdAt).fromNow()
    };
  },
  setTimeAgo: function() {
    this.setState({timeAgo: moment(this.props.createdAt).fromNow()})
  },
  componentWillUnmount: function() {
    clearInterval(this.state.interval);
  },
  render: function() {
    return (
      <span>{this.state.timeAgo}</span>
    );
  }
});
