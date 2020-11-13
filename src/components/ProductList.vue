<template>
  <div class="products-list">
    <Product v-for="product of products" :key="product.id" v-bind="product" />
  </div>
</template>

<script>
import Product from "@/components/Product";
export default {
  name: "ProductList",
  components: {Product},
  props: {
    products: Array
  }
}
</script>

<style scoped>
.products-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
