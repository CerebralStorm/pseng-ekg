var ErrorDetail = React.createClass({
  getInitialState: function() {
    return {
      error: {}
    };
  },
  componentDidMount: function() {
    this.getError();
  },
  getError: function() {
    $.getJSON("/api/v1/errors/" + this.props.params.errorId, function(data) {
      this.setState({error: data});
    }.bind(this));
  },
  backtraceArray: function() {
    if(this.state.error.backtrace){
      return this.state.error.backtrace.split(',')
    } else {
      return []
    }
  },
  render: function() {
    var backtraceNodes = this.backtraceArray().map(function (item) {
      return (
        <li>{item}</li>
      )
    });
    return (
      <div>
        <BackButton url={'/tasks/' + this.state.error.task_id} />
        <hr />
        <div>{this.state.error.message}</div>
        <hr />
        <ul>{backtraceNodes}</ul>
      </div>
    );
  }
});
