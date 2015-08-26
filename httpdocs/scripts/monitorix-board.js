(function() {

	createTabs = function(container, tabs) {
		var periods = $(container);
		var templateTab = $('li', periods);

		$.each(tabs, function(slug, item) {
			var tab = templateTab.clone();
			$('i', tab).attr('class', 'glyphicon glyphicon-' + item.icon);
			$('span', tab).html(item.name);
			$('a', tab).attr('href', slug);
			tab.appendTo(periods);
		});

		templateTab.remove();
	}

	document.title = CONFIG.site.title;

	$('h1').html(CONFIG.site.title);

	createTabs('ul#periods.nav', CONFIG.periods);
	createTabs('ul#charts.nav', CONFIG.charts);

	$('ul#charts.nav li:first, ul#periods.nav li:first').addClass('active');

	$('ul.nav-tabs a').on('shown.bs.tab', function(e) {
		var slug = $('ul#charts.nav li.active a').attr('href') + '.1' + $('ul#periods.nav li.active a').attr('href');
		$('div.chart img#chart').removeAttr('alt').attr('src', 'images/charts/' + slug + '.png');
	}).triggerHandler('shown.bs.tab');

}());
