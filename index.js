  $(document).ready(function() { 
    // start Chrome Push Manager to obtain device id and register it with Realtime
    // a service worker will be launched in background to receive the incoming push notifications
    var chromePushManager = new ChromePushManager('js/service-worker.js', function(error, registrationId){
        console.log(registrationId);
    });    
});