/* A month view with 2 weeks and day cells running in rows (one-per-week) and columns
----------------------------------------------------------------------------------------------------------------------*/
//setDefaults({
//    fixedWeekCount: true,
//	twoWeekNavJump: 1
//});

var TwoWeeks = fcViews.twoweeks = BasicView.extend({
    //initialize: function() {
     //   this.dayGrid = new DayGrid(this);
	//	this.coordMap = this.dayGrid.coordMap; // the view's date-to-cell mapping is identical to the subcomponent's
    //
	//	// subclasses can implement
     //   var navJump = this.opt('twoWeekNavJump');
     //   if (navJump) {
     //       console.log(navJump);
     //       this.intervalDuration = moment.duration({'weeks': navJump});
     //   }
	//}

});
TwoWeeks.duration = { 'weeks': 2 };

