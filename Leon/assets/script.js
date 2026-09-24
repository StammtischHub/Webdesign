function drawBasketballCourt() {
  const canvas = document.getElementById('court-canvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const margin = 14;
  const fieldWidth = canvasWidth - margin * 2;
  const fieldHeight = canvasHeight - margin * 2;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;

  // Spielfeld-Umriss
  ctx.strokeRect(margin, margin, fieldWidth, fieldHeight);

  // Mittellinie
  ctx.beginPath();
  ctx.moveTo(centerX, margin);
  ctx.lineTo(centerX, canvasHeight - margin);
  ctx.stroke();

  // Mittelkreis
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
  ctx.stroke();

  const zoneWidth = 45;
  const zoneHeight = 70;
  const zoneY = centerY - zoneHeight / 2;

  // Linke Zone + Freiwurfkreis
  ctx.strokeRect(margin, zoneY, zoneWidth, zoneHeight);
  ctx.beginPath();
  ctx.arc(margin + zoneWidth, centerY, zoneHeight / 2, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();

  // Rechte Zone + Freiwurfkreis
  ctx.strokeRect(canvasWidth - margin - zoneWidth, zoneY, zoneWidth, zoneHeight);
  ctx.beginPath();
  ctx.arc(canvasWidth - margin - zoneWidth, centerY, zoneHeight / 2, Math.PI / 2, Math.PI * 1.5);
  ctx.stroke();

  // Drei-Punkte-Linien
  ctx.save();
  ctx.beginPath();
  ctx.rect(margin, margin, fieldWidth, fieldHeight);
  ctx.clip();

  ctx.beginPath();
  ctx.arc(margin + 25, centerY, 68, -Math.PI / 2.4, Math.PI / 2.4);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvasWidth - margin - 25, centerY, 68, Math.PI - Math.PI / 2.4, Math.PI + Math.PI / 2.4);
  ctx.stroke();
  ctx.restore();

  // Körbe
  ctx.beginPath();
  ctx.arc(margin + 10, centerY, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(canvasWidth - margin - 10, centerY, 3, 0, Math.PI * 2);
  ctx.fill();
}

document.addEventListener('DOMContentLoaded', drawBasketballCourt);

const svg = document.querySelector('.download-btn svg');
const mqTablet = window.matchMedia('(max-width: 1500px)');
const mqMobile = window.matchMedia('(max-width: 800px)');

function updateSvg() {
  let size;
  if (mqMobile.matches) size = '21';
  else if (mqTablet.matches) size = '23';
  else size = '27';

  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
}

updateSvg(); // einmal beim Laden ausführen
mqTablet.addEventListener('change', updateSvg);
mqMobile.addEventListener('change', updateSvg);