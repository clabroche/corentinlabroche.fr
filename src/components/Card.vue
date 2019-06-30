<template>
  <div class="card">
    <div class="imgs">
      <img :src="require('@/assets/' +project.img)" alt="">
    </div>
    <div class="title">
        {{project.header}}
    </div>
    <div class="links" >
        <a v-for="link of project.links " :key="link.type" target="_blank" :href="link.url">
          <i :class="{
            'fab fa-github': link.type === 'github',
            'fab fa-npm': link.type === 'npm',
            'fab fa-android': link.type === 'android',
            'fas fa-globe': link.type === 'globe',
          }"></i>
        </a>
      </div>
    <div class="description">
        {{project.description}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    project: {default: () => ({})},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.card {
  margin-left: 20px;
  box-shadow: 0px 0px 3px 0px #767676 ;
  flex-shrink: 0;
  width:  250px;
  height: 250px;
  overflow: hidden;
  position: relative;
  transition: 300ms;
  border-radius: 10px;
  &:hover {
    transform: scale(1.1)
  }
  .title {
    position: absolute;
    background-color: white;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imgs {
    box-shadow: 0px 0px 22px 3px #272727 inset;
    width: 250px;
    height: 200px;
  }
  img {
    width: 250px;
    height: 200px;
    object-fit: cover;
  }
  .description {
    text-align: center;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 200px;
    width: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.8);
    transition: 300ms;
  }
  &:hover .description {
    opacity: 1;
  }
  .links {
    position: absolute;
    height: 50px;
    width: 100%;
    background-color: rgba(0,0,0,0.8);
    top: 200px;
    opacity: 0;
    transition: 800ms;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .links a{
    color: white;
    font-size: 2em;
    transition: 300ms;
    margin: 10px;
    height: 50px;
  }
  .links a:hover {
    transform: scale(1.1)
  }
  &:hover .links {
    opacity: 1;
  }
}
</style>
