#!/bin/bash

readonly DATABASES="apache bind fail2ban ftp kern mail mysql net netstat phpapc proc serv system user"
readonly METRICS="system:system_load1 mail:mail_queued"
readonly SERVERS="host1.example.org host2.example.org server.example.net"
readonly PERIODS="1day 1week 1month 1year"
readonly DOCUMENT_ROOT=/var/www/vhosts/monitoring.example.org/httpdocs
readonly PRIVATE=/var/www/vhosts/monitoring.example.org/private

# Make sure there are at least as many colors as different servers in $SERVERS
readonly colors=("#99cc00" "#ff0099" "#ffcc00" "#ffccff" "#99ffcc" "#ffcc99" "#99ccff" "#41924B")

mkdir -p $PRIVATE/rrd || { echo "Error creating directory: $PRIVATE/rrd"; exit 1; }
cd $DOCUMENT_ROOT || { echo "Document root does not exist: $PRIVATE/rrd"; exit 1; }

for database in $DATABASES; do
    echo "Copying $database.rrd from localhost..."
    cp /var/lib/monitorix/www/private/$database.rrd private/rrd/"$database"."$server".rrd
    for server in $SERVERS; do
        echo "Fetching $database.rrd from $server..."
        wget -q http://$server:8080/monitorix/private/$database.rrd -Oprivate/rrd/"$database"."$server".rrd
    done
done

for metric in $METRICS; do
    for period in $PERIODS; do
        lines=''
        color=0
        database=`echo $metric | cut -d':' -f 1 -`
        ds=`echo $metric | cut -d':' -f 2 -`
        for server in $SERVERS; do
            server_=`echo $server | tr . _`
            lines=$lines"DEF:"$ds"_"$server_"=private/rrd/$database."$server".rrd:"$ds":LAST LINE1:"$ds"_$server_${colors[$color]}":$server_" "
            ((color+=1))
        done

        [[ "$i" = "1year" ]] && line='LINE2' || line='LINE1' &&
            rrdtool graph $DOCUMENT_ROOT"/images/charts/"$database"."$ds"."$period".png" --imgformat PNG \
            --start=-$period \
            --width=960 --height=450 \
            --lower-limit 1 \
            --title "Server load (1 xxx average)" \
            --vertical-label "System load" \
            --rigid \
            --color BACK#924d8b --color CANVAS#924d8b --color SHADEA#924d8b --color SHADEB#924d8b --color FRAME#00000000 \
            --color GRID#ffffff25 --color MGRID#ffffff2a --color FONT#ffffff --color AXIS#ffffffaa --color ARROW#ffffffaa \
            --font DEFAULT:9:sans-serif --font TITLE:11:sans-serif --font AXIS:9:sans-serif --font UNIT:11:sans-serif --font LEGEND:10:sans-serif --font WATERMARK:7:sans-serif \
            --slope-mode \
            --watermark "Generated on `date`" \
            $lines
    done;
done;
