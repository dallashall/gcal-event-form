# gcal-event-form
Creates a Google Calendar event based on a Google form and Google Sheet.

This was originally created to create events on a work calendar for A/V Technicians, inviting them at the same time.

## Features
* Create an event spanning the entire listed time
* Create two separate events for setup and tear-down
* Can optionally invite a list of email addresses to the events (Google has invite limitations to prevent spam. Be aware of those if you use this for mission-critical work.)
* Color coding for events that occur within 24 or 48 hours of being scheduled.

## Installation
You will need:
* A Google Form with responses going into a Google Sheet
* A Google Apps Script linked to the responses' Google Sheet
* A Google Developer Project linked to the Apps Script with the Calendar API enabled

1. Create a Google Form with the following fields:
  * event name (text)
  * setup time (date/time)
  * end time (date/time)
  * start time (date/time)
  * tech for entire time? (Yes/No)
  * repeat event (Yes/No) --Not currently implemented--
  * description (paragraph text)
  * scheduled by (text)
  * event location (text)
2. Save the responses to a new Google Sheet (referred to as 'Response Sheet' from here on)
3. Create an Apps Script from the Response Sheet
  1. Open the Response Sheet
  2. Go to __Tools__ > __Script Editor__
  3. Copy the contents of appsScript.js into your new Apps Script
4. Link your Apps Script with a Google Developer Project and enable the Calendar API
  1. Go to __Resources__ > __Developers Console Project__
  2. Follow the instructions to create a new project
  3. Once your project is created, enable the Google Calendar API for that project and return to your apps script
5. Fill in your own details
  * Find and copy the ID of the calendar you want the events to appear on (you must have editing rights)
  * Paste the calendar ID into the apps script where it says "CALENDAR_ID_HERE"
  * Change "YOUR_GUESTS_HERE" to a list of email addresses of your choosing (start with your email while testing)
6. Fill in a test event in your form, and hit submit
7. Test your apps script
  1. Save your apps script
  2. Click run (it grabs the last entry on the form - your test event)
  3. Accept the request for permission to make changes on your calendar
  4. Check your calendar for your test event
8. Set up the form to run every time an event is submitted
  1. In your apps script, go to __Resources__ > __Project Triggers__
  2. Set createEvent() to trigger __From Spreadsheet__ - __On Form Submit__
  3. Set a notification to email you in case of failure
  
### Common Causes of Failure
* End date does not follow start date
* Too many events error (typically happens if you are inviting 10 or more people to 100 or more events a month)
* Mismatched column numbers - Make sure you change the column numbers in your apps script to match the column numbers in your form
