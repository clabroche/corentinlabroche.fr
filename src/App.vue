<template>
  <div id="app">
    <navbar></navbar>
    <div class="main-container">
      <jumbo></jumbo>
      <input class="filter" type="text" v-model="filterData" @input="scroll" ref="input" placeholder="Filter...">
      <cards header="Fractals" :projects="fractalsProjectsFiltered"/>
      <cards header="CLI (Command Line Interface)" :projects="cliFiltered"/>
      <cards header="Mobile" :projects="mobileFiltered"/>
      <cards header="Games" :projects="gamesFiltered"/>
      <cards header="Web POC" :projects="webPOCFiltered"/>
    </div>
  </div>
</template>

<script>
import NavbarVue from './components/Navbar.vue';
import JumboVue from './components/Jumbo.vue';
import CardsVue from './components/Cards.vue';
export default {
  components: {
    navbar: NavbarVue,
    jumbo: JumboVue,
    cards: CardsVue,
  },
  computed: {
    fractalsProjectsFiltered() {
      return this.filter(this.fractalsProjects)
    },
    cliFiltered() {
      return this.filter(this.cli)
    },
    mobileFiltered() {
      return this.filter(this.mobile)
    },
    gamesFiltered() {
      return this.filter(this.games)
    },
    webPOCFiltered() {
      return this.filter(this.webPOC)
    },
  },
  data() {
    return {
      filterData: '',
      fractalsProjects: [
        {
          img: 'img/fern.png',
          header:'Barnsley fern',
          description:'The Barnsley fern is a fractal named after the British mathematician Michael Barnsley who first described it in his book Fractals Everywhere. He made it to resemble the black spleenwort, Asplenium adiantum-nigrum.',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/barnsleyFern'},
            {type: 'globe', url: 'https://clabroche.github.io/barnsleyFern'},
          ]
        }, {
          img: 'img/sierpinski.png',
          header:'Sierpiński triangle',
          description:'The Sierpinski triangle, is a fractal and attractive fixed set with the overall shape of an equilateral triangle, subdivided recursively into smaller equilateral triangles.',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/sierpinski'},
            {type: 'globe', url: 'https://clabroche.github.io/sierpinski'},
          ]
        }, {
          img: 'img/sandpile.png',
          header:'Abelian sandpile model',
          description:'This slope builds up as "grains of sand" are randomly placed onto the pile, until the slope exceeds a specific threshold value at which time that site collapses transferring sand into the adjacent sites, increasing their slope.',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/SandPile'},
          ]
        }
      ],
      cli: [
        {
          img: 'img/stackmonitor.png',
          header:'Stack monitor',
          description:'Monitor processes as a stack. You have just to mount a stack with a config and launch this package to monitor processes.',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/stack-monitor'},
            {type: 'npm', url: 'https://www.npmjs.com/package/@iryu54/stack-monitor'},
          ]
        }, {
          img: 'img/objectvalidity.png',
          header:'Object-validity',
          description:'Validate a JS object or json against a Schema',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/object-validity'},
            {type: 'npm', url: 'https://www.npmjs.com/package/@iryu54/object-validity'},
          ]
        }, {
          img: 'img/gitmanagerjs.png',
          header:'Gitmanagerjs',
          description:'This module aims to use git programmatically because the command line returns success in stderr.',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/GitManager.js'},
            {type: 'npm', url: 'https://www.npmjs.com/package/gitmanagerjs'},
          ]
        },  {
          img: 'img/pdffigureextractor.png',
          header:'Pdf-figure-extractor',
          description:'Extract figure from pdf without text in it',
          links: [
            {type: 'github', url: 'https://github.com/Inist-CNRS/pdf-figure-extractor'},
            {type: 'npm', url: 'https://www.npmjs.com/package/pdf-figure-extractor'},
          ]
        },  {
          img: 'img/fbterm.png',
          header:'Fbterm',
          description:'Use facebook messenger inside a terminal.',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/fbTerm'},
            {type: 'npm', url: 'https://www.npmjs.com/package/@iryu54/fbterm'},
          ]
        }, {
          img: 'img/nmsjs.png',
          header:'Nms-js',
          description:'Decrypt output from commands.',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/nms-js'},
            {type: 'npm', url: 'https://www.npmjs.com/package/@iryu54/nmsjs'},
          ]
        }, 
      ],
      games: [
        {
          img: 'img/minesweeper.png',
          header:'Minesweeper',
          description:'The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field.',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/minesweeper'},
            {type: 'globe', url: 'http://corentinlabroche.fr:9090/games'},
          ]
        }, {
          img: 'img/motsMeles.png',
          header:'MotsMeles',
          description:'Find all words in a grid full of letters.',
          links: [
            {type: 'github', url: 'https://clabroche.github.io/motsMeles/'},
            {type: 'globe', url: 'https://clabroche.github.io/motsMeles/'},
          ]
        }, 
      ],
      webPOC: [
        {
          img: 'img/particles.png',
          header:'Particle',
          description:'Display connected particles in a canvas. Need to be exported as library',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/particle'},
            {type: 'globe', url: 'https://clabroche.github.io/particle'},
          ]
        }, {
          img: 'img/rain.png',
          header:'Rain',
          description:'Display a falling down rain in canvas. Need to be exported as library',
          links: [
            {type: 'github', url: 'https://github.com/clabroche/rain'},
            {type: 'globe', url: 'https://clabroche.github.io/rain/'},
          ]
        },
      ],
      mobile: [
      ]
    }
  },
  methods: {
    scroll() {
      this.$refs.input.scrollIntoView({
            behavior: 'smooth',  block: "start"
        });
    },
    filter(projects) {
      return projects.filter(p => this.filterData ? p.header.toUpperCase().includes(this.filterData.toUpperCase()) : true)
    }
  }
}
</script>

<style lang="scss">
@import url('../node_modules/@fortawesome/fontawesome-free/css/all.min.css');
@import url('./assets/font/jost.css');
body {
  background-color: #f2f2f2;
  font-family: 'Jost';
  margin: 0;
  min-height: 100vh;
}
.main-container {
  height: calc(100vh - 75px);
  overflow-y: auto;
  position: relative;
}
.filter {
  width: 200px;
  margin-right: 40px;
  margin-top: 40px;
  margin-left: auto;
  display: inherit;
}
</style>
