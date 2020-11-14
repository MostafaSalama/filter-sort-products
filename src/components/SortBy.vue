<template>
	<div class="cold-md-2">
		<label for="sort_by" class="mr-2">Sort By</label>
		<select id="sort_by" class="form-inline-control" v-model="selectedSort">
			<option
				v-for="sortValue in sortValues"
				:key="sortValue.name"
				:value="sortValue.code"
			>
				{{ sortValue.name }}
			</option>
		</select>
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
	mounted() {},
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
