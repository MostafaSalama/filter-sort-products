<template>
	<div class="products-container">
		<div class="container-fluid">
			<!--      for applied filter and sort by and number of results-->
			<div class="row">
				<AppliedFilters :applied-filters="appliedFilters" />
				<ResultLength :products-length="products.length" />
				<SortBy />
			</div>
			<div class="col-md-6 col-12"></div>
		</div>
		<div class="row">
			<div class="col-md-2 col-12">
				<template v-for="(values, title) of filters">
					<RegionFilter
						v-if="title === 'region'"
						:regions="values"
						:key="title"
						@updateRegionQuery="updateRegionQuery"
					></RegionFilter>
					<FabricatorFilter
						:key="title"
						v-else-if="title === 'fabricator'"
						:values="values"
						:title="title"
						@updateFabricatorQuery="updateFabricatorQuery"
					></FabricatorFilter>
					<ProductFilter
						v-else
						:key="title"
						:title="title"
						:values="values"
						@updateQuery="updateQuery"
					/>
				</template>
			</div>
			<div class="col-md-10">
				<ProductList :products="paginatedProducts" />
			</div>
		</div>
		<ProductsPagination
			:total-pages="pagination.totalPages"
			:current-page="pagination.currentPage"
			@updatePageQuery="updatePageQuery"
		/>
	</div>
</template>

<script>
import ProductList from '@/components/ProductList';
import ProductFilter from '@/components/filters/ProductFilter';
import RegionFilter from '@/components/filters/RegionFilter';
import FabricatorFilter from '@/components/filters/FabricatorFilter';
import AppliedFilters from '@/components/ApliedFilters';
import ResultLength from '@/components/ResultLength';
import SortBy from '@/components/SortBy';
import ProductsPagination from '@/components/ProductsPagination';

export default {
	name: 'ProductsContainer',
	components: {
		ProductsPagination,
		SortBy,
		ResultLength,
		AppliedFilters,
		FabricatorFilter,
		RegionFilter,
		ProductFilter,
		ProductList,
	},
	data() {
		return {
			products: [],
			filters: [],
			pagination: {},
			appliedFilters: [],
			currentURL: new URL(window.location.href),
		};
	},
	async created() {
		try {
			const response = await fetch(
				'http://www.amock.io/api/nithish.cir/projects',
			);
			const data = await response.json();
			this.products = data.result;
			this.filters = data.filters;
			this.pagination = data.pagination;
			this.appliedFilters = data.appliedfilters;
		} catch (e) {
			console.log(e);
		}
	},
	computed: {
		paginatedProducts() {
			return this.products.slice(0, this.pagination.pageSize);
		},
	},
	methods: {
		/**
		 *
		 * @param name {string}
		 * @param values {Array}
		 */
		updateQuery(name, values) {
			if (values.length) {
				this.currentURL.searchParams.set(name, values.join(':'));
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
			} else {
				this.currentURL.searchParams.delete(name);
				console.log(this.currentURL.search);
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
			}
		},
		updateRegionQuery(value) {
			this.currentURL.searchParams.set('region', value);
			history.pushState(
				'',
				'',
				this.currentURL.search.replace(/%3A/gi, ':'),
			);
		},
		updateFabricatorQuery(value) {
			this.currentURL.searchParams.set('fabricator', value);
			if (value) {
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
				return;
			}
			this.currentURL.searchParams.delete('fabricator');
			history.pushState(
				'',
				'',
				this.currentURL.search.replace(/%3A/gi, ':'),
			);
		},
		updatePageQuery(value) {
			this.currentURL.searchParams.set('page', value);
			history.pushState(
				'',
				'',
				this.currentURL.search.replace(/%3A/gi, ':'),
			);
		},
	},
};
</script>

<style scoped>
.products-container {
	margin-top: 40px;
	background-color: #fff;
	padding: 20px;
}
</style>
