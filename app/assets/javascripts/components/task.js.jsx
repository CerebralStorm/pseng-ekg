var Task = React.createClass({
  progressBarClass: function (status) {
    if(status == 'Completed') {
      return 'progress-bar progress-bar-success';
    } else if (status == 'Failed') {
      return 'progress-bar progress-bar-danger';
    } else {
      return 'progress-bar';
    }
  },
  render: function() {
    var progressStyle = {
      width: this.props.task.progress + '%'
    }
    return (
      <div>
        <hr />
        <div className='row'>
          <div className='col-md-2 vcenter'>
            <ReactRouter.Link to={'/tasks/' + this.props.task.id}>
              <a href='#' className="btn btn-default">View Details</a>
            </ReactRouter.Link>
          </div>
          <div className='col-md-3 vcenter'>
            <div><span className="text-nowrap">{this.props.task.name}</span></div>
            <div>Created: {moment(this.props.task.created_at).fromNow()}</div>
            <div>Status: {this.props.task.status}</div>
            <div className='text-warning'>Errors: {this.props.task.errors_count}</div>
          </div>
          <div className='col-md-7 vcenter'>
            <div className="progress">
              <div className={this.progressBarClass(this.props.task.status)} role="progressbar" aria-valuenow={this.props.task.progress} aria-valuemin="0" aria-valuemax="100" style={progressStyle}>
                {this.props.task.progress}% Complete
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
});
