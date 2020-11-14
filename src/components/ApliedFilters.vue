<template>
	<div class="col-md-2 col-12 col-sm-6">
		<h3>Applied Filters</h3>
		<div>
			<div class="clear-container">
				<button class="btn text-primary" @click="clearAppliedFilters">
					Clear all
				</button>
			</div>
			<span
				class="badge m-2 p-2 badge-bill badge-light text-primary"
				v-for="filter of currentAppliedFilters"
				:key="filter"
			>
				{{ filter }}
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
	data() {
		return {
			currentAppliedFilters: [],
		};
	},
	methods: {
		clearAppliedFilters() {
			this.currentAppliedFilters = [];
		},
	},
	watch: {
		appliedFilters(values) {
			this.currentAppliedFilters = values;
		},
	},
	props: {
		appliedFilters: Array,
	},
};
</script>

<style scoped>
.clear-container {
	text-align: right;
}
.btn-close {
	display: inline;
	font-size: 20px;
	cursor: pointer;
}
</style>
