/* A month view with 2 weeks and day cells running in rows (one-per-week) and columns
----------------------------------------------------------------------------------------------------------------------*/
setDefaults({
    fixedWeekCount: true,
	twoWeekNavJump: 1
});

//fcViews.twoweeks = {
//    type: 'basic',
//    duration: { weeks: 2 }
//};

var TwoWeeks = fcViews.twoweeks = BasicView.extend({
    // Computes the new date when the user hits the prev button, given the current date
	computePrevDate: function(date) {
        var navJump = this.opt('twoWeekNavJump');
        if ( navJump ) {
            return date.clone().startOf('week').subtract(navJump, 'weeks');
        } else {
            return this.skipHiddenDays(
                date.clone().startOf(this.intervalUnit).subtract(this.intervalDuration), -1
            );
        }
	},

    // Computes the new date when the user hits the next button, given the current date
    computeNextDate: function(date) {
        var navJump = this.opt('twoWeekNavJump');
        if ( navJump ) {
            return date.clone().startOf('week').add(navJump, 'weeks');
        } else {
            return this.skipHiddenDays(
			    date.clone().startOf(this.intervalUnit).add(this.intervalDuration)
		    );
        }
    }
});
TwoWeeks.duration = { 'weeks': 2 };

