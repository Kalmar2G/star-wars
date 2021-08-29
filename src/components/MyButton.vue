<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.my-button {
  border: 2px solid #ebe302;
  font-size: 15px;
  min-width: 150px;
  height: 50px;
  margin-top: 3px;
  border-radius: 10px;
  background: black;
  color: black;
  cursor: pointer;
}

.my-button:hover {
  border: 3px solid black;
  background: #ebe302;
  transition: background 300ms linear;
}
</style>
