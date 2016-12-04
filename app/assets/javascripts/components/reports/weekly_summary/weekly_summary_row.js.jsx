var WeeklySummaryRow = React.createClass({

  render: function() {
    return(
      <tr>
        <td> {this.props.data.date} </td>
        <td>{this.props.data.time} sec</td>
        <td>{this.props.data.distance} m</td>
        <td>{this.props.data.avg_speed} m/sec</td>
      </tr>
    );
  }

});
