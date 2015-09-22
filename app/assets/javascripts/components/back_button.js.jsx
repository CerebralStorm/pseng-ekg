var BackButton = React.createClass({
  mixins: [ReactRouter.Navigation],
  render: function() {
    return (
      <ReactRouter.Link to={this.props.url}>
        <a href='#' className='btn btn-default'>Back</a>
      </ReactRouter.Link>
    );
  }
});
