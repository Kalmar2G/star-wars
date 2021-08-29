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
  min-height: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header__picture {
  width: 1200px;
}

.menu {
  width: 100%;
}

.main {
  max-width: 1200px;
  width: 1200px !important;
  flex: 1 1 auto;
  margin: 0 auto;
  padding: 0;
}

.footer {
  height: 35px;
  background: black;
  width: 1200px;
  border: 2px solid #ebe302;
}

.footer__info {
  margin: 4px;
}

@media screen and (max-width: 2000px) {
  .header__picture {
    width: 1200px;
  }

  .main {
    width: 1200px !important;
  }

  .footer {
    width: 1200px;
  }
}

@media screen and (max-width: 1200px) {
  .header__picture {
    width: 800px;
  }

  .main {
    width: 800px !important;
  }

  .footer {
    width: 800px;
  }
}

@media screen and (max-width: 900px) {
  * {
    font-size: 10px !important;
  }

  .header__picture {
    width: 500px;
  }

  .main {
    width: 500px !important;
  }

  .footer {
    width: 500px;
  }
}
</style>
