# Introduction
As a consultant, I am often asked what code I am most proud of. Over the years, I’ve learned
that what I am most proud of is not necessarily how elegant my code is, but rather how
elegant my final solution is for the customer.
Recently, I was working on a couple of web pages which did not meet their intended purpose.
The purpose of the page was to match the time frames of an external resource. That resource
would process and report files based on complete months, years and quarters.
I quickly determined the current solution of having two date controls (start date and end date)
to manage the ranges was not working for them. It allowed the entry of values which would
not match the time frames of the external resource. In fact, the pages were deemed so
ineffective that they were not generally usable.
My solution was to create a date selector based off of a slider control from jQuery and
JavaScript. Now the end user can select proper dates which are constrained by the rules
9/22/25, 12:12 PM Code Project
https://www.codeproject.com/articles/Getting-It-Right-for-Your-Customers 1/9
defined above and the pages have now become usable. Most importantly, the customer was
pleased with the final product.

# Background
In all cases, the slider can slide to the first day of the selected range and the last day of the
range selected.
Given the date August 3, 2018 and the year range set from 2015 through 2018, the following
would be selectable by the control.
Depending on mode, the granularity of the control changes.
The control has three modes:
1. Display by years
1. The selectable dates would be January 1, 2015 through December 31, 2017
2. The formatted display dates would be 2015 through 2017
3. Three possible selections
2. Display by quarters
1. The selectable dates would be January 1, 2015 through June 30, 2018
2. The formatted display dates would be 2015/Q1 through 2018/Q2
3. Fourteen possible selections
3. Display by months
1. The selectable dates would be January 1, 2015 through July 31, 2018
2. The formatted display dates would be 1/1/2015 through 7/31/2018
3. Forty-three possible selections.
Here is a sample image of what the control will display for an end user.

# Moment.JS should no longer be used.
As written I used Moment.JS which has been changed to maintenance mode, It can still be downloaded and used 

# Using the Code
To use the DateSlider object, include the js file into the HTML file, ensuring that you include
the jQuery and moment.js.


