//= require browserify

describe('UserFilter', function() {
  it('can render without error', function() {

    var element = (
      <UserFilter />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
      var renderedNode = ReactDOM.findDOMNode(component);
    }).not.toThrow();

  });
});
