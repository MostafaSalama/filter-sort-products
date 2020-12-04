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
   <div class="project-list-filter-items">
    <div class="v-select-wrapper">
     <v-select
      :clearable="showCrossButton"
      label="name"
      :options="values"
      :reduce="(f) => f.code"
      v-model="selected"
     ></v-select>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
export default {
 name: "FabricatorFilter",
 data() {
  return {
   toggleText:
    "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-plus-accordeon-hover@3x.png",
   selected: this.values.filter(value => value.selected)[0]
    ? this.values.filter(value => value.selected)[0].code
    : ""
  };
 },
 computed: {
  formattedTitle() {
   let title = this.title;
   let renderedTitle = this.filterlabelarray[title];
   let fallbackTitle = this.title[0].toUpperCase() + this.title.substr(1);
   let formattedTitle = renderedTitle ? renderedTitle : fallbackTitle;
   return formattedTitle;
  },
  showCrossButton() {
   return this.selected.length > 0 ? true : false;
  }
 },
 created() {
  this.$emit("updateFabricatorQuery", this.selected, true);
  // open the toggle when items selected
  let open =
   "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-less-accordeon-open-hover.png";
  let close =
   "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-plus-accordeon-hover@3x.png";
  this.toggleText = this.selected.length > 0 ? open : close;
 },
 watch: {
  selected(value) {
   this.$emit("updateFabricatorQuery", value ? value.code : "");
  },
  values(newValues) {
   const currentSelected = this.values.filter(r => r.selected)[0];
   if (!currentSelected) {
    this.selected = "";
    return;
   }
   const currentCode = currentSelected.code;
   if (currentCode !== this.selected) {
    this.selected = currentSelected;
   }
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
  clearSelectedValue() {
   this.selected = "";
  }
 },
 props: {
  title: String,
  values: Array, // values to filter based on them
  filterlabelarray: Object
 }
};
</script>
