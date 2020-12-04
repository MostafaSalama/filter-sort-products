<template>
 <div class="project-listing-inactive-project-filter-container">
  <div class="custom-control custom-switch">
   <input type="checkbox" class="custom-control-input" id="customSwitchRef" v-model.lazy="checked">
   <label
    class="custom-control-label inactive-project-filter-label"
    for="customSwitchRef"
   >Hide projects with discontinued projects</label>
  </div>
 </div>
</template>

<script>
export default {
 name: "InActiveProjectsFilter",
 data() {
  return {
   checked: this.hideInActiveProjects
  };
 },
 created() {
  this.$emit("updateInActiveQuery", this.checked, true);
 },
 watch: {
  checked(value) {
   this.$emit("updateInActiveQuery", value);
  }
 },
 props: {
  hideInActiveProjects: Boolean
 }
};
</script>
