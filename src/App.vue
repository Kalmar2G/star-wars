<template>
  <v-app :style="{ background: color }">
    <div class="content-wrapper">
      <header class="header">
        <img src="./assets/header.png" alt="" class="header__picture">
      </header>
      <button class="button-background-toggle"
              @click="color === 'white' ? color = 'black' : color = 'white'">
        <img class="button-background-toggle__picture" src="./assets/lamp.png"
             alt="потерялся котенок">
      </button>
      <nav class="menu">
        <Navbar/>
      </nav>
      <main class="main">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </main>
      <footer class="footer">
        <p class="footer__info">kalmar2g 2021 </p>
      </footer>
    </div>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => ({
    color: 'white',
  }),
};
</script>

<style>
* {
  opacity: 0.99;
  font-family: 'Bungee Inline', cursive;
  color: black;
  text-shadow: #ebe302 1px 1px 0, #ebe302 -1px -1px 0,
  #ebe302 -1px 1px 0, #ebe302 1px -1px 0;
}

.content-wrapper {
  height: 100%;
  margin: 0 auto;
  text-align: center;
  width: 75%;
  min-width: 690px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
}

.header {
  width: 100%;
}

.header__picture {
  width: 100%;
  height: 200px;
  min-width: 300px;
  max-width: 1000px;
}

.menu {
  width: 100%;
  min-width: 300px;
  max-width: 1000px;
}

.main {
  flex: 1 1 auto;
  margin: 0;
  padding: 0;
}

.footer {
  height: 35px;
  background: black;
  width: 100%;
  min-width: 300px;
  max-width: 1000px;
  border: 2px solid #ebe302;
}

.footer__info {
  margin: 4px;
}
</style>
