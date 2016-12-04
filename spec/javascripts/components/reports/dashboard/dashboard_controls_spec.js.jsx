//= require browserify

describe('DashboardControls', function() {
  it('can render without error', function() {

    var element = (
      <DashboardControls />
    );

    var component;
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();

  });
});
