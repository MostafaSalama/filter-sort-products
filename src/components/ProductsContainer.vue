<template>
  <div class="products-container">
    <div class="container-fluid">
<!--      for applied filter and sort by and number of results-->
      {{products.length}}
        <div class="row">
          <div class="row">
            <div class="col-md-10 col-12">
                <ProductList :products="products" />
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
  components: {ProductList},
  data(){
    return {
      products:[]
    }
  },
  async created() {
        try {
            const response = await fetch('http://www.amock.io/api/nithish.cir/projects');
            const data = await response.json() ;
            this.products = data.result ;
        }
        catch (e){
          console.log(e);
        }
  }
}
</script>

<style scoped>
.products-container {
  margin-top: 40px;
  background-color: #fff;
  padding: 20px;
}
</style>