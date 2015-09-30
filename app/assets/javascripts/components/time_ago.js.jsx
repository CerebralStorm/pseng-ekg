var TimeAgo = React.createClass({
  getInitialState: function() {
    return {
      timeAgo: moment(this.props.createdAt).fromNow()
    };
  },
  componentDidMount: function() {
    this.setInterval(this.getTimeAgo, 1000); // Call a method on the mixin
  },
  getTimeAgo: function() {
    this.setState({timeAgo: moment(this.props.createdAt).fromNow()})
  },
  render: function() {
    return (
      <div>
        {this.state.timeAgo}
      </div>
    );
  }
});
