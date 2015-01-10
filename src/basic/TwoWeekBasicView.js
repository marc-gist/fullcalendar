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
    // Computes the new date when the user hits the next button, given the current date
    computeNextDate: function(date) {
        var out;
        var navJump = this.opt('twoWeekNavJump');
        if ( navJump ) {
            out = date.clone().stripTime().add(this.opt('twoWeekNavJump'), 'weeks').startOf('week');
        } else {
            out = date.clone().startOf(this.intervalUnit).add(this.intervalDuration);
        }

        return this.skipHiddenDays(out);
    }
});
TwoWeeks.duration = { 'weeks': 2 };

