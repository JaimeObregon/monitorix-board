# monitorix-board
A sexy centralized status board for multi server monitoring with Monitorix.

## About Monitorix-board
Monitorix-board is a HTML+CSS frontend to all your Monitorix monitoring, capable of combining every metric from multiple servers into a single chart, thus allowing easier comparison and surveillance of server resources in a fraction of screen estate.

Monitorix-board is similar to [Monitorix multihost](http://www.monitorix.org/documentation.html#46), although more flexible and usable.

## About Monitorix
[Monitorix](https://github.com/mikaku/Monitorix) is a free, open source, lightweight system monitoring tool.  It consists of two parts: a **collector**, which is a daemon that measures many services and system resources storing their real-time values in a database (using [RRDtool](https://github.com/oetiker/rrdtool-1.x)), and **a CGI script** accesible via a built-in web server, which generates charts and provides a simple web interface to visualize the metrics from a web browser. See [monitorix.org](http://monitorix.org) for the details.
	

## Screenshots

![Sample screenshot](/screenshot.png?raw=true "Sample screenshot")

## How it works
Monitorix daemon collects system and services data in the background and stores their values in `.rrd` files, usually located under `/var/lib/monitorix/`. Monitorix-board consists of two parts:

1. **A cronjob**, which fetches these databases periodicallyvia ssh from the remote servers being monitored, and generates a single chart for every metric.
2. A pure HTML+CSS+JavaScript **website**, which allows to visualize these charts from a web browser.

## Requeriments
1. RRDtool, installable via `yum install rrdtool` or `apt-get install rrdtool`.
2. Password-less access to the monitored servers via SSH, with keys.
3. A JavaScript-enabled browser.

## Setup
1. If you haven't done it yet, install Monitorix on every server.
2. Expose your `.rrd` files to Monitorix built-in web server with symlinks:
   ```
   cd /var/lib/monitorix
   mkdir www/private
   for i in *rrd; do ln -s ../../$i www/private/$i; done
   ```
   **Set up your iptables/firewall to deny access to Monitorix' web server to all IP addresses except your trusted ones, or you will be exposing your RRD databases to the world**.
3. Rename `scripts/config.default.js` to `config.js` and customize it.
3. Rename `private/cronjob.default.sh` to `cronjob.sh` and customize it.
4. Add monitorix-board cronjob to your Cron.
3. Deploy monitorix-board to a web host.

## To-do
1. Improve this README.
