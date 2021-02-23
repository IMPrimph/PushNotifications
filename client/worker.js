console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: "Notified by Jay",
        icon: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.icons8.com%2Fofficel%2F2x%2Fperson-male.png&imgrefurl=https%3A%2F%2Ficons8.com%2Ficons%2Fset%2Fperson&tbnid=I9pklgvZUwwemM&vet=12ahUKEwja_NDOiIDvAhV70XMBHXqlDioQMygDegUIARDfAQ..i&docid=mS7Rr4Njk7NZUM&w=160&h=160&q=person%20icons&hl=en&client=firefox-b-d&ved=2ahUKEwja_NDOiIDvAhV70XMBHXqlDioQMygDegUIARDfAQ"
    });
});