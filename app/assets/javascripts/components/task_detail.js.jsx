var TaskDetail = React.createClass({
  mixins: [SortByCreatedAtMixin],
  getInitialState: function() {
    return {
      task: {},
      errors: [],
      logs: []
    };
  },
  componentDidMount: function() {
    this.getTask();
    var channel = Window.pusher.subscribe('task_channel');
    channel.bind('update', function(data) {
      if(this.state.task.id == data.id){
        this.setState({task: data});
      }
    }.bind(this));

    var channel = Window.pusher.subscribe('log_channel');
    channel.bind('create', function(data) {
      if(this.state.task.id == data.task_id){
        var logs = this.state.logs;
        logs.push(data);
        this.sortByCreatedAt(logs);
        this.setState({logs: logs});
      }
    }.bind(this));

    var channel = Window.pusher.subscribe('error_channel');
    channel.bind('create', function(data) {
      if(this.state.task.id == data.task_id){
        var errors = this.state.errors;
        errors.push(data);
        this.sortByCreatedAt(errors);
        this.setState({errors: errors});
      }
    }.bind(this));
  },
  getTask: function() {
    $.getJSON("/api/v1/tasks/" + this.props.params.taskId, function(data) {
      this.setState({task: data});
      this.getTaskLogs();
      this.getTaskErrors();
    }.bind(this));
  },
  getTaskErrors: function () {
    $.getJSON("/api/v1/tasks/" + this.props.params.taskId + '/errors', function(data) {
      errors = $.map(data, function(obj) {
        return obj;
      });
      this.sortByCreatedAt(errors);
      this.setState({ errors: errors });
    }.bind(this));
  },
  getTaskLogs: function () {
    $.getJSON("/api/v1/tasks/" + this.props.params.taskId + '/logs', function(data) {
      logs = $.map(data, function(obj) {
        return obj;
      });
      this.sortByCreatedAt(logs);
      this.setState({ logs: logs });
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
          <label className='label label-warning'>{moment(error.created_at).fromNow()}</label> {error.message}
        </ReactRouter.Link>
      )
    }.bind(this));
    var logNodes = this.state.logs.map(function (item) {
      return (
        <li key={item.id}><label className='label label-default'><TimeAgo createdAt={item.created_at} /></label> {item.value}</li>
      )
    });
    return (
      <div>
        <BackButton url={'/'} />
        <hr />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{this.state.task.name}</h3>
          </div>
          <div className="panel-body">
            <div className='well well-lg'>
              <div>Status: {this.state.task.status}</div>
              <div className='text-warning'>Errors: {this.state.task.errors_count}</div>
              <div className='text-info'>Duration: {this.formatDuration()}</div>


              <h5 className='text-center'>Logs</h5>
              <hr />
              <ul>
                {logNodes}
              </ul>

              <br />

              <h5 className='text-center text-warning'>Errors</h5>
              <hr />
              <div className='list-group'>
                {errorNodes}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
