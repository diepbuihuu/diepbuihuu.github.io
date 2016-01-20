$(document).ready(function () {
    // start Chrome Push Manager to obtain device id and register it with Realtime
    // a service worker will be launched in background to receive the incoming push notifications
    var chromePushManager = new ChromePushManager('service-worker.js', function (error, registrationId) {
        console.log(registrationId);
    });

    function sendMessage(message) {
        // This wraps the message posting/response in a promise, which will
        // resolve if the response doesn't contain an error, and reject with
        // the error if it does. If you'd prefer, it's possible to call
        // controller.postMessage() and set up the onmessage handler
        // independently of a promise, but this is a convenient wrapper.
        return new Promise(function (resolve, reject) {
            var messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = function (event) {
                if (event.data.error) {
                    reject(event.data.error);
                } else {
                    resolve(event.data);
                }
            };

            // This sends the message data as well as transferring
            // messageChannel.port2 to the service worker.
            // The service worker can then use the transferred port to reply
            // via postMessage(), which will in turn trigger the onmessage
            // handler on messageChannel.port1.
            // See
            // https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
            navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
        });
    }
    
    wrapper = sendMessage({action: 'send guid', guid: 'yyyyyyyyyyyyyyyyyy'});
    wrapper.then(function(value) {
        console.log(value);
    }, function (err) {
        console.log(err);
    });
});