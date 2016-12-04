//= require browserify

describe('UserSelect', function() {
  it('can render without error', function() {

    var element = (
      <UserSelect  />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

    var renderedNode = ReactDOM.findDOMNode(component);

    var renderedTestNode = renderedNode.querySelectorAll("select");
    expect(renderedTestNode.length).toEqual(1);
  });
});
