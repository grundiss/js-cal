"use strict";

var moment = require('moment');

function calendar(start, end) {
    var years = [];
    var workingMoment = start.clone().day(1);

    years: do {
        var year = [workingMoment.year()];

        months: do {
            var month = [workingMoment.month()];

            weeks: do {
                var week = [workingMoment.week()];

                days: for(var i = 0; i < 7; i++) {
                    try {
                        if(workingMoment.isBefore(start)) {
                            week.push(null);
                        } else if(workingMoment.isAfter(end)) {
                            throw 1;
                        } else {
                            week.push(workingMoment.date());
                        }
                    } catch (_) {
                        break days;
                    } finally {
                        workingMoment.add(1, 'day');
                    }
                }

                month.push(week);
            } while (workingMoment.week() == end.week());

            year.push(month);
        } while (workingMoment.month() <= end.month());

        years.push(year);
    } while (workingMoment.year() <= end.year());

    return years;
}

console.log(
    JSON.stringify(
        calendar(moment(), moment().year(2017).month(6).date(11)),
        null,
        4
    )
);

//module.export = calendar;