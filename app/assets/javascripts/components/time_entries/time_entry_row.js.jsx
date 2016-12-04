var TimeEntryRow = React.createClass({

  delete: function(event) {
    event.preventDefault();
    this.props.onDelete(this.props.data.id);
  },

  renderEmail: function() {
    if (window.appContext.isAdmin()) {
      return (
        <td><Link to={'/users/'+this.props.data.owner_id+'/edit'}>{this.props.data.owner_email}</Link></td>
      );
    }
    return (
      <td>{this.props.data.owner_email}</td>
    );
  },

  render: function() {
    return(
      <tr className="list-row">
        <td>
          <Link to={'/time_entries/' + this.props.data.id + '/edit'}>{this.props.data.id}</Link>
        </td>
        <td> {this.props.data.date} </td>
        <td>{this.props.data.time} sec</td>
        <td>{this.props.data.distance} m</td>
        <td>{this.props.data.avg_speed} m/sec</td>
        {this.renderEmail()}
        <td>
          <a href="" onClick={this.delete}>
          <span
            className="glyphicon glyphicon-remove hover"
            aria-hidden="true"></span></a>

          <Link to={'/time_entries/' + this.props.data.id + '/edit'}><span
            className="glyphicon glyphicon-pencil hover"
            aria-hidden="true"></span></Link>
        </td>
      </tr>
    );
  }

});
