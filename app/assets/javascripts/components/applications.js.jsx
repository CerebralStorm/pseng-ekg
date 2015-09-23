var Applications = React.createClass({
  getInitialState: function() {
    return {
      view: 'today',
      applications: []
    };
  },
  componentDidMount: function() {
    this.getApplications();
  },
  getApplications: function() {
    $.getJSON("/api/v1/applications?include[]=tasks&view=" + this.state.view, function(data) {
      applications = $.map(data, function(obj) {
        return obj;
      });
      this.setState({ applications: applications });
    }.bind(this));
  },
  handleFilterButtonClick: function(filter) {
    this.setState({view: filter});
    this.getApplications();
  },
  filterButtonClass: function(buttonClass, buttonStyle) {
    var baseButtonClass = 'btn btn-sm ' + buttonStyle;
    if(this.state.view == buttonClass){
      return baseButtonClass + ' active';
    } else {
      return baseButtonClass;
    }
  },
  render: function() {
    var applicationNodes = this.state.applications.map(function (application, index) {
      return (
        <ApplicationPanel key={application.id} name={application.name} tasks={application.tasks} />
      )
    }.bind(this));
    return (
      <div>
        <div className="btn-group" role="group" aria-label="...">
          <button type="button" onClick={this.handleFilterButtonClick.bind(this, 'today')} className={this.filterButtonClass('daily', 'btn-primary')}>Today</button>
          <button type="button" onClick={this.handleFilterButtonClick.bind(this, 'this_week')} className={this.filterButtonClass('weekly', 'btn-warning')}>This Week</button>
          <button type="button" onClick={this.handleFilterButtonClick.bind(this, 'this_month')} className={this.filterButtonClass('monthly', 'btn-danger')}>This Month</button>
        </div>
        <p className='lead text-center'>Filtering by {this.state.view.titleize()}</p>
        <hr />
        {applicationNodes}
      </div>
    );
  }
});
