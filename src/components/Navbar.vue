<template>
  <div id="navbar">
    <div class="left">
      <div id="logo" class="item">
        Corentin Labroche
      </div>
    </div>
    <div class="right">
      <div class="item">
        <a target="_blank" href="https://github.com/clabroche/">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <div class="item">
        <a target="_blank" href="https://www.npmjs.com/~iryu54/">
          <i class="fab fa-npm"></i>
        </a>
      </div>
      <div class="item">
        <a target="_blank" href="mailto:corentinlabroche@gmail.com">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#navbar {
  box-sizing: border-box;
  box-shadow: 0px 4px 11px -5px black;
  color: white;
  background-color: #004158;
  height: 75px;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  justify-content: space-between;
  a {
    color: white;
  }
}
#navbar .left {
  margin-left: 10px;
}

#navbar .right {
  display: flex;
  .item {
    margin: 10px;
    cursor: pointer;
    transition: 300ms;
    font-size: 1.5em;
    &:hover {
      transform: scale(1.2)
    }

  }
}
@media (max-width: 800px) {
  #navbar .right .item {
    font-size: 1em;
  }
}
</style>
