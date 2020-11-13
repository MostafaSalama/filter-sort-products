<template>
  <div id="app">
    <ProductsContainer/>
  </div>
</template>

<script>

import ProductsContainer from "@/components/ProductsContainer";
export default {
  name: 'App',
  components: {
    ProductsContainer
  }
}
</script>

<style>
/*global style*/
body {
  background-color: #e7e9e9;
}
</style>
