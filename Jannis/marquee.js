  const canvas = document.getElementById('marquee');
  const ctx = canvas.getContext('2d');
 
  const text = "© 2026 Jannis Dickel. A DIGITAL TRIBUTE. NOT AFFILIATED WITH BMW AG.";
  const fontSize = 10;
  const speed = 0.5;
 
  ctx.font = `${fontSize}px monospace`;
  let textWidth = ctx.measureText(text).width;
  let x = -textWidth;
 
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#c2c6d5'
    ctx.fillText(text, x, canvas.height / 2);
 
    x += speed; 
 
    if (x > canvas.width) {
        x = -textWidth;
    }
    
    requestAnimationFrame(draw);
  }
 
  draw();
