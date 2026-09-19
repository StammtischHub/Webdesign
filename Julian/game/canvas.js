const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width;
    canvas.height = height;
}
