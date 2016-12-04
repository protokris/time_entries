var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    History = ReactRouter.browserHistory,
    Link = ReactRouter.Link;

var Routes = React.createClass({

  render: function() {
    return (
      <Router history={History}>
        <Route path="/" component={App}>
          <IndexRoute component={Index}/>

          <Route path="register" component={Register} />
          <Route path="login" component={Login} />

          <Route path="time_entries" component={TimeEntryList}/>
          <Route path="time_entries/new" component={TimeEntryNew}/>
          <Route path="time_entries/:id/edit" component={TimeEntryEdit}/>

          <Route path="reports/dashboard" component={Dashboard}/>
          <Route path="reports/weekly_summary" component={WeeklySummary}/>

          <Route path="users" component={UserList}/>
          <Route path="users/:id/edit" component={UserEdit}/>
          <Route path="users/new"  component={Register} />

          <Route path="documentation" component={Documentation} />

        </Route>
        <Route path="/teaspoon/default"></Route>
      </Router>
    );
  }
});
