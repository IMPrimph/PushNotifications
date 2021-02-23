const publicVapidKey = 'BJvqNQVHWDEV0j70sm9Q2r1ZQqA1nER8wW3q89IHOmhHWMwzXLZ9URPxHkUfTCPkt0pZXNNMvOXH427QUAVgnsk'

//check for service worker
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err))
}

//register the service worker, register push, send the push
async function send() {
    //register service worker
    console.log('registering service worker')
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    })
    console.log('service worker registered')

    //register push
    console.log('registering push.....')
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log('push completed...........')

    //send push notification
    console.log('Sending push notification......')
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
    console.log('push sent....')
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}