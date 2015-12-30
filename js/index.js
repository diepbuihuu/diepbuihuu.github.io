$(document).ready(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/service-worker.js').then(function (registration) {
            // Registration was successful 
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            registration.pushManager.subscribe({userVisibleOnly: true}).then(function (subscription) {
                console.log("subscription.subscriptionId: ", subscription.subscriptionId);
                console.log("subscription.endpoint: ", subscription.endpoint);

                // TODO: Send the subscription subscription.endpoint
                // to your server and save it to send a push message
                // at a later date
//                return sendSubscriptionToServer(subscription);
                return true;
            });
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});