<template>
	<div class="cold-md-2">
		<label>Sort By</label>
		<v-select
			label="name"
			:options="sortValues"
			:reduce="(f) => f.code"
			v-model="selectedSort"
		></v-select>
	</div>
</template>

<script>
export default {
	name: 'SortBy',
	data() {
		return {
			selectedSort: '',
		};
	},
	created() {
		this.selectedSort = this.sortValues.filter(
			(value) => value.selected,
		)[0].code;
	},
	watch: {
		selectedSort(value) {
			this.$emit('updateSortQuery', value);
		},
		sortValues(values) {
			this.selectedSort = values.filter(
				(value) => value.selected,
			)[0].code;
		},
	},
	props: {
		sortBy: String,
		sortValues: Array,
	},
};
</script>

<style scoped></style>
