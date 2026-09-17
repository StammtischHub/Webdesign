const audio = document.getElementById('audio');
let alreadyPlayed = false;

window.addEventListener('scroll', () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageSize = document.documentElement.scrollHeight;

  if (scrollPosition >= pageSize - 5 && !alreadyPlayed) {
    audio.play().catch(err => {
      console.warn('Autoplay blockiert:', err);
    });
    alreadyPlayed = true;
  }
});