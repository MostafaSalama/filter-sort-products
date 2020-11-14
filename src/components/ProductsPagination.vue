<template>
	<div class="row mt-2 justify-content-center">
		<paginate
			v-model="selectedPage"
			:page-count="totalPages"
			container-class="pagination"
			page-class="page-item"
			page-link-class="page-link"
			prev-class="page-item"
			next-class="page-item"
			prev-link-class="page-link"
			next-link-class="page-link"
			:click-handler="updatePageProducts"
		/>
	</div>
</template>

<script>
export default {
	name: 'ProductsPagination',
	data() {
		return {
			selectedPage: 0,
		};
	},
	created() {},
	watch: {
		currentPage(value) {
			this.selectedPage = value;
		},
		selectedPage(value) {
			this.$emit('updatePageQuery', value);
		},
	},
	props: {
		currentPage: Number,
		firstPage: Number,
		prevPage: Number,
		nextPage: Number,
		pageSize: Number,
		totalPages: {
			type: Number,
			default: 1,
		},
	},
	methods: {
		updatePageProducts() {},
	},
};
</script>

<style scoped></style>
