var UserFilter = React.createClass({

  render: function() {
    return (
      <div className="users-filter">
        <Link className="add-btn-float btn btn-default" to={'/' + this.props.path + '/new'}>Add</Link>
      </div>
    );
  }

});
