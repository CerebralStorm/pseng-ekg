var ApplicationPanel = React.createClass({
  getInitialState: function() {
    return {
      view: 'Running'
    };
  },
  tasksByStatus: function (status) {
    var result = [];
    this.props.tasks.forEach(function (task) {
      if (task.status == status) {
        result.push(task);
      }
    })
    return result;
  },
  statusButtonClass: function(buttonClass, buttonStyle) {
    var baseButtonClass = 'btn btn-sm ' + buttonStyle;
    if(this.state.view == buttonClass){
      return baseButtonClass + ' active';
    } else {
      return baseButtonClass;
    }
  },
  handleStatusButtonClick: function(e) {
    e.preventDefault();
    this.setState({view: e.target.innerHTML});
  },
  render: function() {
      var currentTaskNodes = this.tasksByStatus(this.state.view).map(function (task, index) {
      return (
        <Task key={task.id} name={task.name} status={task.status} progress={task.progress} />
      )
    });
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title pull-left">{this.props.name}</h3>
            <div className="btn-group pull-right" role="group" aria-label="...">
              <button type="button" onClick={this.handleStatusButtonClick} className={this.statusButtonClass('Running', 'btn-default')}>Running</button>
              <button type="button" onClick={this.handleStatusButtonClick} className={this.statusButtonClass('Completed', 'btn-success')}>Completed</button>
              <button type="button" onClick={this.handleStatusButtonClick} className={this.statusButtonClass('Failed', 'btn-danger')}>Failed</button>
            </div>
            <div className='clearfix'></div>
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
