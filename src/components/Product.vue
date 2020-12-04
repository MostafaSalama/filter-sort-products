<template>
 <div
  v-if="!highlighted"
  class="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 project-item-wrapper-grid-4"
 >
  <div class="project-item-container">
   <div class="project-item-image-container">
    <aem-shimmer-effect v-if="isLoading" height="169px" width="100%"/>
    <a v-else :href="url">
     <img :src="image" class="project-item-image" :alt="title">
    </a>
   </div>
   <div class="project-item-text-container">
    <div class>
     <aem-shimmer-effect v-if="isLoading" height="25px" width="100%" :roundedborder="true"/>
     <a v-else :href="url">
      <h2 class="project-item-title">{{ formatedTitle }}</h2>
     </a>
    </div>
    <div class>
     <aem-shimmer-effect v-if="isLoading" height="10px" width="100%" :roundedborder="true"/>
     <p v-else class="project-item-description">{{ formatedDescription }}</p>
    </div>
    <div class>
     <aem-shimmer-effect v-if="isLoading" height="10px" width="100%" :roundedborder="true"/>
     <p v-else class="project-item-city">{{ formatedCountry }}, {{ formatedCity }}</p>
    </div>
   </div>
  </div>
 </div>
 <div
  v-else-if="highlighted"
  class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 project-item-wrapper-grid-12"
 >
  <div class="project-item-landscape-container">
   <div
    class="column project-item-landscape-image-container col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 project-item-wrapper-grid-6 padding-reset-left-right"
   >
    <aem-shimmer-effect v-if="isLoading" height="220px" width="100%"/>
    <a v-else :href="url">
     <img :src="image" class="project-item-image" :alt="title">
    </a>
   </div>
   <div
    class="column project-item-text-container col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 project-item-wrapper-grid-6"
   >
    <div class>
     <aem-shimmer-effect v-if="isLoading" height="25px" width="100%" :roundedborder="true"/>
     <a v-else :href="url">
      <h2 class="project-item-title">{{ formatedTitle }}</h2>
     </a>
    </div>
    <div class>
     <aem-shimmer-effect v-if="isLoading" height="10px" width="100%" :roundedborder="true"/>
     <p v-else class="project-item-description">{{ formatedDescription }}</p>
    </div>
    <div class>
     <aem-shimmer-effect v-if="isLoading" height="10px" width="100%" :roundedborder="true"/>
     <p v-else class="project-item-city">{{ formatedCountry }}, {{ formatedCity }}</p>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
import shimmerEffect from "@/components/ShimmerEffect";
export default {
 name: "Product",
 props: {
  title: String,
  description: String,
  image: String,
  city: String,
  country: String,
  url: String,
  highlighted: Boolean,
  isLoading: Boolean,
  resultnotfound: String
 },
 components: {
  aemShimmerEffect: shimmerEffect
 },
 computed: {
  formatedTitle() {
   return this.title ? this.title : "";
  },
  formatedDescription() {
   return this.description
    ? this.description.substr(0, 80)
    : this.resultnotfound;
  },
  formatedCity() {
   return this.city ? this.city : "";
  },
  formatedCountry() {
   return this.country ? this.country : "";
  }
 }
};
</script>

 