var ApplicationPanel = React.createClass({
  getInitialState: function() {
    return {
      tasks: []
    };
  },
  componentDidMount: function() {
    this.getTasks();
    var channel = Window.pusher.subscribe('task_channel');
    channel.bind('update', function(data) {
      var tasks = [];
      this.state.tasks.forEach(function (task) {
        if (task.id == data.id) {
          tasks.push(data);
        } else {
          tasks.push(task);
        }
      });
      this.setState({tasks: tasks});
    }.bind(this));

    channel.bind('create', function(data) {
      var tasks = this.state.tasks;
      tasks.push(data);
      this.setState({tasks: tasks});
    }.bind(this));

    channel.bind('delete', function(data) {
      var tasks = [];
      this.state.tasks.forEach(function (task) {
        if (task.id != data.id) {
          tasks.push(task);
        }
      });
      this.setState({tasks: tasks});
    }.bind(this));
  },
  componentWillReceiveProps: function() {
    this.getTasks();
  },
  getTasks: function() {
    $.getJSON('/api/v1/applications/' + this.props.applicationId + '/tasks?view=' + this.props.view, function(data) {
      tasks = $.map(data, function(obj) {
        return obj;
      });
      this.setState({ tasks: tasks });
    }.bind(this));
  },
  handleStatusButtonClick: function(view) {
    this.setState({view: view});
  },
  render: function() {
    var currentTaskNodes = this.state.tasks.map(function (task, index) {
      return (
        <Task key={task.id} task={task}/>
      )
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.name}</h3>
        </div>
        <div className="panel-body">
          <div className='well well-sm'>
            {currentTaskNodes}
          </div>
        </div>
      </div>
    );
  }
});
