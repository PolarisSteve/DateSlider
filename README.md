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
