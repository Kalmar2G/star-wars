<template>
  <div class="main-page">
    <img class="main-page__picture" src="../assets/mainBackground.jpg" alt="фоточка потерялась">
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main-page {
  width: 1200px;
  margin: 0 auto;
}

.main-page__picture {
  width: 1200px;
}

@media screen and (max-width: 2000px) {
  .main-page {
    width: 1200px;
  }

  .main-page__picture {
    width: 1200px;
  }
}

@media screen and (max-width: 1200px) {
  .main-page {
    width: 800px;
  }

  .main-page__picture {
    width: 800px;
  }
}

@media screen and (max-width: 900px) {
  .main-page {
    width: 500px;
  }

  .main-page__picture {
    width: 500px;
  }
}
</style>
