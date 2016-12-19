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

TODO: Finish instructions
