<template>
  <div id="app">
    <div class="container">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/tablefilter">Table filter learning |</router-link>
        <router-link to="/pagidemo">Pagination demo |</router-link>
        <router-link to="/directivedemo">Directive demo |</router-link>
      </div>
      <router-view />
    </div>
    
  </div>
</template>

<script>
import { Header } from '@/components/Shared/'

export default {
  components: { Header }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
