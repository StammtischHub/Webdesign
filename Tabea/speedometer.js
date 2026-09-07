const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const center = 140;
const radius = 110;

const maxRpm = 14000;

const currentRpm = 4000;

function rpmToAngle(rpm){
    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;

    return startAngle + (rpm/maxRpm) * (endAngle-startAngle);
}

function drawBaseArc(){
    ctx.beginPath()
    ctx.arc( center, center, radius, Math.PI * 0.75, Math.PI * 2.25);
    ctx.strokeStyle = "#1e1e1e";
    ctx.lineWidth = 12;
    ctx.stroke();
}

function drawActiveArc(){
    const angle = rpmToAngle(currentRpm)
    ctx.beginPath()
    ctx.arc( center, center, radius, Math.PI * 0.75, angle);
    ctx.strokeStyle = "#5AAB50";
    ctx.lineWidth = 12;

    ctx.stroke();
}

function drawStrokes(){
    for(let rpm=0; rpm <=maxRpm; rpm += 1000){
        const angle = rpmToAngle(rpm);

        let length = 6;
        if(rpm % 2000 === 0){
            length = 15;
        }

        const x1 = center + Math.cos(angle) * radius;
        const y1 = center + Math.sin(angle) * radius;

        const x2 = center + Math.cos(angle) * (radius - length);
        const y2 = center + Math.sin(angle) * (radius - length);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        if(rpm >= 10000){
            ctx.strokeStyle = "#CC0000";
        }else{
            ctx.strokeStyle = "#fff";

        }
        ctx.lineWidth = 2;
        ctx.stroke();

        if(rpm%2000 === 0){
            const textX = center + Math.cos(angle)*(radius-25);
            const textY = center + Math.sin(angle)*(radius-25);

            if(rpm >= 10000){
                ctx.fillStyle = "#CC0000";
            }else{
                ctx.fillStyle = "#9a9a9a";

            }
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(rpm/1000, textX, textY);
        }
    }
}

function drawNeedle(){
    const angle = rpmToAngle(currentRpm);

    const x = center + Math.cos(angle) * (radius - 20);
    const y = center + Math.sin(angle) * (radius - 20);

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(x,y);
    ctx.strokeStyle = "#ff4136";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#e0e0e0";
    ctx.fill();
}

function drawText(){
    ctx.fillStyle = "#9a9a9a";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("DREHZAHL", center, center -35);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 32px Arial";
    ctx.fillText((currentRpm/1000).toFixed(3),center, center+25);

    ctx.fillStyle = "#7a7a7a";
    ctx.font = "10px Arial";
}

drawBaseArc();
drawActiveArc();
drawStrokes();
drawNeedle();
drawText();