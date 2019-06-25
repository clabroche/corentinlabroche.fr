<template>
  <div class="jumbo">
    <canvas ref="canvas"></canvas>
    <transition name="slide-fade">
      <div class="label" v-if="quote && author">
        <div v-html="quote"></div>
        <div class="author">"{{author}}"</div>
      </div>
    </transition>
    <i class="fas fa-chevron-down bottom"></i>
  </div>
</template>

<script>
import Particle from './Particle'
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      canvas: null,
      ctx: null,
      h: null,
      w: null,
      amplitude: 100,
      frequency: .01,
      speed: 0,
      frames: 0,
      color: '100,100,100',
      particles: [],
      distanceLink: 100,
      color1: '#004E6A',
      color2: '#002B3B',
      color3: '#003C52',
      color4: '#00222F',
      color5: '#002B3B',
      color6: '#00222F',
      quote: '',
      author: ''
    }
  },
  async mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext("2d");
    this.w  = this.resizeCanvas()
    this.ctx.lineWidth = 4;
    this.resize()
    window.addEventListener('resize', this.debounce(() => {
      this.w = this.resizeCanvas()
      this.resize()
    }, 250))
    this.seed()
    this.draw()
    this.getQuote()
    setInterval(() => {
      this.quote = ''
      this.getQuote()
    }, 7500);
  },
  methods: {
    async getQuote() {
      const {data: quotes} = await axios.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=30&callback=&bogusQSvar=' + Math.random())
      const quote = quotes.filter(q => q.content.length < 100).pop()
      this.quote = quote.content
      this.author = quote.title
    },
    resizeCanvas() {
      return this.canvas.width = this.canvas.parentElement.offsetWidth ;
    },
    resize() {
      this.h = window.innerHeight - 75
      this.canvas.width = this.w
      this.canvas.height = this.h
      return this.w
    },
    debounce(fn, ms = 0) {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
      }
    },
    sqr(a) { return a * a },
    distance(pt1, pt2) {
      return Math.sqrt(this.sqr(pt2.y - pt1.y) + this.sqr(pt2.x - pt1.x));
    },
    seed(density = 50) {
      density = 100 - density
      density = 10000
      density = (this.w * this.h) / (density);
      this.particles = Array(Math.floor(density)).fill('').map(()=> new Particle(null, null, null, this.ctx))
    },
    drawStars() {
      this.particles.map((particle,i) => {
        const windowX = window.innerWidth
        const windowY = window.innerHeight
        if ((particle.x > 0 && particle.x < windowX) && (particle.y > 0 && particle.y < windowY)) 
          particle.move();
        else {
          this.particles.splice(i, 1);
          this.particles.push(new Particle(null, null, null, this.ctx))
        }
      });
      for (let i = 0; i < this.particles.length / 2; i++) {
        const particle1 = this.particles[i];
        for (let j = 0; j < this.particles.length; j++) {
          const particle2 = this.particles[j];
          const distance = this.distance(particle1, particle2);
          if(distance < this.distanceLink) {
            this.ctx.strokeStyle = `rgba(${this.color},${1 - distance/this.distanceLink} )`
            this.ctx.beginPath();
            this.ctx.moveTo(particle1.x, particle1.y);
            this.ctx.lineTo(particle2.x, particle2.y)
            this.ctx.stroke()
          }
        }
      } 
    },
    draw() {
      this.frames++
      this.speed = this.frames / 500;
    
      // ctx.clearRect(0, 0, w, h);
      this.canvas.width = this.w
      this.drawStars()
      
      this.drawSine((x, frequency, speed, amplitude) => {
        return Math.sin(x * frequency + speed *2) * amplitude / 4
      }, 60, this.color1, this.color2)
      this.drawSine((x, frequency, speed, amplitude) => {
        return Math.sin(x * frequency + speed * 5) * amplitude / 3
      }, 30, this.color3, this.color4)
      this.drawSine((x, frequency, speed, amplitude) => {
        return Math.sin(x * frequency + speed *10) * amplitude / 3
      }, 0, this.color5, this.color6)
      window.requestAnimationFrame(this.draw);
    },
    drawSine(yFun, offset = 40, color, fillColor) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = fillColor;
      this.ctx.fillStyle = color;
      this.ctx.moveTo(0, this.h);
      for (let x = 0; x < this.w; x++) {
        this.y = yFun(x, this.frequency, this.speed, this.amplitude)
        this.ctx.lineTo(x, this.y + this.h -100 - offset);
      }
      this.ctx.lineTo(this.w, this.h);
      this.ctx.lineTo(0, this.h);
      this.ctx.stroke();
      this.ctx.fill()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .jumbo {
    height: calc(100vh - 75px);
    background-color: #033142;
    display: flex;
    justify-content: center;
    align-items: center;
    canvas {
      position: absolute;
    }
    .label {
      z-index: 1;
      text-align: center;
      text-shadow: 5px 5px 23px #000000;
      color: white;
      margin-bottom: 10%;
      font-size: 3.5em;
      width: 75%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .author {
        text-align: end;
        justify-self: flex-end;
        align-self: flex-end;
        font-size: 0.5em;
        font-style: italic;
        text-decoration: underline;
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 3em;
    color: white;
    text-shadow: 5px 5px 23px #000000;
    animation-name: bounce;
    animation-duration: 10000ms;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    height: 1.5em;
  }
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  @keyframes bounce {
    0% {
      transform: translateY(0)
    }
    80% {
      transform: translateY(0)
    }
    90% {
      transform: translateY(10px)
    }
    100% {
      transform: translateY(0)
    }
  }

@media (max-width: 800px) {
  .jumbo .label {
    font-size: 2em;
  }
}
</style>

