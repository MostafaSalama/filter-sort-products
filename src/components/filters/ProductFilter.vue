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
			<div class="search-container">
				<label>
					<input
						type="search"
						class="form-control"
						:placeholder="`search ${title}`"
						name="search_brands"
					/>
				</label>
			</div>
			<div class="clear-container">
				<button class="btn text-primary">Clear all</button>
			</div>
			<div class="form-check" v-for="value of values">
				<input
					type="checkbox"
					class="form-check-input"
					:name="value.name"
					:id="value.name"
					:value="value.code"
					:checked="value.selected"
					v-model="selectedValues"
				/>
				<label :for="value" class="form-check-label">{{
					value.name
				}}</label>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProductFilter',
	data() {
		return {
			toggleText: '+',
			selectedValues: [],
		};
	},
	created() {
		this.selectedValues = this.values
			.filter((value) => value.selected)
			.map((v) => v.code);
	},
	computed: {
		formattedTitle() {
			return this.title[0].toUpperCase() + this.title.substr(1);
		},
	},
	watch: {},
	methods: {
		onToggle() {
			this.toggleText = this.toggleText === '+' ? '-' : '+';
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
.search-container {
	margin-top: 10px;
}
.search-container > label {
	font-style: italic;
	text-align: center;
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
</style>
