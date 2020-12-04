<template>
 <div class>
  <div class="row">
   <aem-project-card
    :resultnotfound="resultnotfound"
    :isLoading="isLoading"
    v-for="project of projects"
    v-bind="project"
    :key="project.id"
   ></aem-project-card>
  </div>
 </div>
</template>

<script>
import Product from "@/components/Product";
export default {
 name: "ProductList",
 components: { aemProjectCard: Product },
 props: {
  projects: Array,
  isLoading: Boolean,
  resultnotfound: String
 }
};
</script>
 
