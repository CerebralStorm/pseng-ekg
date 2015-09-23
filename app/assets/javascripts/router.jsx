var routes = (
  <ReactRouter.Route path='/' handler={App}>
    <ReactRouter.DefaultRoute handler={Applications}/>
    <ReactRouter.Route path='/applications/new' handler={ApplicationForm}/>
    <ReactRouter.Route path='/tasks/:taskId' handler={TaskDetail}/>
    <ReactRouter.Route path='/errors/:errorId' handler={ErrorDetail}/>
  </ReactRouter.Route>
);

$(document).ready(function() {
  ReactRouter.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('container'));
  });
});
