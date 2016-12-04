var FormField = React.createClass({

  formGroupClass: function (field) {
    var className = "form-group ";
    if(field) {
      className += " has-error";
    }
    return className;
  },

  render: function() {
    return (
      <div className={this.formGroupClass(this.props.error)}>
        {this.props.children}
        <span className="help-block">{this.props.error}</span>
      </div>
    );
  }

});
