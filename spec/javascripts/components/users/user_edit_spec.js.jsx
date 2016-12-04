//= require browserify

describe('UserEdit', function() {
  it('can render without error', function() {

    var params = {};
    var element = (
      <UserEdit params={params}/>
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

    var renderedNode = ReactDOM.findDOMNode(component);

    var renderedTestNode = renderedNode.querySelectorAll("h1");
    expect(renderedTestNode.length).toEqual(1);
    expect(renderedTestNode[0].textContent).toEqual("User");

  });
});
