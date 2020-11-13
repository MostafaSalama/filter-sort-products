<template>
  <div>
    <p v-for="p of products" :key="p.id">
      {{p.title}}
    </p>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    products: Array
  }
}
</script>

<style scoped>

</style>