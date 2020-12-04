<template>
 <div>
  <div class="project-list-filter-global-container" @click="onToggle">
   <h1 class="project-list-filter-title">{{regionlabel}}</h1>
   <div class="project-list-filter-toggle">
    <img class="project-list-filter-toggle-icon" :src="toggleText">
   </div>
  </div>
  <div class="project-list-filter-items-global-container">
   <div
    v-if="toggleText === '/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-less-accordeon-open-hover.png'"
    :class="{'project-list-filter-items region-scrollable' : totalRegions.length > 7 , 'project-list-filter-items' : totalRegions.length < 8 }"
   >
    <div v-for="region of regions" :key="region.name" class="form-check">
     <input
      type="radio"
      :id="region.name"
      class="form-check-input"
      name="selectedRegion"
      :value="region.code"
      v-model="selectedRegion"
     >
     <label
      :for="region.name"
      :class="{ 'form-check-label active' : region.selected , 'form-check-label' : !region.selected }"
     >{{ region.name }}</label>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
export default {
 name: "RegionFilter",
 data() {
  return {
   toggleText:
    "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-plus-accordeon-hover@3x.png",
   selectedRegion: this.regions.filter(r => r.selected)[0]
    ? this.regions.filter(r => r.selected)[0].code
    : ""
  };
 },
 computed: {
  totalRegions() {
   return this.regions;
  }
 },
 created() {
  this.$emit("updateRegionQuery", this.selectedRegion, true);
  // open the toggle when items selected
  let open =
   "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-less-accordeon-open-hover.png";
  let close =
   "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons-plus-accordeon-hover@3x.png";
  this.toggleText = this.selectedRegion.length > 0 ? open : close;
 },
 watch: {
  selectedRegion(value) {
   this.$emit("updateRegionQuery", value);
  },
  regions() {
   const currentSelected = this.regions.filter(r => r.selected)[0];
   if (!currentSelected) return;
   const currentCode = currentSelected.code;
   if (currentCode !== this.selectedRegion) {
    this.selectedRegion = currentSelected;
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
  }
 },
 props: {
  regions: Array,
  regionlabel: String
 }
};
</script>

