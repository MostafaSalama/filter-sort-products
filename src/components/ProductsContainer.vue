<template>
	<div class="products-container">
		<ListLoader v-if="isLoading"></ListLoader>
		<div v-if="!isLoading" class="container-fluid">
			<!--      for applied filter and sort by and number of results-->
			<div class="row justify-content-center d-flex d-block d-md-none">
				<button
					@click="onDropMenuClicked"
					class="btn dropdown-toggle w-100 font-weight-bolder"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					Filters
				</button>
			</div>
			<div class="row">
				<AppliedFilters
					@updateAppliedFilterQuery="updateAppliedFilterQuery"
					:applied-filters="appliedFilters"
				/>
				<ResultLength :products-length="products.length" />
				<SortBy
					@updateSortQuery="updateSortQuery"
					:sort-by="pagination.sort"
					:sort-values="sortValues"
				/>
			</div>
			<div class="col-md-6 col-12"></div>
			<div class="row">
				<div :class="filterClasses">
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
import { ListLoader } from 'vue-content-loader';

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
		ListLoader,
	},
	data() {
		return {
			products: [],
			filters: [],
			pagination: {},
			appliedFilters: [],
			currentURL: new URL(window.location.href),
			sortValues: [],
			isLoading: true,
			displayFilters: true,
			baseURL: 'http://www.amock.io/api/nithish.cir/projects',
		};
	},
	async created() {
		await this.fetchProducts();
	},
	computed: {
		paginatedProducts() {
			return this.products.slice(0, this.pagination.pageSize);
		},
		filterClasses() {
			return {
				'col-md-2': true,
				'col-12': true,
				'd-md-block': true,
				'd-none': this.displayFilters,
			};
		},
	},
	methods: {
		async fetchProducts() {
			try {
				// url to used to fetch data in real api
				const urlToFetchDataFrom = `${
					this.baseURL
				}?${this.currentURL.searchParams
					.toString()
					.replace(/%3A/gi, ':')}`;
				console.log(urlToFetchDataFrom);
				this.isLoading = true;
				const response = await fetch(this.baseURL);
				const data = await response.json();
				this.products = data.result;
				this.filters = data.filters;
				this.pagination = data.pagination;
				this.appliedFilters = data.appliedfilters;
				console.log(this.appliedFilters);
				this.sortValues = data.sortby;
				this.isLoading = false;
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 *
		 * @param name {string}
		 * @param values {Array}
		 * @param firstTime {boolean}
		 */
		updateQuery(name, values, firstTime = false) {
			if (firstTime) {
				if (values.length) {
					this.currentURL.searchParams.set(name, values.join(':'));
					history.pushState(
						'',
						'',
						this.currentURL.search.replace(/%3A/gi, ':'),
					);
					return;
				}
				return;
			}
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
			this.fetchProducts();
		},
		updateRegionQuery(value, firstTime) {
			if (firstTime) {
				this.currentURL.searchParams.set('region', value);
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
				return;
			}
			this.currentURL.searchParams.set('region', value);
			history.pushState(
				'',
				'',
				this.currentURL.search.replace(/%3A/gi, ':'),
			);
			this.fetchProducts();
		},
		updateFabricatorQuery(value, firstTime) {
			if (firstTime) {
				if (value) {
					this.currentURL.searchParams.set('fabricator', value);
					history.pushState(
						'',
						'',
						this.currentURL.search.replace(/%3A/gi, ':'),
					);
				}
				return;
			}
			this.currentURL.searchParams.set('fabricator', value);
			if (value) {
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
			} else {
				this.currentURL.searchParams.delete('fabricator');
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
			}
			this.fetchProducts();
		},
		updatePageQuery(value, firstTime) {
			if (firstTime) {
				this.currentURL.searchParams.set('page', value);
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
				return;
			}
			this.currentURL.searchParams.set('page', value);
			history.pushState(
				'',
				'',
				this.currentURL.search.replace(/%3A/gi, ':'),
			);
			this.fetchProducts();
		},
		updateSortQuery(value, firstTime) {
			if (firstTime) {
				this.currentURL.searchParams.set('sortBy', value);
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
				return;
			}
			this.currentURL.searchParams.set('sortBy', value);
			history.pushState(
				'',
				'',
				this.currentURL.search.replace(/%3A/gi, ':'),
			);
			this.fetchProducts();
		},
		updateAppliedFilterQuery(values, firstTime) {
			if (firstTime) {
				this.currentURL.searchParams.set(
					'appliedFilters',
					values.join(':'),
				);
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
				return;
			}
			if (values.length) {
				this.currentURL.searchParams.set(
					'appliedFilters',
					values.join(':'),
				);
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
			} else {
				this.currentURL.searchParams.delete('appliedFilters');
				console.log(this.currentURL.search);
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
			}
			this.fetchProducts();
		},
		onDropMenuClicked() {
			this.displayFilters = !this.displayFilters;
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
