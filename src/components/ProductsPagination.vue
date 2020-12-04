<template>
 <div class>
  <paginate
   v-model="selectedPage"
   :page-count="totalPages"
   container-class="pagination"
   page-class="page-item"
   page-link-class="page-link"
   prev-class="page-item"
   next-class="page-item"
   prev-link-class="pagination-prev-link"
   next-link-class="pagination-next-link"
   prev-text="<div class='pagination-arrow-container'> <img class='pagination-prev-arrow' src='/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-arrow-left@3x.png'/> </div>"
   next-text="<div class='pagination-arrow-container'> <img class='pagination-next-arrow' src='/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-arrow-right@3x.png'/> </div>"
   :click-handler="updatePageprojects"
  />
 </div>
</template>

<script>
export default {
 name: "ProductsPagination",
 data() {
  return {
   selectedPage: this.currentPage
  };
 },
 created() {
  this.$emit("updatePageQuery", this.selectedPage, true);
 },
 watch: {
  selectedPage(value) {
   this.$emit("updatePageQuery", value);
  }
 },
 props: {
  currentPage: Number,
  firstPage: Number,
  prevPage: Number,
  nextPage: Number,
  pageSize: Number,
  totalPages: {
   type: Number,
   default: 1
  }
 },
 methods: {
  updatePageprojects() {}
 }
};
</script>
