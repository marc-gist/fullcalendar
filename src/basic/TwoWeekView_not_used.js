/* OBSOLETE - for version 2.2.3 or less

 */
/* A month view with 2 weeks and day cells running in rows (one-per-week) and columns
----------------------------------------------------------------------------------------------------------------------*/

setDefaults({
	fixedWeekCount: true,
	titleFormat: {
		twoweeks: "ll"
	},
	columnFormat: {
		twoweeks: 'ddd'
	},
	twoWeekNavJump: 1
});

fcViews.twoweeks = TwoWeeksView; // register the view

function TwoWeeksView(calendar) {
	BasicView.call(this, calendar); // call the super-constructor
}


TwoWeeksView.prototype = createObject(BasicView.prototype); // define the super-class
$.extend(TwoWeeksView.prototype, {

	name: 'twoweeks',


	incrementDate: function(date, delta) {
		return date.clone().stripTime().add(delta*this.opt('twoWeekNavJump'), 'weeks').startOf('week');
	},


	render: function(date) {
		var rowCnt;

		this.intervalStart = date.clone().stripTime().startOf('week');
		this.intervalEnd = this.intervalStart.clone().add(2, 'weeks');

		this.start = this.intervalStart.clone();
		this.start = this.skipHiddenDays(this.start); // move past the first week if no visible days
		this.start.startOf('week');
		this.start = this.skipHiddenDays(this.start); // move past the first invisible days of the week

		this.end = this.intervalEnd.clone();
		this.end = this.skipHiddenDays(this.end, -1, true); // move in from the last week if no visible days
		this.end.add((7 - this.end.weekday()) % 7, 'days'); // move to end of week if not already
		this.end = this.skipHiddenDays(this.end, -1, true); // move in from the last invisible days of the week

		this.title = this.calendar.formatRange(this.start, this.end.clone().subtract(1), this.opt("titleFormat"), " - ");

		//rowCnt = Math.ceil( // need to ceil in case there are hidden days
		//	this.end.diff(this.start, 'weeks', true) // returnfloat=true
		//);
		//if (this.isFixedWeeks()) {
		//	this.end.add(2, 'weeks');
		//	rowCnt = 2;
		//}
		rowCnt = 2;

		this.title = this.calendar.formatRange(
			this.start,
			this.end.clone().subtract(1), // make inclusive by subtracting 1 ms
			this.opt('titleFormat'),
			' \u2014 ' // emphasized dash
		);

		BasicView.prototype.render.call(this, rowCnt, this.getCellsPerWeek(), true); // call the super-method
	},


	// Overrides the default BasicView behavior to have special multi-week auto-height logic
	setGridHeight: function(height, isAuto) {

		isAuto = isAuto || this.opt('weekMode') === 'variable'; // LEGACY: weekMode is deprecated

		// if auto, make the height of each row the height that it would be if there were 6 weeks
		if (isAuto) {
			height *= this.rowCnt / 6;
		}

		distributeHeight(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
	},


	isFixedWeeks: function() {
		var weekMode = this.opt('weekMode'); // LEGACY: weekMode is deprecated
		if (weekMode) {
			return weekMode === 'fixed'; // if any other type of weekMode, assume NOT fixed
		}

		return this.opt('fixedWeekCount');
	}

});
