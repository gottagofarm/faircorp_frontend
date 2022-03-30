<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/Navbar.vue'
import WelcomePage from './components/WelcomePage.vue'
import WindowsList from './components/WindowsList.vue'
import WindowDetails from './components/WindowDetails.vue'
import RoomDetails from './components/RoomDetails.vue'
import WindowAdd from './components/WindowAdd.vue'
import RoomAdd from './components/RoomAdd.vue'

export default {
  name: 'App',
  components: {
    WelcomePage,
    WindowsList,
    NavBar,
    WindowDetails,
    RoomDetails,
    WindowAdd,
    RoomAdd
  }
}
</script>

<style>
#app {
  font-family: copperplate, fantasy, Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-weight: lighter;
  font-size: 120%;
}
body {
  margin-top:30px;
  margin-right: 10%;
  margin-left: 10%;
  background-image: url(https://i.pinimg.com/originals/a7/64/67/a764671d012a974456bd70ea13f9e856.jpg);
  
  background-size: cover;
}
</style>
