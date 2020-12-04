<template>
 <div>
  <div class="project-list-filter-global-container" @click="onToggle">
   <h1 class="project-list-filter-title">{{ formattedTitle }}</h1>
   <div class="project-list-filter-toggle">
    <img class="project-list-filter-toggle-icon" :src="toggleText">
   </div>
  </div>
  <div
   class="project-list-filter-items-global-container"
   v-if="toggleText === '/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-less-accordeon-open-hover.png'"
  >
   <div class="search-container">
    <label>
     <input
      ref="filtersearch"
      autocomplete="off"
      type="search"
      v-model="searchValue"
      class="form-control"
      :placeholder="searchLabel"
      name="search"
      @input="changeCurrentSearchValues"
     >
    </label>
   </div>
   <div
    class="project-list-filter-applied-clear-all"
    @click="clearSelectedValues"
   >{{ clearalllabel }}</div>
   <div
    :class="{ 'project-list-filter-items scrollable' : currentSearchedValues.length > 7 , 'project-list-filter-items' : currentSearchedValues.length < 8  }"
   >
    <div class="form-check" v-for="value of currentSearchedValues">
     <input
      type="checkbox"
      class="form-check-input"
      :name="value.name"
      :id="value.name"
      :value="value.code"
     >
     <label
      :for="value.name"
      :class="{ 'form-check-label active' : value.selected , 'form-check-label' : !value.selected }"
     >
      {{
      value.name
      }}
     </label>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
export default {
 name: "ProductFilter",
 data() {
  return {
   toggleText:
    "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-plus-accordeon-hover@3x.png",
   selectedValues: (this.selectedValues = this.values
    .filter(value => value.selected)
    .map(v => v.code)),
   currentSearchedValues: this.values,
   searchValue: ""
  };
 },
 created() {
  this.$emit("updateQuery", this.title, this.selectedValues, true);
  // open the toggle when items selected
  let open =
   "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-less-accordeon-open-hover.png";
  let close =
   "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-plus-accordeon-hover@3x.png";
  this.toggleText = this.selectedValues.length > 0 ? open : close;
 },
 computed: {
  formattedTitle() {
   let title = this.title;
   let renderedTitle = this.filterlabelarray[title];
   let fallbackTitle = this.title[0].toUpperCase() + this.title.substr(1);
   let formattedTitle = renderedTitle ? renderedTitle : fallbackTitle;
   return formattedTitle;
  },
  searchLabel() {
   let title = this.title;
   let renderedTitle = this.searchlabel + " " + this.filterlabelarray[title];
   let fallbackTitle =
    this.searchlabel + " " + this.title[0].toUpperCase() + this.title.substr(1);
   let searchLabel = renderedTitle ? renderedTitle : fallbackTitle;
   return searchLabel;
  }
 },
 watch: {
  selectedValues(values) {
   this.$emit("updateQuery", this.title, values);
  },
  values(values) {
   this.selectedValues = this.values
    .filter(value => value.selected)
    .map(v => v.code);
  }
 },

 methods: {
  onToggle() {
   this.toggleText =
    this.toggleText ===
    "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-plus-accordeon-hover@3x.png"
     ? "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-less-accordeon-open-hover.png"
     : "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-plus-accordeon-hover@3x.png";
  },
  clearSelectedValues() {
   this.selectedValues.length > 0 ? (this.selectedValues = []) : "";
   if (this.searchValue.length > 0) {
    this.searchValue = "";
    this.currentSearchedValues = this.values;
   } else {
    return;
   }
  },
  changeCurrentSearchValues(e) {
   this.currentSearchedValues = this.values.filter(v =>
    v.name.toLowerCase().includes(e.target.value.toLowerCase())
   );
  }
 },
 props: {
  title: String,
  values: Array, // values to filter based on them
  clearalllabel: String,
  searchlabel: String,
  filterlabelarray: Object
 }
};
</script>
