<template>
  <tr class="table-row" @click="openPerson">
    <td class="table-row__data"><span>{{ starship.id }}</span></td>
    <td class="table-row__data" style="font-size: 12px"><span><strong>
      {{ starship.name }}</strong></span></td>
    <td class="table-row__data" style="font-size: 10px"><span>{{ starship.model }}</span></td>
    <td class="table-row__data"><span>{{ starship.max_atmosphering_speed }}</span></td>
    <td class="table-row__data"><span>{{ starship.length }}</span></td>
    <td class="table-row__data" style="font-size: 12px"><span>{{ starship.cost_in_credits }}</span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    starship: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPerson() {
      this.$emit('openStarship', this.starship);
    },
  },
};
</script>

<style scoped>
.table-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 5px 0;
  cursor: pointer;
}

.table-row__data {
  flex: 1 1 20%;
  text-align: center;
}
</style>
