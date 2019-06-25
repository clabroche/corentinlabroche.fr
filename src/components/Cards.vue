<template>
  <div class="section" v-if="projects.length">
    <h2>{{header}}</h2>
    <div class="cards">
      <card 
        v-for="project of projects" :key="project.header"
        :project="project"
      />
    </div>
  </div>
</template>

<script>
import CardVue from './Card.vue';
export default {
  name: 'HelloWorld',
  props: {
    header: String,
    projects: {default: []}
  },
  components: {
    card: CardVue,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.section {
  display: flex;
  padding: 40px;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  h2 {
    margin-top: 0;
    width: 100%;
    font-weight: normal;
    font-size: 2em;
    margin-bottom: 20px;
  }
  .cards {
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: 290px;
  }
}
</style>
