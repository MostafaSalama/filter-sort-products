<template>
	<div class="products-container">
		<div class="container-fluid">
			<!--      for applied filter and sort by and number of results-->
			<div class="row">
				<AppliedFilters />
        <ResultLength :products-length="products.length"/>
        <SortBy/>
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
						></RegionFilter>
						<FabricatorFilter
							:key="title"
							v-else-if="title === 'fabricator'"
							:values="values"
							:title="title"
						></FabricatorFilter>
						<ProductFilter
							v-else
							:key="title"
							:title="title"
							:values="values"
						/>
					</template>
				</div>
				<div class="col-md-10">
					<ProductList :products="products" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ProductList from '@/components/ProductList';
import ProductFilter from '@/components/filters/ProductFilter';
import RegionFilter from '@/components/filters/RegionFilter';
import FabricatorFilter from '@/components/filters/FabricatorFilter';
import AppliedFilters from '@/components/ApliedFilters';
import ResultLength from "@/components/ResultLength";
import SortBy from "@/components/SortBy";

export default {
	name: 'ProductsContainer',
	components: {
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
		} catch (e) {
			console.log(e);
		}
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
