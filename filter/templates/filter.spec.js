'use strict';

describe('<%= camelName %> filter', function () {

  beforeEach(module('<%= appname %>'));

  var <%= camelName %>;

  beforeEach(inject(function ($filter) {
    <%= camelName %> = $filter('<%= camelName %>');
  }));

  it('should ...', function () {
    var text = 'bangular is awesome';
    expect(<%= camelName %>(text)).toBe(text);
  });

});
