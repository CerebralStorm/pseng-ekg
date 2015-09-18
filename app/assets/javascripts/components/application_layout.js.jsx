var ApplicationLayout = React.createClass({
  getInitialState: function() {
    return {
      tasks: [],
      application: {}
    };
  },
  loadTasks: function(application) {
    this.setState({application: application});
    var url = '/tasks.json?application_id=' + application.id
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({tasks: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var _this = this;
    var applicationNodes = this.props.data.map(function (application, index) {
      var liClass = 'react-li';
      if (_this.state.application.id == application.id) {
        liClass = liClass + '-active';
      }

      return (
        <Application onApplicationClick={_this.loadTasks} name={application.name} id={application.id} key={application.id} liClass={liClass}/>
      )
    });

    var taskNodes = this.state.tasks.map(function (task, index) {
      return (
        <div key={task.id}>
          <Task status={task.status} progress={task.progress} />
        </div>
      )
    });

    return (
      <div className="row">
        <div className="col-md-3">
          <ul className="nav nav-pills nav-stacked">
            {applicationNodes}
          </ul>
        </div>
        <div className="col-md-9">
          <h3>{this.state.application.name ? this.state.application.name : '<- Please select an application.'}</h3>
          {taskNodes}
        </div>
      </div>
    );
  }
});
