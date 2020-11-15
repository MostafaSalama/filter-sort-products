<template>
	<div>
		<div class="toggle-body-container">
			<span class="toggle-title font-weight-bolder">{{
				formattedTitle
			}}</span>
			<button class="toggle btn text-primary" @click="onToggle">
				{{ toggleText }}
			</button>
		</div>
		<div class="elements-container" v-if="toggleText === '-'">
			<div class="form-check">
				<v-select
					label="name"
					:options="values"
					:reduce="(f) => f.code"
					v-model="selected"
				></v-select>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FabricatorFilter',
	data() {
		return {
			toggleText: '+',
			selected: this.values.filter((value) => value.selected)[0].code,
		};
	},
	created() {
		this.$emit('updateFabricatorQuery', this.selected, true);
	},
	computed: {
		formattedTitle() {
			return this.title[0].toUpperCase() + this.title.substr(1);
		},
	},
	watch: {
		selected(value) {
			this.$emit('updateFabricatorQuery', value);
		},
	},
	methods: {
		onToggle() {
			this.toggleText = this.toggleText === '+' ? '-' : '+';
		},
		clearSelectedValue() {
			this.selected = '';
		},
	},
	props: {
		title: String,
		values: Array, // values to filter based on them
	},
};
</script>

<style scoped>
.toggle-body-container {
	display: flex;
	flex-direction: row;
}

.clear-container {
	text-align: right;
}
.toggle-title {
	margin: auto 0;
}
.toggle {
	justify-self: flex-end;
	margin-left: auto;
	font-weight: bolder;
	bottom: 15px;
	font-size: 30px;
}
.form-check {
	text-align: left;
}
</style>
