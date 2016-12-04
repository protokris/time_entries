//= require browserify

describe('Register', function() {
  it('can render without error', function() {

    var params = {};
    var element = (
      <Register params={params} />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

    var renderedNode = ReactDOM.findDOMNode(component);

    var renderedTestNode = renderedNode.querySelectorAll("h1");
    expect(renderedTestNode[0].textContent).toEqual("Register User");
  });
});
