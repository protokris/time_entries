//= require browserify

describe('App', function() {

  it('can render without error', function() {

    var location = { pathname:'/', query: {} };
    var element = (
      <App location={location}>
      </App>
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

  });
});
