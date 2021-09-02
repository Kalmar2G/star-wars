<template>
  <tr class="table-row" @click="openPerson">
    <td class="table-row__data"><span>{{ person.id }}</span></td>
    <td class="table-row__data">
        <span v-for="(word, index) in splitName"
              :key="index">
          <strong v-if="index < 2">
            <span>{{ word }}</span>
          </strong>
          <span v-else>...</span>
        </span>
    </td>
    <td class="table-row__data"
        style="overflow:hidden; white-space:nowrap;text-overflow: ellipsis;">
      <span>{{ person.gender }}</span>
    </td>
    <td class="table-row__data"><span>{{ person.height }}</span></td>
    <td class="table-row__data"><span>{{ person.mass }}</span></td>
    <td class="table-row__data"><span>{{ person.eye_color }}</span></td>
  </tr>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.name = `${this.person.name}`;
  },
  data: () => ({
    name: '',
  }),
  methods: {
    openPerson() {
      this.$emit('openPerson', this.person);
    },
  },
  computed: {
    splitName() {
      return this.name.split(' ');
    },
  },
};
</script>

<style scoped>
.table-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 5px 0;
  cursor: pointer;
}

.table-row__data {
  flex: 1 1 20%;
  text-align: center;
}
</style>
