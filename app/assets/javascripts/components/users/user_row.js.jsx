var UserRow = React.createClass({

  delete: function(event) {
    event.preventDefault();
    this.props.onDelete(this.props.data.id);
  },

  renderEmail: function() {
    if (window.appContext.isAdmin()) {
      return (
        <td><Link to={{ pathname: '/time_entries', query: { user_id: this.props.data.id } }}>
          {this.props.data.email}
        </Link></td>
      );
    }
    return (
      <td> {this.props.data.email} </td>
    );
  },

  render: function() {
    return(
      <tr className="list-row">
        <td>
          <Link to={'/users/' + this.props.data.id + '/edit'}>{this.props.data.id}</Link>
        </td>
        {this.renderEmail()}
        <td> {_.capitalize(this.props.data.role)} </td>
        <td>
          <a href="" onClick={this.delete}>
          <span className="glyphicon glyphicon-remove hover"
            aria-hidden="true"></span></a>

          <Link to={'/users/' + this.props.data.id + '/edit'}><span
            className="glyphicon glyphicon-pencil hover"
            aria-hidden="true"></span></Link>

          {window.appContext.isAdmin() &&
            <Link to={{ pathname: '/time_entries/new', query: { email: this.props.data.email } }}><span
              className="glyphicon glyphicon-plus hover"
              aria-hidden="true"></span></Link>
          }
        </td>
      </tr>
    );
  }

});
