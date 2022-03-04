<template>
  <div id="app">
    <navbar></navbar>
    <div class="main-container">
      <jumbo></jumbo>

      <div class="section header">
        <h2>Mes Skills</h2>
      </div>
      <div class="section header">
        <skills></skills>
      </div>

      <div class="section header">
        <h2>Mes projets</h2>
        <input class="filter" type="text" v-model="filterData" @focusin="scroll" @input="scroll" ref="inputRef" placeholder="Filtrer...">
      </div>

      <div class="categories section">
        <div class="category" :class="{active: !currentCategory}" @click="currentCategory = null; scroll()">
          <div>Tous</div>
        </div>
        <div class="category" :class="{active: currentCategory === category.id}" @click="currentCategory = category.id; scroll()" v-for="category of categories" :key="category.label" :header="category.label">
          <span>{{category.nb}}</span>
          <div>{{category.label}}</div>
        </div>
      </div>
      <div class="section projects">
        <cards v-for="project of projects" :key="project.label" :header="project.label" :projects="project.values"/>
        <div v-show="noResult" key="noResult" class="section no-result">
          Je n'ai pas encore fait de projet concernant cette recherche. <br>
          Peut-être bientôt !
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Jumbo from './components/Jumbo.vue';
import Cards from './components/Cards.vue';
import { computed, ref } from 'vue';
import allProjects from './services/projects'
import Skills from './components/Skills.vue'
const filterData = ref('')
const filter = (projects) => {
  return projects.filter(p => filterData.value ? p.header.toUpperCase().includes(filterData.value.toUpperCase()) : true)
}

const inputRef = ref()
const scroll = () => {
  document.querySelector('.main-container').scrollTo({top: inputRef.value.offsetTop - 100, behavior: "smooth"})
}
const currentCategory = ref()

const projects = computed(() => {
  const filteredProjects = Object.keys(allProjects)
    .map(key => ({...allProjects[key], id: key}))
    .filter(project => currentCategory.value ? project.id === currentCategory.value : true)
    .sort((a,b) => a.label.localeCompare(b.label))
  
  return filteredProjects.reduce((projects, project) => {
    project.values = filter(project.values)
    return projects
  },filteredProjects)
})
const categories = computed(() => Object.keys(allProjects)
    .map(key => ({...allProjects[key], id: key, nb: projects.value.find(a => a.id === key)?.values?.length || 0}))
    .sort((a,b) => a.label.localeCompare(b.label)))
const noResult = computed(() => !projects.value.length)
</script>

<style lang="scss">
@import url('./assets/font/jost.css');

:root {
  --accent-color: #245c64;
  --accent-color-light: #3b7b85;
  --accent-color-lighter: #6aa9b3;
  --accent-color-transparent: #03434ddd;
}
body {
  display: inherit;
}
.main-container {
  height: 100vh;
  overflow-y: auto;
  position: relative;
}
/* width */
::-webkit-scrollbar {
  width: 11px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.5);
}
.section {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 90%;
  max-width: 1300px;
  margin: auto;
  padding-bottom: 0;
  box-sizing: border-box;
  margin: 40px auto;

}
.projects{
  min-height: calc(100vh - 150px);
  margin-bottom: 100px;
  gap: 80px;
}
.header {
  align-items: center;
}
.categories {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  .category {
    border: 1px solid white;
    width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    position: relative;
    span {
      background-color: #fff;
      color: var(--accent-color);
      width: 40px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      flex-shrink: 0;
      text-align: center;
      width: 25px;
      height: 25px;
      margin-left: 5px;
      border-radius: 50%;
      font-size: 0.8em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div {
      padding: 5px 5px;
      overflow: hidden;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex-grow: 1;
    }
    &.active {
      background-color: #fff;
      color: var(--accent-color);
      span {
        background-color: var(--accent-color);
        color: white;
      }
    }
  }
}
.no-result {
  font-size: 2em;
  text-align: center;
  justify-content: center;
  margin-top: 140px;
  margin-bottom: 140px;
}
.filter {
  width: 200px;
  height: auto;
  margin-left: auto;
  display: inherit;
  padding: 10px 20px;
  border-radius: 10px;
  outline: none;
}
h2 {
  font-size: 3em;
  margin: 0;
}
.search-enter-active,
.search-leave-active {
  transition: all 0.5s ease;
}
.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 800px) {
  .section {
    width: 100%;
    padding: 20px;
    padding-bottom: 0;
  }
}
</style>
