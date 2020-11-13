<template>
  <div class="product">
    <div class="shadow card product-item" style="width: 18rem">
<!--      replace this with the image from product prop-->
      <img src="https://picsum.photos/seed/picsum/200/300" class="card-img-top product-image" :alt="title"/>
      <div class="card-body">
        <h5 class="card-title text-primary">{{ title }}</h5>
        <p class="card-text">{{ description }}...</p>
        <p class="card-text">
          <small class="text-muted">{{ country }}/{{ city }}</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    title: String,
    description: String,
    image: String,
    city: String,
    country: String,
  },
};
</script>

<style scoped>
.product {
  margin-left: 10px;
}

.product-item {
  margin-top: 20px;
  height: 400px;
  padding: 10px 0;
}

.product-image {
  max-width: 100px;
  height: 100px;
  margin: 0 auto;
}
</style>