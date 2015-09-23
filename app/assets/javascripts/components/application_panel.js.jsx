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
  handleStatusButtonClick: function(view) {
    this.setState({view: view});
  },
  render: function() {
    var currentTaskNodes = this.tasksByStatus(this.state.view).map(function (task, index) {
      return (
        <Task key={task.id} task={task}/>
      )
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title pull-left">{this.props.name}</h3>
          <div className="btn-group pull-right" role="group" aria-label="...">
            <button type="button" onClick={this.handleStatusButtonClick.bind(this, 'Running')} className={this.statusButtonClass('Running', 'btn-default')}>Running: {this.tasksByStatus('Running').length}</button>
            <button type="button" onClick={this.handleStatusButtonClick.bind(this, 'Completed')} className={this.statusButtonClass('Completed', 'btn-success')}>Completed: {this.tasksByStatus('Completed').length}</button>
            <button type="button" onClick={this.handleStatusButtonClick.bind(this, 'Failed')} className={this.statusButtonClass('Failed', 'btn-danger')}>Failed: {this.tasksByStatus('Failed').length}</button>
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
