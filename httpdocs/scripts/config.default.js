CONFIG = {
	site: {
		title: 'Server status',
	},
	periods: {
		  day : { name: 'Last day' },
		 week : { name: 'Last week' },
		month : { name: 'Last month' },
		 year : { name: 'Last year' },
	},
	charts: {
		// See all available icons at http://getbootstrap.com/components/#glyphicons
		 'system.system_load1' : { icon: 'stats',      name: 'System load' },
		 'system.system_load2' : { icon: 'list',       name: 'Active processes' },
		 'system.system_load3' : { icon: 'cog',        name: 'Memory usage' },
		    'mail.mail_queued' : { icon: 'envelope',   name: 'Mails in queue' },
		   'net.net0_bytes_in' : { icon: 'signal',     name: 'eth0 network traffic' },
		    'mail.mail_queues' : { icon: 'send',       name: 'Mail queue size' },
	},
}
