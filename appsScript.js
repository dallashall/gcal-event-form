// TODO: Clean up code. Make more DRY.
// Create a trigger based off a form submit if you would like this to run every time a new entry is recorded

function createEvent() {
  var sheet = SpreadsheetApp.getActiveSheet(); // *Only works if this Apps Script is tied to your Google Sheet
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var lastRow = rows.getLastRow();
  function getCol(num) {
    // Uncomment the following line to see which event should be showing up on your calendar
    // Logger.log(sheet.getSheetValues(lastRow, num, 1, 1)[0][0]);
    
    return sheet.getSheetValues(lastRow, num, 1, 1)[0][0];

  }
  
  // These are the fields of the form. If you need less or more information,
  // make your changes here. The column numbers start at 1 (NOT 0!). Your
  // column number may vary based on your form.
  var eventInfo = {
    timestamp: getCol(1),
    name: getCol(2),
    setupTime: getCol(3),
    endTime: getCol(4),
    startTime: getCol(5),
    entireTime: getCol(6),
    repeat: getCol(7),
    description : getCol(9),
    scheduledBy: getCol(10),
    location: getCol(11),
  }
  
  var eventDescription = '';
  
  // Makes event on calendar appear to start 30 minutes early and end 30 minutes late
  // in order to give technicians time to finish their setups before guests arrive.
  // The actual start time is preserved in the event details in a human readable form
  // so that the technicians know what time their events must be set up by.
  // If you do not need this functionality, make your changes here.
  var start = new Date( Date.parse(eventInfo.setupTime) - 1800000);
  var setupEnd = new Date( Date.parse(eventInfo.setupTime));
  var end = new Date( Date.parse(eventInfo.endTime) + 1800000);
  var tearDownEnd = new Date( Date.parse(eventInfo.endTime) + 1800000);
  var startTimeHuman = eventInfo.startTime.toLocaleTimeString();
  var endTimeHuman = eventInfo.endTime.toLocaleTimeString();
  var eName = '';
  
  // Changes color of event based on the start time of the event vs when it was scheduled
  var eColor = '';
  var timeDiff = Date.parse(eventInfo.setupTime) - Date.parse(eventInfo.timestamp);
  if (timeDiff < (1 * 24 * 60 * 60 * 1000)) { // days * hours * minutes * seconds * milliseconds
    eColor = 11; // Red if less than 1 days notice
  } else if (timeDiff < (2 * 24 * 60 * 60 * 1000)) {
    eColor = 5; // Yellow if less than 2 days notice
  } else {
    eColor = 9; // Blue for normal notice
  }
  
  if (eventInfo.entireTime === 'Yes') { // If the calendar event should cover the whole time
    eventDescription = "Tech to stay throughout event. \n\n"
                     + "Starts: "+startTimeHuman
                     + "\nEnds: "+endTimeHuman 
                     + "\nDetails: \n"
                     + eventInfo.description
                     + "\n\nPut on Calendar by: " + eventInfo.scheduledBy
                     + "\n" + eventInfo.timestamp;

    eName = '______ - ' + eventInfo.name; // We use blanks to show that no tech has been assigned to an event
    schedule(start,end,eventDescription,eName);
    
  } else if (eventInfo.entireTime === 'No') { // If the calendar event should be split into separate setup and tear-down events
    eventDescription = "Tech for setup/teardown only. \n\n"
                     + "Starts: " + startTimeHuman
                     + "\nEnds: "+endTimeHuman 
                     + "\n\nDetails: \n"
                     + eventInfo.description
                     + "\n\nPut on Calendar by: " + eventInfo.scheduledBy
                     + "\n" + eventInfo.timestamp;

    eName = '______ - Setup ' +eventInfo.name;
    schedule(start,setupEnd,eventDescription,eName);
    eName = '______ - Teardown ' +eventInfo.name;
    schedule(eventInfo.endTime, end, eventDescription, eName); 
  }
  
    
  function schedule(eventStart,eventEnd,eventDesc,eventName){
    var techs = "email_addresses_here"; // Add your own list of guests
    var calendarId = 'CALENDAR_ID_HERE'; // Enter your own Calendar ID
    var event = {
      summary: eventName,
      location: eventInfo.location,
      description: eventDesc,
      start: {
        dateTime: eventStart.toISOString()
        
      },
      end: {
        dateTime: eventEnd.toISOString()
      },
    
      // Set above, based on the date scheduled vs date of event
      colorId: eColor
    };
    event = Calendar.Events.insert(event, calendarId);
    Logger.log('Event ID: ' + event.getId());
  }
}
