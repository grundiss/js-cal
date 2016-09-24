"use strict";

var moment = require('moment');

function calendar(mondayFirst) {
	return function(year, month) {
	    var m = moment().year(year).month(month).date(1);
    	var weeks = [];
    
	    do {
    		var week = [];
			weeks.push(week);    	
    	
	    	for(var i = 0; i < 7; i++) {
	    		var dow = m.day();
	    		
	    		if(mondayFirst) {
	    			dow = m.day() - 1;			
	    			if(dow < 0) dow = 6;
	    		}
    		
	    		if(dow !== i) {
    				week.push(null);
    			} else {
    				week.push(m.month() == month ? m.date() : null);
    				m.add(1, 'days')
	    		}
    		}
	    } while(m.month() === month)
    	
	    return weeks;
	}
}

module.exports = calendar;