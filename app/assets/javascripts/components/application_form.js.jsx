var ApplicationForm = React.createClass({
  mixins: [ ReactRouter.Navigation ],
  getInitialState: function() {
    return { name: ''};
  },
  handleSubmit: function (e) {
    e.preventDefault();
    url = '/api/v1/applications';
    if (this.props.applicationId) url += ('/' + this.props.applicationId);
    method = this.props.applicationId ? 'put' : 'post';
    $.ajax(url, {
      dataType: 'json',
      type: method,
      data: { application: { name: this.state.name } },
      success: function(data) {
        this.transitionTo('/');
      }.bind(this)
    });
  },
  handleChange: function(evt) {
    this.setState({
      name: evt.target.value
    });
  },
  render: function() {
      return (
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="control-label">Title</label>
                <input className="form-control" name="application[name]" id="application_name"  onChange={this.handleChange} value={this.state.name} />
              </div>
              <input type="submit" className="btn btn-primary"/>
            </form>
          </div>
        </div>
      );
    }
});
