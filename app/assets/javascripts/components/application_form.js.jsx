var ApplicationForm = React.createClass({
  mixins: [ ReactRouter.Navigation ],
  getInitialState: function() {
    return {
      name: '',
      url: ''
    };
  },
  handleSubmit: function (e) {
    e.preventDefault();
    url = '/api/v1/applications';
    if (this.props.applicationId) url += ('/' + this.props.applicationId);
    method = this.props.applicationId ? 'put' : 'post';
    $.ajax(url, {
      dataType: 'json',
      type: method,
      data: { application: { name: this.state.name, url: this.state.url } },
      success: function(data) {
        this.transitionTo('/');
      }.bind(this)
    });
  },
  handleChange: function(evt) {
    var result = {};
    var field = evt.target.id.replace('application_', '');
    result[field] = evt.target.value
    this.setState(result);
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
              <div className='form-group'>
                <label className="control-label">Application URL</label>
                <input className="form-control" name="application[url]" id="application_url"  onChange={this.handleChange} value={this.state.url} />
              </div>
              <input type="submit" className="btn btn-primary"/>
            </form>
          </div>
        </div>
      );
    }
});
