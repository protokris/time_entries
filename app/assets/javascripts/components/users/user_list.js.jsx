var UserList = React.createClass({

  render: function() {
    return (
      <ListView
        title='Users'
        path='users'
        columns={['ID', 'Email', 'Role', '']}
        controlsClass={UserFilter}
        rowClass={UserRow}
      />
    );
  }
});
