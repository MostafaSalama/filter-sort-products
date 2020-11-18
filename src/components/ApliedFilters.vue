<template>
	<div class="col-md-4 col-12 col-sm-6">
		<h3>Applied Filters</h3>
		<div>
			<div class="clear-container">
				<button class="btn text-primary" @click="clearAppliedFilters">
					Clear all
				</button>
			</div>
			<span
				class="badge m-2 p-2 badge-bill badge-light text-primary"
				v-for="filter of appliedFilters"
				:key="filter.name"
			>
				{{ filter.name }}
				<span
					class="btn-close text-secondary"
					@click="clearFilter(filter)"
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
			currentAppliedFilters: this.appliedFilters.map((f) => f.code),
		};
	},
	created() {
		/*	this.$emit(
			'updateAppliedFilterQuery',
			this.currentAppliedFilters,
			true,
		);*/
	},
	methods: {
		clearAppliedFilters() {
			if (!this.currentAppliedFilters.length) return;
			this.currentAppliedFilters = [];
		},
		clearFilter(selectedValue) {
			this.$emit('clearSelectedFilter', selectedValue);
		},
	},
	watch: {
		currentAppliedFilters(values) {
			// this.$emit('updateAppliedFilterQuery', values);
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
