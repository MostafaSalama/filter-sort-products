<template>
 <div>
  <span class="result-count">{{ projectsLength }} {{ resultsLabel }}</span>
  <span class="result-text">{{ filterSelectedLabel }}</span>
 </div>
</template>

<script>
export default {
 name: "ResultLength",
 props: {
  projectsLength: Number,
  resultsLabel: String,
  filterSelectedLabel: String
 }
};
</script>

 
