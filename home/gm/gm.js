function goBack(){
    // Check if the current URL contains 'github.io'
    if (window.location.href.includes("github.io")) {
        window.location.href = '/calculator/home';
    } else {
        window.location.href = '/home';
    }
};


function goFullscreen() {
    let gameFrame = document.getElementById("gameFrame");
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.mozRequestFullScreen) { 
        gameFrame.mozRequestFullScreen();
    } else if (gameFrame.webkitRequestFullscreen) { 
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) { 
        gameFrame.msRequestFullscreen();
    }
}

// Service worker stuff

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
  
        // Listen for the 'controllerchange' event when a new service worker takes control
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('New service worker activated');
          showToast('A new version of the app is available!'); // Show a toast to the user
        });
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  }
  
  function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
  
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 4000);
  }
  