var UserSelect = React.createClass({

  getInitialState: function () {
    return { data: {} };
  },

  onGetSuccess: function(data) {
    this.setState( {data: data} );
  },


  onGetError: function(data, errors) {
    PubSub.publish("alert-error",  'Error: User list could not be loaded. ');
  },

  componentDidMount: function() {
    window.appContext.apiRequest(
      '/users.json',
      'GET',
      {},
      this.onGetSuccess,
      this.onGetError
    );
  },

  onChange: function() {
     this.props.onChange(this.refs.email.value);
  },

  renderUserOption: function(user) {
    return (
      <option value={user.id} key={user.id} >
          {user.email}
      </option>
    );
  },

  render: function() {
    return(
      <div className="row">
        <div className="col-md-5">
          <div className="form-group">
            <label className="control-label" htmlFor="email"> User </label>
            <select id="email" value={this.props.selected} className="form-control" ref="email" onChange={this.onChange}>
              <option value="">ALL</option>
              {_.map(this.state.data, this.renderUserOption)}
            </select>
          </div>
        </div>
      </div>
    );
  }

});
