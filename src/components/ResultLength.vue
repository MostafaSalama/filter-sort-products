<template>
	<div class="results-container col-md-6 col-sm-6">
		<div class="font-weight-bolder">
			<h2>
				<span class="text-primary">{{ productsLength }} results </span>
				for the filter selected
			</h2>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ResultLength',
	props: {
		productsLength: Number,
	},
};
</script>

<style scoped>
.results-container {
	text-align: center;
}
</style>
