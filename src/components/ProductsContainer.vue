<template>
 <div class="projects-container">
  <div>
   <div class="justify-content-center projects-dropdownfilter">
    <div @click="onDropMenuClicked" class="dropdown-toggle" id="dropdownMenuButton">
     <div>{{ filtersLabel }}</div>
     <div class="project-list-filter-toggle-icon-container">
      <img class="project-list-filter-toggle-icon" :src="showfilterdropdownicon">
     </div>
    </div>
   </div>
   <div class="row project-list-main-container">
    <div
     class="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 filter-container project-left-container"
     :class="filterClasses"
    >
     <div v-if="!isLoading">
      <aem-applied-filters
       v-if="appliedFilters.length > 0 && appliedFilters !== null && appliedFilters !== ''"
       @updateAppliedFilterQuery="updateAppliedFilterQuery"
       :applied-filters="appliedFilters"
       :appliedfilterslabel="appliedFiltersLabel"
       @clearSelectedFilter="clearSelectedFilter"
       @clearAllSelectedFilters="clearAllSelectedFilters"
      />
      <aem-in-active-project-filter
       v-if="hideInActiveProjects !== null && hideInActiveProjects !== ''"
       :hide-in-active-projects="hideInActiveProjects"
       @updateInActiveQuery="updateInActiveQuery"
      />
      <template v-for="(values, title, index) of filters">
       <aem-region-filter
        v-if="title === 'region'"
        :regions="values"
        :key="title"
        :regionlabel="regionLabel"
        @updateRegionQuery="updateRegionQuery"
       />
       <aem-fabricator-filter
        :key="title"
        v-else-if="title === 'fabricator'"
        :values="values"
        :title="title"
        :filterlabelarray="filterLabelArray"
        @updateFabricatorQuery="updateFabricatorQuery"
       ></aem-fabricator-filter>
       <aem-project-filter
        v-else-if="index + 3 < filtersEntries.length || filtersEntries.length <= 7"
        :key="title"
        :title="title"
        :values="values"
        :clearalllabel="clearAllLabel"
        :searchlabel="searchLabel"
        :filterlabelarray="filterLabelArray"
        @updateQuery="updateQuery"
       />
      </template>
      <div v-show="showAdvancedOptions">
       <aem-project-filter
        v-for="filter of advancedFilters"
        :key="filter[0]"
        :title="filter[0]"
        :values="filter[1]"
        :searchlabel="searchLabel"
        :filterlabelarray="filterLabelArray"
        @updateQuery="updateQuery"
       />
      </div>
      <div class v-if="filtersEntries.length > 10">
       <div @click="toggleAdvancedOptions" class="project-list-show-more-options">
        <div class="show-more-option-text" v-if="showAdvancedOptions">{{ showLessLabel }}</div>
        <div class="show-more-option-text" v-else>{{ showMoreLabel }}</div>
        <div class="project-list-up-down-toggle">
         <img class="up-down-icon" :src="showAdvancedText">
        </div>
       </div>
      </div>
      <div class="projects-dropdownfilter">
       <div class="close-filter-dropdown-container">
        <div class="close-filter-dropdown" @click="onDropMenuClicked">{{ closeLabel }}</div>
       </div>
      </div>
     </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 project-right-container">
     <div v-if="!isLoading" class="row result-info-container">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
       <aem-result-length
        :projects-length="pagination.totalResults"
        :results-label="resultsLabel"
        :filter-selected-label="filterSelectedLabel"
       />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 padding-reset-right">
       <div class="row project-sort-container">
        <div
         class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 project-sort-by-label padding-reset-right"
        >
         <span v-if="projects.length > 0">{{ sortByLabel }}</span>
        </div>
        <div
         class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 project-sort-wrapper padding-reset-left-right"
        >
         <aem-sort-by
          v-if="projects.length > 0"
          @updateSortQuery="updateSortQuery"
          :sort-by="pagination.sort"
          :sort-values="sortValues"
         />
        </div>
        <div
         v-on:click="makeActive('projectsListView')"
         :class="{active: choice === 'projectsListView'}"
         class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 project-list-view-container"
        >
         <div class="listview">
          <div class="image-container">
           <img class="listview-icon" src>
          </div>
         </div>
        </div>
        <div
         v-on:click="makeActive('projectsMapView')"
         :class="{active: choice === 'projectsMapView'}"
         class="row col-xs-2 col-sm-2 col-md-2 project-map-view-container"
        >
         <div class="mapview">
          <div class="image-container">
           <img class="mapview-icon" src>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
     <div class="content">
      <div v-show="isActiveTab('projectsListView')">
       <div class v-if="projects.length > 0">
        <aem-project-list
         :isLoading="isLoading"
         :projects="paginatedprojects"
         :resultnotfound="noResultFoundLabel"
        />
        <div class="col-xs-12 project-list-pagination-container">
         <aem-projects-pagination
          v-if="projects.length > 0"
          :total-pages="pagination.totalPages"
          :current-page="pagination.currentPage"
          @updatePageQuery="updatePageQuery"
         />
        </div>
       </div>
       <!-- no results found-->
       <div v-else>
        <div v-if="!isLoading" class="no-result-found-contianer">
         <div class="no-result-wrapper">
          <div class="no-result-found-image-container">
           <img
            class="no-result-found-image"
            src="/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/Icons-no-result-empty@3x.png"
           >
          </div>
          <div class="no-result-text">
           {{ noResultFoundLabel }}
           <br>
           {{ tryToChangeFilterLabel }}
           <a href="#">{{ seeWhatPossibleLabel }}</a>
          </div>
         </div>
        </div>
       </div>
      </div>
      <div v-show="isActiveTab('projectsMapView')">
       <div class="project-listing-map-container">
        <div id="js_map_canvas"></div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import ProductFilter from "@/components/filters/ProductFilter";
