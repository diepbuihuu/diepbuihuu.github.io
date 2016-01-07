  $(document).ready(function() { 
        var testMoment = moment('2016-01-07T11:15:00.000Z');
        alert (testMoment.toISOString());
        var current = moment().toISOString();
        alert(current);
});