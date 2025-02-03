document.getElementById('setSpeedBtn').addEventListener('click', () => {
  const speed = parseFloat(document.getElementById('speedInput').value);
  if (speed && speed > 0) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript(
              {
                  target: { tabId: tabs[0].id },
                  func: setVideoSpeed,
                  args: [speed]
              },
              () => {
                  if (chrome.runtime.lastError) {
                      console.error(chrome.runtime.lastError.message);
                  } else {
                      console.log('Speed set to:', speed);
                  }
              }
          );
      });
  } else {
      alert('Please enter a valid speed.');
  }
});

function setVideoSpeed(speed) {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
      video.playbackRate = speed;
      // Attempt to override any restrictions
      const observer = new MutationObserver(() => {
          if (video.playbackRate !== speed) {
              video.playbackRate = speed;
          }
      });
      observer.observe(video, { attributes: true, attributeFilter: ['playbackRate'] });
  });
}