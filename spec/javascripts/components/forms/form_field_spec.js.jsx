//= require browserify

describe('FormField', function() {
  it('can render without error', function() {

    var element = (
      <FormField  />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

    var renderedNode = ReactDOM.findDOMNode(component);

  });
});
