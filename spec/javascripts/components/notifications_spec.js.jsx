//= require browserify

describe('Notifications', function() {
  it('can render without error', function() {

    var element = (
      <Notifications />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

  });
});
