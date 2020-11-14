<template>
	<div>
		<div class="toggle-body-container">
			<span class="toggle-title font-weight-bolder">Region</span>
			<button class="toggle btn text-primary" @click="onToggle">
				{{ toggleText }}
			</button>
		</div>
		<div class="elements-container" v-if="toggleText === '-'">
			<div
				v-for="region of regions"
				:key="region.name"
				class="form-check"
			>
				<input
					type="radio"
					:id="region.name"
					class="form-check-input"
					name="selectedRegion"
					:value="region.code"
					v-model="selectedRegion"
				/>
				<label :for="region" class="form-check-label">
					{{ region.name }}
				</label>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RegionFilter',
	data() {
		return {
			toggleText: '+',
			selectedRegion: '',
		};
	},
	created() {
		this.selectedRegion = this.regions.filter((r) => r.selected)[0].code;
	},
	methods: {
		onToggle() {
			this.toggleText = this.toggleText === '+' ? '-' : '+';
		},
	},
	props: {
		regions: Array,
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
