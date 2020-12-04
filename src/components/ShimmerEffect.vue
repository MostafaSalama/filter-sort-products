<template>
 <div
  :style="{ height, width: computedWidth }"
  :class="{'shimmer-shine rounded-border' : roundedborder , 'shimmer-shine' : !roundedborder }"
 ></div>
</template>
<script>
export default {
 name: "shimmerEffect",
 props: {
  maxWidth: {
   default: 100,
   type: Number
  },
  minWidth: {
   default: 80,
   type: Number
  },
  height: {
   default: `1em`,
   type: String
  },
  width: {
   default: null,
   type: String
  },
  roundedborder: {
   default: false,
   type: Boolean
  }
 },
 computed: {
  computedWidth() {
   return (
    this.width ||
    `${Math.floor(
     Math.random() * (this.maxWidth - this.minWidth) + this.minWidth
    )}%`
   );
  }
 }
};
</script> 
