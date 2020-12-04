<template>
 <div class="project-list-applied-filters">
  <div class="project-list-applied-filter-container">
   <h1
    class="project-list-applied-filter-title"
   >{{ appliedfilterslabel }} ({{ appliedFiltersCount }})</h1>
   <!-- <div class="project-list-filter-applied-clear-all" @click="clearAppliedFilters">
				Clear all
   </div>-->
  </div>
  <div class="applied-filter-badge-container">
   <div v-for="filter of appliedFilters" :key="filter.name">
    <div v-bind:class="getClass(filter.filter)">
     <span class="filter-name">{{ filter.name }}</span>
     <span class="remove-applied-filter-container" @click="clearFilter(filter)">
      <img
       class="remove-applied-filter"
       src="/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons - cross grey (filter)@3x.png"
      >
     </span>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
export default {
 name: "AppliedFilters",
 data() {
  return {
   currentAppliedFilters: this.appliedFilters.map(f => f.code)
  };
 },
 created() {
  /*
		this.$emit(
			'updateAppliedFilterQuery',
			this.currentAppliedFilters,
			true,
		); */
 },
 computed: {
  appliedFiltersCount() {
   return this.appliedFilters.length !== 0 ? this.appliedFilters.length - 1 : 0; // once we do clear all remove -1
  }
 },
 methods: {
  getClass(filter) {
   return filter === "region" ? "d-none" : "applied-filter-badge";
  },
  clearAppliedFilters() {
   this.$emit("clearAllSelectedFilters");
  },
  clearFilter(selectedValue) {
   this.$emit("clearSelectedFilter", selectedValue);
  }
 },
 watch: {
  currentAppliedFilters(values) {
   // this.$emit('updateAppliedFilterQuery', values);
  }
 },

 props: {
  appliedFilters: Array,
  appliedfilterslabel: String
 }
};
</script>

