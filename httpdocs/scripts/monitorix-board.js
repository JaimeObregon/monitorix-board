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

	var firstChart = Object.keys(CONFIG.charts)[0];
	var firstPeriod = Object.keys(CONFIG.periods)[0];
	var name = CONFIG.charts[Object.keys(CONFIG.charts)[0]].name;
	var chart = $('div.chart img#chart');
	chart.attr('src', 'images/charts/' + firstChart + '.1' + firstPeriod + '.png').attr('alt', name);

	$('ul.nav-tabs a').on('shown.bs.tab', function(e) {
		var slug = $('ul#charts.nav li.active a').attr('href') + '.1' + $('ul#periods.nav li.active a').attr('href');
	    var chart = $('div.chart img#chart');
		chart.removeAttr('alt').attr('src', 'images/charts/' + slug + '.png');
	});

}());
