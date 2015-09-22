var routes = (
  <ReactRouter.Route path='/' handler={App}>
    <ReactRouter.DefaultRoute handler={Applications}/>
    <ReactRouter.Route path='/applications/new' handler={ApplicationForm}/>
    <ReactRouter.Route path='/applications/:applicationId' handler={Application}/>
    <ReactRouter.Route path='/applications/:applicationId/tasks/:taskId' handler={Task}/>
  </ReactRouter.Route>
);

$(document).ready(function() {
  ReactRouter.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('container'));
  });
});
