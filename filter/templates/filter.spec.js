'use strict';

describe('<%= camelName %> filter', function () {

	beforeEach(module('<%= _.camelize(appname) %>'));

	// initialize filter on each test
	var <%= camelName %>;
	beforeEach(inject(function ($filter) {
		<%= camelName %> = $filter('<%= camelName %>');
	}));

	it('should return the same', function () {
		var text = 'Here is a simple test';
		expect(<%= camelName %>(text)).toBe(text);
	});

});