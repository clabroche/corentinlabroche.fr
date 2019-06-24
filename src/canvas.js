(_ => {
  let c = document.querySelector("canvas");
  let ctx = c.getContext("2d");
  let h;
  let w  = resizeCanvas()
  let amplitude = 100;
  let frequency = .01;
  let speed = 0;
  let frames = 0;
  ctx.lineWidth = 4;
  let color = '110,110,110'

  function resizeCanvas() {
    h = c.height
    return c.width = c.parentElement.offsetWidth ;
  }


  function debounce(fn, ms = 0) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

function sqr(a) {
    return a * a;
}

function Distance(pt1, pt2) {
    return Math.sqrt(sqr(pt2.y - pt1.y) + sqr(pt2.x - pt1.x));
}
  var canvas = document.querySelector("canvas");
let particles = []
let distanceLink = 100
window.addEventListener('resize', debounce(() => {
  resize()
}, 250))
function resize() {
  h = window.innerHeight
  canvas.width = w;
  canvas.height = h;
  return w
}

function seed(density = 50) {
  density = 100 - density
  density = 10000
  density = (w * h) / (density);
  particles = Array(Math.floor(density)).fill('').map(_=> new Particle(_, _, _, ctx))
}


function drawStars() {
  particles.map((particle,i) => {
    const windowX = window.innerWidth
    const windowY = window.innerHeight
    if ((particle.x > 0 && particle.x < windowX) && (particle.y > 0 && particle.y < windowY)) 
      particle.move();
    else {
      particles.splice(i, 1);
      particles.push(new Particle(_, _, _, ctx))
    }
  });
  for (let i = 0; i < particles.length / 2; i++) {
    const particle1 = particles[i];
    for (let j = 0; j < particles.length; j++) {
      const particle2 = particles[j];
      const distance = Distance(particle1, particle2);
      if(distance < distanceLink) {
        ctx.strokeStyle = `rgba(${color},${1 - distance/distanceLink} )`
        ctx.beginPath();
        ctx.moveTo(particle1.x, particle1.y);
        ctx.lineTo(particle2.x, particle2.y)
        ctx.stroke()
      }
    }
  } 
}
resize()







  setTimeout(() => {
    seed()
    window.onresize =  _ => {
      w = resizeCanvas()
    }
    
    const color1 = '#004E6A'
    const color2 = '#002B3B'
    const color3 = '#003C52'
    const color4 = '#00222F'
    const color5 = '#002B3B'
    const color6 = '#00222F'
    function Draw() {
      frames++
      speed = frames / 500;
    
      // ctx.clearRect(0, 0, w, h);
      canvas.width = w
      drawStars()
      
      drawSine((x, frequency, speed, amplitude) => {
        return Math.sin(x * frequency + speed *2) * amplitude / 4
      }, 60, color1, color2)
      drawSine((x, frequency, speed, amplitude) => {
        return Math.sin(x * frequency + speed * 5) * amplitude / 3
      }, 30, color3, color4)
      drawSine((x, frequency, speed, amplitude) => {
        return Math.sin(x * frequency + speed *10) * amplitude / 3
      }, 0, color5, color6)
      requestId = window.requestAnimationFrame(Draw);
    }
    function drawSine(yFun, offset = 40, color, fillColor) {
      ctx.beginPath();
      ctx.strokeStyle = fillColor;
      ctx.fillStyle = color;
      ctx.moveTo(0, h);
      for (let x = 0; x < w; x++) {
        y = yFun(x, frequency, speed, amplitude)
        ctx.lineTo(x, y + h -100 - offset);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.stroke();
      ctx.fill()
    }
    Draw()
  });
})()
