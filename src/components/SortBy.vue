<template>
 <v-select
  :clearable="false"
  :searchable="false"
  label="name"
  :options="sortValues"
  :reduce="(f) => f.code"
  v-model="selectedSort"
 ></v-select>
</template>

<script>
export default {
 name: "SortBy",
 data() {
  return {
   selectedSort: this.sortValues.filter(value => value.selected)[0].code
  };
 },
 created() {
  this.$emit("updateSortQuery", this.selectedSort, true);
 },
 watch: {
  selectedSort(value) {
   this.$emit("updateSortQuery", value);
  },
  sortValues(values) {
   this.selectedSort = values.filter(value => value.selected)[0].code;
  }
 },
 props: {
  sortBy: String,
  sortValues: Array
 }
};
</script>

