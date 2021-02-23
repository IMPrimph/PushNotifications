const express = require('express')
const webPush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

//set statis path
app.use(express.static(path.join(__dirname, 'client')))

app.use(bodyParser.json())

const publicVapidKey = 'BJvqNQVHWDEV0j70sm9Q2r1ZQqA1nER8wW3q89IHOmhHWMwzXLZ9URPxHkUfTCPkt0pZXNNMvOXH427QUAVgnsk'
const privateVapidKey = "qI7OOO6dWZSVEDhF7abHrKVyt9vtcBX0fb-j5m7uDsE";

webPush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey
)

//create our subscribe route

app.post('/subscribe', (req, res) => {
    //get push subscription object
    const subscription = req.body;

    //send 201 - resource created
    res.status(201).json({})

    //create payload
    const payload = JSON.stringify({ title: 'Push Test' })

    //pass the object in to the send notificaton function
    webPush.sendNotification(subscription, payload).catch(err => console.error(err))
})

app.listen(3000, () => {
    console.log('Server started running')
})