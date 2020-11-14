<template>
	<div class="col-md-2 col-12 col-sm-6">
		<h3>Applied Filters</h3>
		<div>
			<span class="badge m-2 p-2 badge-bill badge-light text-primary">
				Clear ME
				<span
					class="btn-close text-secondary"
					@click="console.log('clicked')"
					>&times;</span
				>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppliedFilters',
	props: {},
};
</script>

<style scoped>
.btn-close {
	display: inline;
	font-size: 20px;
	cursor: pointer;
}
</style>
