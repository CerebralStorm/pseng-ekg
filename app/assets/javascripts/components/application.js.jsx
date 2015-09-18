var Application = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },
  handleClick: function(e) {
    e.preventDefault();
    this.props.onApplicationClick({id: this.props.id, name: this.props.name});
  },
  render: function() {
    return (
      <div onClick={this.handleClick}>
        {this.props.name}
      </div>
    );
  }
});
