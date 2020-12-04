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
					@clearSelectedFilter="clearSelectedFilter"
					@clearAllSelectedFilters="clearAllSelectedFilters"
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
					<InActiveProjectsFilter
						:hide-in-active-projects="hideInActiveProjects"
						@updateInActiveQuery="updateInActiveQuery"
					/>
					<template v-for="(values, title, index) of filters">
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
							v-else-if="index + 3 < filtersEntries.length"
							:key="title"
							:title="title"
							:values="values"
							@updateQuery="updateQuery"
						/>
					</template>
					<div v-show="showAdvancedOptions">
						<ProductFilter
							v-for="filter of advancedFilters"
							:key="filter[0]"
							:title="filter[0]"
							:values="filter[1]"
							@updateQuery="updateQuery"
						/>
					</div>
					<div style="text-align: left">
						<a @click="toggleAdvancedOptions" class="btn btn-link">
							{{ showAdvancedText }}
						</a>
					</div>
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
import queryMixin from '@/mixins/queryMixin';
import InActiveProjectsFilter from '@/components/filters/InActiveProjectsFilter';

export default {
	name: 'ProductsContainer',
	components: {
		InActiveProjectsFilter,
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
	mixins: [queryMixin],
	data() {
		return {
			products: [],
			filters: [],
			advancedFilters: [],
			filtersEntries: [],
			pagination: {},
			appliedFilters: [],
			currentURL: new URL(window.location.href),
			sortValues: [],
			hideInActiveProjects: false,
			isLoading: true,
			displayFilters: true,
			showAdvancedText: 'See more advanced filters >',
			showAdvancedOptions: false,
			baseURL: 'https://5fca1f2c3c1c220016441bd2.mockapi.io/projects/productdata',
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
				const parseddata = await response.json();
				const data = parseddata[0];
				this.products = data.results;
				this.filters = data.filters;
				// used to display the last 3 as advanced filters
				this.filtersEntries = Object.entries(data.filters);
				this.advancedFilters = this.filtersEntries.slice(
					this.filtersEntries.length - 3,
				);
				this.pagination = data.pagination;
				this.sortValues = data.sortBy;
				this.appliedFilters = this.getAppliedFilters(this.filters);
				this.hideInActiveProjects = data.hideinactiveprojects;
				this.isLoading = false;
			} catch (e) {
				console.log(e);
			}
		},
		onDropMenuClicked() {
			this.displayFilters = !this.displayFilters;
		},
		toggleAdvancedOptions() {
			this.showAdvancedText =
				this.showAdvancedText === 'See more advanced filters >'
					? 'See less filters <'
					: 'See more advanced filters >';
			this.showAdvancedOptions = !this.showAdvancedOptions;
		},
		getAppliedFilters(filters) {
			const appliedFilters = [];
			for (let prop in filters) {
				const currentFilterValues = filters[prop];
				const selectedValues = currentFilterValues
					.filter((v) => v.selected)
					.map((v) => {
						return { filter: prop, ...v };
					});
				appliedFilters.push(...selectedValues);
			}
			return appliedFilters;
		},

		// used to clear a selected filter value
		clearSelectedFilter (selectedValue) {
			if (selectedValue.filter === "region") {
				this.clearAllSelectedFilters();
			} else {
				const filterName = selectedValue.filter;
				let filterValues = this.filters[filterName];
				filterValues = filterValues.map((value) => {
					return value.code === selectedValue.code
						? { ...value, selected: false }
						: value;
				});
				this.filters = { ...this.filters, [filterName]: filterValues };
				this.filtersEntries = Object.entries(this.filters);
				this.advancedFilters = this.filtersEntries.slice(
					this.filtersEntries.length - 3,
				);
			}

		},
		clearAllSelectedFilters() {
			this.currentURL.search = '';
			this.currentURL.searchParams.set('region', 'all');
			this.currentURL.searchParams.set('page', '1');
			this.currentURL.searchParams.set('sortBy', 'newest');
			this.fetchProducts();
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