import RegionFilter from "@/components/filters/RegionFilter";
import FabricatorFilter from "@/components/filters/FabricatorFilter";
import AppliedFilters from "@/components/ApliedFilters";
import ResultLength from "@/components/ResultLength";
import SortBy from "@/components/SortBy";
import ProductsPagination from "@/components/ProductsPagination";
import { ListLoader } from "vue-content-loader";
import queryMixin from "@/mixins/queryMixin";
import InActiveProjectsFilter from "@/components/filters/InActiveProjectsFilter";

export default {
 name: "ProductsContainer",
 components: {
  aemInActiveProjectsFilter: InActiveProjectsFilter,
  aemProjectsPagination: ProductsPagination,
  aemSortBy: SortBy,
  aemResultLength : ResultLength,
  aemAppliedFilters : AppliedFilters,
  aemFabricatorFilter: FabricatorFilter,
  aemRegionFilter: RegionFilter,
  aemProjectFilter: ProductFilter,
  aemProjectList: ProductList,
  ListLoader
 },
 mixins: [queryMixin],
 data() {
  return {
   // translations
   choice: "projectsListView",
   map: "",
   sortByLabeli18n: '',
   resultsLabeli8n:  '',
   filterSelectedLabeli18n: '',
   filterLabelArrayi18n: {
    country: '',
    city: '',
    projectType: '',
    fabricator: '',
    architect: '',
    glazier:'',
   },
   filtersLabeli18n: '',
   clearAllLabeli18n: '',
   showMoreLabeli18n: '',
   showLessLabeli18n: '',
   appliedFiltersLabeli18n: '',
   regionLabeli18n: '',
   searchLabeli18n: '',
   closeLabeli18n: '',
   noresultfoundLabeli18n: '',
   seewhatpossiblei18n: '',
   tryToChangeFilteri18n: '',
   // all projects object
   projects: [],
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
   showAdvancedText:
    "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons - big Arrow down blue.png",
   showAdvancedOptions: false,
   baseURL: '/content/guardianindustriesholdings/content-pool/projects-pool/en/projects/jcr:content/root/responsivegrid/projects_listing.getProjects.html' // mock
  };
 },

 async created() {
  await this.fetchprojects();
 },
 computed: {
  sortByLabel() {
   return this.sortByLabeli18n;
  },
  resultsLabel() {
   return this.resultsLabeli8n;
  },
  filterSelectedLabel() {
   return this.filterSelectedLabeli18n;
  },
  filterLabelArray() {
   return this.filterLabelArrayi18n;
  },
  clearAllLabel() {
   return this.clearAllLabeli18n;
  },
  filtersLabel() {
   return this.filtersLabeli18n;
  },
  showMoreLabel() {
   return this.showMoreLabeli18n;
  },
  showLessLabel() {
   return this.showLessLabeli18n;
  },
  appliedFiltersLabel() {
   return this.appliedFiltersLabeli18n;
  },
  regionLabel() {
   return this.regionLabeli18n;
  },
  searchLabel() {
   return this.searchLabeli18n;
  },
  closeLabel() {
   return this.closeLabeli18n;
  },
  noResultFoundLabel() {
   return this.noresultfoundLabeli18n;
  },
  seeWhatPossibleLabel() {
   return this.seewhatpossiblei18n;
  },
  tryToChangeFilterLabel() {
   return this.tryToChangeFilteri18n;
  },
  paginatedprojects() {
   return this.projects.slice(0, this.pagination.pageSize);
  },
  filterClasses() {
   return {
    hideinsmallscreen: this.displayFilters
   };
  },
  showfilterdropdownicon() {
   let open =
    "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons - big Arrow down blue.png";
   let close =
    "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons - big Arrow up blue.png";
   return this.displayFilters ? open : close;
  }
 },
 methods: {
  async fetchprojects() {
   // set the endpoint
   this.baseURL = '/content/guardianindustriesholdings/content-pool/projects-pool/en/projects/jcr:content/root/responsivegrid/projects_listing.getProjects.html';
   try {
    // url to used to fetch data in real api
    const urlToFetchDataFrom = `${
     this.baseURL
    }?${this.currentURL.searchParams.toString().replace(/%3A/gi, ":")}`;
    this.isLoading = true;
    const response = await fetch(urlToFetchDataFrom);
    const data = await response.json();
    this.projects = data.results ? data.results : "";
    this.filters = data.filters ? data.filters : "";
    // used to display the last 3 as advanced filters
    this.filtersEntries = Object.entries(data.filters);
    this.advancedFilters = this.filtersEntries.slice(
     this.filtersEntries.length - 3
    );
    this.pagination = data.pagination ? data.pagination : "";
    this.appliedFilters = this.getAppliedFilters(this.filters);
    this.sortValues = data.sortBy ? data.sortBy : "";
    this.hideInActiveProjects = data.hideinactiveprojects
     ? data.hideinactiveprojects
     : "";
    this.isLoading = false;

    // translations
   } catch (e) {
    console.log(e);
   }
  },

  onDropMenuClicked() {
   this.displayFilters = !this.displayFilters;
  },
  toggleAdvancedOptions() {
   this.showAdvancedText =
    this.showAdvancedText ===
    "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons - big Arrow down blue.png"
     ? "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons - big Arrow up blue.png"
     : "/etc.clientlibs/guardianindustriesholdings/clientlibs/main/resources/assets/icons - big Arrow down blue.png";
   this.showAdvancedOptions = !this.showAdvancedOptions;
  },
  getAppliedFilters(filters) {
   const appliedFilters = [];
   for (let prop in filters) {
    const currentFilterValues = filters[prop];
    const selectedValues = currentFilterValues
     .filter(v => v.selected)
     .map(v => {
      return { filter: prop, ...v };
     });
    appliedFilters.push(...selectedValues);
   }
   return appliedFilters;
  },
  // used to clear a selected filter value
  clearSelectedFilter(selectedValue) {
   if (selectedValue.filter === "region") {
    this.clearAllSelectedFilters();
   } else {
    const filterName = selectedValue.filter;
    let filterValues = this.filters[filterName];
    filterValues = filterValues.map(value => {
     return value.code === selectedValue.code
      ? { ...value, selected: false }
      : value;
    });
    this.filters = { ...this.filters, [filterName]: filterValues };
    this.filtersEntries = Object.entries(this.filters);
    this.advancedFilters = this.filtersEntries.slice(
     this.filtersEntries.length - 3
    );
   }
  },
  clearAllSelectedFilters() {
   this.currentURL.search = "";
   this.currentURL.searchParams.set("region", "all");
   this.currentURL.searchParams.set("page", "1");
   this.currentURL.searchParams.set("sortBy", "newest");
   this.fetchprojects();
  },

  makeActive: function(val) {
   // the following map invalidateSize is not working : api is depricated
   // this.map.invalidateSize(true);
   // dispatching resize event
   setTimeout(function() {
    window.dispatchEvent(new Event("resize"));
   }, 0);
   this.choice = val;
   // load map
   this.mapview();
  },
  isActiveTab: function(val) {
   return this.choice === val;
  },
  mapview() {
   if (this.map != undefined && this.map != "") {
    this.map.remove();
    this.ansncMap();
   } else {
    this.ansncMap();
   }
  },
  ansncMap() {
   var defaultlatandlong = [
    {
     lat: 0.0,
     lng: 0.0,
     title: this.noResultFoundLabel,
     description: this.noResultFoundLabel,
     location: this.noResultFoundLabel
    }
   ];
   var locations = this.projects.length > 0 ? this.projects : defaultlatandlong;
   var initialLatitude = locations[0].lat ? locations[0].lat : 0.0;
   var initialLongitude = locations[0].lng ? locations[0].lng : 0.0;
   this.map = L.map("js_map_canvas", {
    center: [initialLatitude, initialLongitude],
    minZoom: 2,
    zoom: 2,
    zoomControl: false,
    attributionControl: false
   });

   L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en", {
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
   }).addTo(this.map);
   var markerClusters = L.markerClusterGroup({
    showCoverageOnHover: false,
    iconCreateFunction: function(cluster) {
     var markers = cluster.getAllChildMarkers();
     var html =
      '<div class="cluster-circle"> <div class="cluster-length">' +
      markers.length +
      "</div></div>";
     return L.divIcon({
      html: html,
      className: "mycluster",
      iconSize: L.point(64, 64)
     });
    }
   });
   try {
    if (locations[0].lat !== 0 && locations[0].lng !== 0) {
     for (var i = 0; i < locations.length; ++i) {
      var popup =
       `<div class="surrounding-partner-info-box-container">
						<a href="` +
       locations[i].url +
       `">
						<div class="image-container">
                            <img class="image" src= ` +
       locations[i].image +
       ` />
						</div>
						</a>    
						<div class="content-container">
							<a href="` +
       locations[i].url +
       `">
							<h2 class="title"> ` +
       locations[i].title +
       ` </h2>
							</a>
                            <div class="description"> ` +
       locations[i].description +
       `  </div>
                            <div class="location">` +
       locations[i].country +
       "," +
       locations[i].city +
       `  </div>
                        </div>
					</div>`;
      console.log(locations[i].lat, locations[i].lng);
      var m = L.marker(
       [
        locations[i].lat ? locations[i].lat : 0.0,
        locations[i].lng ? locations[i].lng : 0.0
       ],
       {
        icon: L.divIcon({
         html: `<img class="markerimage" src= ` + locations[i].image + ` /> `,
         // Specify a class name we can refer to in CSS.
         className: "leaflet-marker-pin",
         // Set a markers width and height.
         iconSize: [64, 64]
        })
       }
      ).bindPopup(popup, {
       closeButton: false,
       offset: [0, -23]
      });
      markerClusters.addLayer(m);
     }
     this.map.addLayer(markerClusters);
    } else {
     return false;
    }
   } catch (e) {
    console.log(e);
   }
  }
 },
 watch: {
  projects: {
   handler: function(val, oldVal) {
    this.mapview();
   },
   deep: true
  }
 }
};
</script>
 