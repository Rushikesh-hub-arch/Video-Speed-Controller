chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message:', message);
    if (message.action === 'setSpeed') {
        const videos = document.querySelectorAll('video');
        videos.forEach((video) => {
            video.playbackRate = parseFloat(message.speed);
            console.log(`Video speed set to: ${video.playbackRate}`);
        });
        sendResponse({status: 'success'});
    }
});