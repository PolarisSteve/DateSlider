// DateRanger works with a range control (JQuery Slider)
// to select a validated beginning and ending date range.

//Rules:
// 1. Future dates are not valid.
// 2. Only full ranges are returned.
// 3. Valid Ranges include years, months and quarters 

// Requires reference to moment.js

/*
 * This program is written by Steven Contos - Steven.Contos@PolarisSolutions.com
 * Polaris Solutions - www.PolarisSolutions.com
 * License included in repository
 */

var DateRanger = (function () {
    //Local variables
    var datapointCollection = [];
    var valid_years = [];
    var valid_quarters = [];
    var valid_months = [];

    //Constructor
    function DateRanger(
        start_year = new Date().getFullYear() - 3,
        end_year = new Date().getFullYear()
    ){
        appendYears(start_year, end_year);
        calcDateFrames();
    }


    //Local functions
    function initializeYear(year) {
        var currYear = this;

        currYear.year = year;
        currYear.isValid = false;

        currYear.quarters =  [
            {
                name: "Q1", isValid: false, months: [
                    { name: "01", isValid: false },
                    { name: "02", isValid: false },
                    { name: "03", isValid: false }] },

            {
                name: "Q2", isValid: false, months: [
                    { name: "04", isValid: false },
                    { name: "05", isValid: false },
                    { name: "06", isValid: false }] },

            {
                name: "Q3", isValid: false, months: [
                    { name: "07", isValid: false },
                    { name: "08", isValid: false },
                    { name: "09", isValid: false }] },

            {
                name: "Q4", isValid: false, months: [
                    { name: "10", isValid: false },
                    { name: "11", isValid: false },
                    { name: "12", isValid: false }]
            }
        ];
        
    }

    function validateCurrent(arr) {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;



        arr.forEach(function (yi) {
            //Previous years all elements are valid
            if (yi.year < year) {
                yi.isValid = true;

                yi.quarters.forEach(function (qi) {
                    qi.isValid = true;
                    qi.months.forEach(function (mi) {
                        mi.isValid = true;
                    })
                })
            }
            //Future year will still be invalid
            else if (yi.year === year){
                
                //In the current year, the fourth quarter is invalid (fourth quarter is not finished in current year)
                if (month >= 3) {
                    yi.quarters[0].isValid = true;
                }
                if (month >= 6) {
                    yi.quarters[1].isValid = true;
                }
                if (month >= 9) {
                    yi.quarters[2].isValid = true;
                }

                //only complete months are valid, current month and future are invalid
                var loop = 1;

                yi.quarters.forEach(function (q) {
                    q.months.forEach(function (m) {
                        if(loop < month)
                            m.isValid = true;
                        loop++;
                    })
                })
            }
            });

    }

    function appendYears(start_year, end_year) {
        //re-initialize
        datapointCollection = [];
        valid_years = [];
        valid_quarters = [];
        valid_months = [];


        while (start_year <= end_year) {
            datapointCollection.push(new initializeYear(start_year));
            start_year++;
        }
        
        validateCurrent(datapointCollection);
        

    }

    function calcDateFrames() {
        //Fill in the valid_* arrays

        for (var y = 0; y < datapointCollection.length; y++) {
            if (datapointCollection[y].isValid) 
                valid_years.push({ StartMonth: 1, EndMonth: 12, year: datapointCollection[y].year });
            for (var q = 0; q < datapointCollection[y].quarters.length; q++) {
                if (datapointCollection[y].quarters[q].isValid) 
                    valid_quarters.push({ StartMonth: q * 3 + 1, EndMonth: q * 3 + 3, year: datapointCollection[y].year, name: datapointCollection[y].quarters[q].name })
                for (var m = 0; m < datapointCollection[y].quarters[q].months.length; m++) {
                    if (datapointCollection[y].quarters[q].months[m].isValid)
                        valid_months.push({ StartMonth: q * 3 + m + 1, EndMonth: q * 3 + m + 1, year: datapointCollection[y].year, name: datapointCollection[y].quarters[q].months[m].name })
                }
            }
        }
    }
    

    //Prototypes
    DateRanger.prototype.setCurrentDateView = function (strDateView) {
        var fdisplay = {};
        var startIndex = 0;
        var endIndex = 0;
        var selectedStartDate = {};
        var selectedEndDate = {};


        switch (strDateView) {
            case 'Month':
                fdisplay = function (index) { return valid_months[index].name + '/' + valid_months[index].year; };
                selectedStartDate = function (index) { return moment().year(valid_months[index].year).month(valid_months[index].StartMonth - 1).startOf('month').format("M/D/YYYY"); };
                selectedEndDate = function (index) { return moment().year(valid_months[index].year).month(valid_months[index].EndMonth - 1).endOf('month').format("M/D/YYYY"); };
                //the number is simply a guess as to how large of a spread you want to start with.
                startIndex = valid_months.length - 7;
                endIndex = valid_months.length - 1;
                break;
            case 'Quarter':
                fdisplay = function (index) { return valid_quarters[index].year + '/' + valid_quarters[index].name; };
                selectedStartDate = function (index) { return moment().year(valid_quarters[index].year).month(valid_quarters[index].StartMonth - 1).startOf('month').format("M/D/YYYY"); };
                selectedEndDate = function (index) { return moment().year(valid_quarters[index].year).month(valid_quarters[index].EndMonth - 1).endOf('month').format("M/D/YYYY"); };
                //the number is simply a guess as to how large of a spread you want to start with.
                startIndex = valid_quarters.length - 3;
                endIndex = valid_quarters.length - 1;
                break;
            default:
                fdisplay = function (index) { return valid_years[index].year; };
                selectedStartDate = function (index) { return moment().year(valid_years[index].year).month(valid_years[index].StartMonth - 1).startOf('month').format("M/D/YYYY"); };
                selectedEndDate = function (index) { return moment().year(valid_years[index].year).month(valid_years[index].EndMonth - 1).endOf('month').format("M/D/YYYY"); };
                //the number is simply a guess as to how large of a spread you want to start with.
                startIndex = valid_years.length - 2;
                endIndex = valid_years.length - 1;
                break;
        }

        

        return {
            sIndex: startIndex,
            eIndex: endIndex,
            display: fdisplay,
            fullStartDate: selectedStartDate,
            fullEndDate: selectedEndDate
        };
    };
    
    return DateRanger;

})();
