<template>
	<div class="offset-8">
		<label for="sort_by" class="mr-2">Sort By</label>
		<select id="sort_by" class="form-inline-control">
			<option value="newest">newest</option>
			<option value="oldest">oldest</option>
			<option value="A-Z">A-Z</option>
			<option value="Z-A">Z-A</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'SortBy',
};
</script>

<style scoped></style>
