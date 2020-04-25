<template>
  <div class="card">
    <div class="imgs">
      <img :src="require('@/assets/' +project.img)" alt="">
    </div>
    <div class="container">
      <div class="title">
          {{project.header}}
      </div>
      <div class="description">
          {{project.description}}
      </div>
      <div class="links" >
          <a v-for="(link, i) of project.links " :key="link.type+''+i" target="_blank" :href="link.url">
            <i :class="{
              'fab fa-github': link.type === 'github',
              'fab fa-npm': link.type === 'npm',
              'fab fa-android': link.type === 'android',
              'fas fa-globe': link.type === 'globe',
            }"></i>
          </a>
        </div>
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
  display: flex;
  background-color: #fff;
  margin: 20px 0;
  box-shadow: 0px 0px 8px 6px #cecece;
  flex-shrink: 0;
  width:  100%;;
  height: 250px;
  transition: 300ms;
  border-radius: 10px;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  &:hover {
    transform: scale(1.01)
  }
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    
  }
  .title {
    background-color: white;
    width: 100%;
    height: 50px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
  }
  .imgs {
    box-shadow: 0px 0px 22px 3px #272727 inset;
    width: 400px;
    height: 100%;
    object-fit: cover;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      border: 100px solid #002b3bc2;
      left: 0;
      bottom: 0;
      width: 100%;
      height: calc(100% - 50px);
      box-sizing: border-box;
      border-top-color: transparent;
      border-left-color: transparent;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-fit: cover;
  }
  .description {
    text-align: center;
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
    background-color: #002b3bc2;
    transition: 300ms;
  }
  .links {
    height: 50px;
    width: 100%;
    background-color: #002b3bc2;
    top: 200px;
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
}

@media (max-width: 800px) {
  .card {
    height: 300px;
    .container {
      position: absolute;
    }
    .title {
      background-color: #002b3bc2;
      font-size: 1.2em;
      height: 50px;
      color: white;
      z-index: 100;
    }
    .imgs {
      width: 100%;
      &::after {
        border-width: 150px;
      }
    }
  }
}
</style>
