<template>
  <v-app>
    <div class="wrapper" :style="{ background: color }">
      <div class="content-wrapper">
        <div class="header__logo">
          <img src="./assets/header.png" alt="" class="header__logo-img">
        </div>
        <button class="background-toggle"
                @click="color === 'white' ? color = 'black' : color = 'white'" >
          <img src="./assets/lamp.png" width="50px" height="50px" alt="">
        </button>
        <Navbar/>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
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
  margin: 0 auto;
  text-align: center;
  width: 75%;
  min-width: 690px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header__logo {
  min-width: 100%;
  padding: 10px;
}
.header__logo-img {
  min-width: 100%;
  height: 200px;
}
</style>
