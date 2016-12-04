var ListView = React.createClass({

  getInitialState: function() {
    var filterParams = window.appContext.query || {};
    _.merge(filterParams, this.props.filterParams);
    return { data: [], filterParams: filterParams, page: 1 };
  },

  componentDidMount: function() {
    this.getData();
  },

  getData: function() {
    var url = this.buildUrl();
    window.appContext.apiRequest(
      url,
      'GET',
      null,
      this.onGetSuccess,
      this.onGetError
    );
  },

  buildUrl: function() {
    var url = '/' + this.props.path + '.json?';
    url += 'page=' + this.state.page + '&';
    _.forOwn(this.state.filterParams, function(v,k) {
      url += k + '=' + v + '&';
    });
    return url;
  },

  onGetSuccess: function(data) {
    this.setState({data: data});
  },

  onGetError: function(data, errors) {
    PubSub.publish("alert-error",  'List could not be loaded. ');
  },

  onDeleteError: function(data, errors) {
    this.getData();
    PubSub.publish("alert-error", "Could not delete row.");
  },

  onDeleteSuccess: function(id, data) {
    this.getData();
    PubSub.publish("alert-success", "Deleted row.");
  },

  onDeleteItem: function(id) {
    if (window.confirm('Are you sure you want to delete this row?')) {
      window.appContext.apiRequest(
        '/' + this.props.path + '/' + id + '.json',
        'DELETE',
        null,
        _.bind(this.onDeleteSuccess, this, id),
        this.onDeleteError
      );
    }
  },

  onFilterChanged: function(filterParams) {
    this.setState({filterParams: filterParams}, this.getData);
  },

  onNextPage: function() {
    this.setState({page: this.state.page+1}, this.getData);

  },

  onPrevPage: function() {
    this.setState({page: this.state.page-1}, this.getData);
  },

  renderControls: function() {
    if (this.props.controlsClass) {
      return React.createElement(this.props.controlsClass, {
          onFilterChanged: this.onFilterChanged,
          path: this.props.path
      });
    }
  },

  renderHeader: function(cols) {
    return(
      <thead>
        {this.renderPaging()}
        <tr>
          {_.map(cols, function(col) {
            return(<td key={cols.indexOf(col)}>{col}</td>);
          })}
        </tr>
      </thead>
    );
  },

  renderPaging: function() {
    return(
      <tr><td colSpan={this.props.columns.length}>
        {this.state.page > 1 &&
          <button className="btn-go-left btn btn-default" type="button" onClick={this.onPrevPage}>
            Prev Page
          </button>
        }
        {this.state.data.length === 25 &&
          <button className="btn-go-right btn btn-default" type="button" onClick={this.onNextPage}>
            Next Page
          </button>
        }
      </td></tr>
    );
  },

  renderRow: function(row) {
    return React.createElement(this.props.rowClass, {
        key: row.id,
        data: row,
        onDelete: this.onDeleteItem
      });
  },

  render: function() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        { this.renderControls() }
        <table className="table time-table">
          { this.renderHeader(this.props.columns) }
          <tbody>
            { _.map(this.state.data, this.renderRow) }
            {this.renderPaging()}
          </tbody>
        </table>
      </div>
    );
  }

});
