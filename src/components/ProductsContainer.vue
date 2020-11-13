<template>
  <div class="products-container">
    <div class="container-fluid">
<!--      for applied filter and sort by and number of results-->
        <div class="row">
          <div class="row">
            <div class="col-md-10 col-12">
                <ProductList :products="[]" />
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
export default {
name: "ProductsContainer",
  components: {ProductList}
}
</script>

<style scoped>
.products-container {
  margin-top: 40px;
  background-color: #fff;
  padding: 20px;
}
</style>