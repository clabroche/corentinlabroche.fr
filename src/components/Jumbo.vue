<template>
  <div class="jumbo">
    <canvas ref="canvas"></canvas>
    <transition name="slide-fade">
      <component :is="components[activeComponentIndex].name"></component>
    </transition>
    <i class="fas fa-chevron-down bottom"></i>
  </div>
</template>

<script>
import Particles from './JumboComponents/backgrounds/Particles'
import Waves from './JumboComponents/backgrounds/Waves'
import WelcomeVue from './JumboComponents/Welcome.vue'
import WeatherVue from './JumboComponents/Weather.vue'
// import fps from './FPS'
export default {
  name: 'Home',
  components: {
    'welcome': WelcomeVue,
    'weather': WeatherVue
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      h: null,
      w: null,
      frames: 0,
      quote: '',
      author: '',
      particles: null,
      components: [
        {name: 'welcome', duration: 2000, onlyOnce: true},  
        {name: 'weather', duration: 10000},  
      ],
      activeComponentIndex: 0
    }
  },
  async mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas()
    window.addEventListener('resize', this.debounce(() => {
      this.resizeCanvas()
    }, 250))
    this.particles = new Particles(this.canvas)
    this.waves = new Waves(this.canvas)
    this.resize()
    this.particles.seed()
    this.draw()
    this.carousel()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    // async getQuote() {
    //   const {data: quotes} = await axios.get('https://quotesondesign.com/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=30&callback=&bogusQSvar=' + Math.random())
    //   const quote = this.findValidQuote(quotes)
    //   if(!quote) {
    //     return this.getQuote()
    //   }
    //   this.quote = quote.content.rendered
    //   this.author = quote.title.rendered
    // },
    carousel() {
      setTimeout(() => {
        this.activeComponentIndex = this.activeComponentIndex >= this.components.length - 1
          ? 1
          : this.activeComponentIndex + 1
        this.carousel()
      }, this.components[this.activeComponentIndex].duration);
    },
    resizeCanvas() {
      this.canvas.width = this.canvas.parentElement.offsetWidth ;
    },
    resize() {
      this.canvas.height = window.innerHeight - 75
      return this.canvas.width
    },
    findValidQuote(quotes) {
      const quoteIndex = Math.floor(Math.random() * quotes.length -1)
      const quote = quotes[quoteIndex]
      if(!quote || !quote.content || !quote.content.rendered || quote.content.rendered.length > 100) {
        quotes.splice(quoteIndex, 1)
        return this.findValidQuote(quotes)
      }
      return quote
    },
    debounce(fn, ms = 0) {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
      }
    },
    draw() {
      // fps.begin()
      this.frames++
      this.speed = this.frames / 500;
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
      this.particles.drawStars()
      this.waves.drawSines(this.frames / 500)
      // fps.end()
      window.requestAnimationFrame(this.draw);
    },
    
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
      position: absolute;
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

