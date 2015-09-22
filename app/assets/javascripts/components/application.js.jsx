var Application = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function() {
    return {
      application: {},
      tasks: []
    };
  },
  componentDidMount: function() {
    $.getJSON('/api/v1/applications/' + this.props.params.applicationId + '?include[]=tasks', function(data) {
      this.setState({
        application: data.application,
        tasks: data.tasks
      });
    }.bind(this));
  },
  render: function() {
    var taskNodes = this.state.tasks.map(function (task, index) {
      return (
        <ReactRouter.Link key={task.id} to={'/applications/' + this.props.params.applicationId + '/tasks/' + task.id}>
          <li className= 'list-group-item'>
            {task.created_at}
          </li>
        </ReactRouter.Link>
      )
    }.bind(this));
    return (
      <div>
        <BackButton url={'/'} />
        <h3> {this.state.application.name} </h3>
        <hr />
        <ul className='list-group-item'>
          {taskNodes}
        </ul>
      </div>
    );
  }
});
