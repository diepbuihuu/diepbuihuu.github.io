var guid = '';
var meetId = '';

self.addEventListener('push', function (event) {

    event.waitUntil(
        fetch('https://diepbuihuu.github.io/data.json').then(function (response) {
            console.log(response.json());
            try {
                var data = JSON.parse(response);
                var title = data.title || 'New notification';
                var body = data.body || 'There is newly updated content available on the site. Click to see more.';
                meetId = data.meetId || '';
                var icon = 'https://www.socialivo.com/design/image/favicon.png';
                var tag = 'socialivo';
                self.registration.showNotification(title, {  
                    body: body,  
                    icon: icon,  
                    tag: tag  
                });
            } catch (e) {
                console.log(e);
            }
        }).catch(function (err) {
            self.registration.showNotification('New notification', {
                body: 'There is newly updated content available on the site. Click to see more.',
                icon: 'https://www.socialivo.com/design/image/favicon.png',
                tag: 'socialivo'
            });
        })

    );
});

self.addEventListener('message', function (evt) {
    console.log('postMessage received', evt.data);
    if (evt.data.action === 'send guid') {
        guid = evt.data.guid;
    }
    evt.ports[0].postMessage({'test': 'This is my response.'});
})

self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn't close the notification when you click on it  
    // See: http://crbug.com/463146  
    event.notification.close();

    // This looks to see if the current is already open and  
    // focuses if it is  
    event.waitUntil(
            clients.matchAll({
                type: "window"
            })
            .then(function (clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url == '/' && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    if (meetId) {
                        return clients.openWindow('https://www.socialivo.com/activity.html?act=' + meetId);
                    } else {
                        return clients.openWindow('https://www.socialivo.com');
                    }
                    
                }
            })
            );
});