<template>
	<div class="custom-control custom-switch">
		<input
			type="checkbox"
			class="custom-control-input"
			id="customSwitch1"
			v-model.lazy="checked"
		/>
		<label class="custom-control-label" for="customSwitch1"
			>Hide Inactive projects</label
		>
	</div>
</template>

<script>
export default {
	name: 'InActiveProjectsFilter',
	data() {
		return {
			checked: this.hideInActiveProjects,
		};
	},
	created() {
		this.$emit('updateInActiveQuery', this.checked, true);
	},
	watch: {
		checked(value) {
			this.$emit('updateInActiveQuery', value);
		},
	},
	props: {
		hideInActiveProjects: Boolean,
	},
};
</script>

<style scoped></style>
