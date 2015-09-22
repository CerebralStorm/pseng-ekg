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
      width: this.props.progress + '%'
    }
    return (
      <div>
        <div>{this.props.name}</div>
        <div>Status: {this.props.status}</div>
        <div>Progress: {this.props.progress}</div>
        <div className="progress">
          <div className={this.progressBarClass(this.props.status)} role="progressbar" aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100" style={progressStyle}>
            <span className="sr-only">60% Complete</span>
          </div>
        </div>
      </div>
    );
  }
});
