var TaskDetail = React.createClass({
  getInitialState: function() {
    return {
      task: {},
      errors: []
    };
  },
  componentDidMount: function() {
    this.getTask();
  },
  getTask: function() {
    $.getJSON("/api/v1/tasks/" + this.props.params.taskId, function(data) {
      this.setState({task: data});
      this.getTaskErrors();
    }.bind(this));
  },
  getTaskErrors: function () {
    $.getJSON("/api/v1/tasks/" + this.props.params.taskId + '/errors', function(data) {
      errors = $.map(data, function(obj) {
        return obj;
      });
      this.setState({ errors: errors });
    }.bind(this));
  },
  progressBarClass: function (status) {
    if(status == 'Completed') {
      return 'progress-bar progress-bar-success';
    } else if (status == 'Failed') {
      return 'progress-bar progress-bar-danger';
    } else {
      return 'progress-bar';
    }
  },
  formatDuration: function () {
    if (this.state.task.duration) {
      var hours = parseInt( this.state.task.duration / 3600 ) % 24;
      var minutes = parseInt( this.state.task.duration / 60 ) % 60;
      var seconds = this.state.task.duration % 60;
      return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
    } else {
      return '';
    }
  },
  render: function() {
    var errorNodes = this.state.errors.map(function (error, index) {
      return (
        <ReactRouter.Link key={error.id} className="list-group-item" to={'/errors/' + error.id}>
          {error.message}
        </ReactRouter.Link>
      )
    }.bind(this));
    return (
      <div>
        <BackButton url={'/'} />
        <hr />
        <div>{this.state.task.name}</div>
        <div>Status: {this.state.task.status}</div>
        <div className='text-warning'>Errors: {this.state.task.errors_count}</div>
        <div className='text-info'>Duration: {this.formatDuration()}</div>
        <hr />
        <div className='list-group'>
          {errorNodes}
        </div>
      </div>
    );
  }
});
