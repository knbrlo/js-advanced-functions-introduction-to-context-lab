let createEmployeeRecord = function(arrayOfValues) {
    let newDataSet = {
      firstName: arrayOfValues[0],
      familyName: arrayOfValues[1],
      title: arrayOfValues[2],
      payPerHour: arrayOfValues[3],
      timeInEvents: [],
      timeOutEvents: []
    };
    return newDataSet;
}

let createEmployeeRecords = function(arrayOfValues) {
    return arrayOfValues.map(record => {
        return createEmployeeRecord(record);
    });
}

let createTimeInEvent = function(record, dateTimestamp) {
    let date = dateTimestamp.split(" ")[0]
    let time = dateTimestamp.split(" ")[1]
    let newTimeIn = {
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date,
    }
    record.timeInEvents.push(newTimeIn);
    return record;
}

let createTimeOutEvent = function(record, dateTimestamp) {
    let date = dateTimestamp.split(" ")[0]
    let time = dateTimestamp.split(" ")[1]
    let newTimeOut = {
        type: "TimeOut",
        hour: parseInt(time),
        date: date,
    }
    record.timeOutEvents.push(newTimeOut);
    return record;
}

let hoursWorkedOnDate = function(record, requestedDate) {
    let timeInValue = record.timeInEvents.find(event => {
        return event.date == requestedDate
    });

    let timeInIntegerValue = parseInt(timeInValue.hour)/100;

    let timeOutValue = record.timeOutEvents.find(event => {
    return event.date == requestedDate
    });
    let timeOutIntegerValue = parseInt(timeOutValue.hour)/100;
    
    return timeOutIntegerValue - timeInIntegerValue;
}

let wagesEarnedOnDate = function(record, date) {
    return record.payPerHour * hoursWorkedOnDate(record, date);
}

let allWagesFor = function(record) {
    let totalHoursWorked = 0;
    for (let timeInEvent of record.timeInEvents) {
        let timeOutEvent = record.timeOutEvents.find(event => {
            return timeInEvent.date == event.date
        })
        let hoursWorkedOnDate = (parseInt(timeOutEvent.hour, 10) - parseInt(timeInEvent.hour, 10)) / 100
        totalHoursWorked += hoursWorkedOnDate;
    }
    return totalHoursWorked * record.payPerHour;
}

let findEmployeeByFirstName = function(array, firstName) {
    let foundEmployee = array.find(employee => {
        return employee.firstName == firstName;
    })
    return foundEmployee;
}

let calculatePayroll = function(array) {
    let totalPayroll = 0;
    for (let employee of array) {
        for (let timeInEvent of employee.timeInEvents) {
            totalPayroll += wagesEarnedOnDate(employee, timeInEvent.date);
        }
    }
    return totalPayroll;
}