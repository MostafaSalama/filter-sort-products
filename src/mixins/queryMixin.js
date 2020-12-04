const queryMixin = {
	methods: {
		/**
		 *
		 * @param name {string}
		 * @param values {Array}
		 * @param firstTime {boolean}
		 */
		updateQuery (name, values, firstTime = false) {
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
			this.fetchprojects();
		},
		updateRegionQuery (value, firstTime) {
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
			this.fetchprojects();
		},
		updateFabricatorQuery (value, firstTime) {
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
			this.fetchprojects();
		},
		updatePageQuery (value, firstTime) {
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
			this.fetchprojects();
		},
		updateSortQuery (value, firstTime) {
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
			this.fetchprojects();
			this.makeActive('projectsListView');
		},
		updateAppliedFilterQuery (values, firstTime) {
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
			this.fetchprojects();
		},
		updateInActiveQuery (value, firstTime) {
			if (firstTime) {
				this.currentURL.searchParams.set('hideInactiveProjects', value);
				history.pushState(
					'',
					'',
					this.currentURL.search.replace(/%3A/gi, ':'),
				);
				return;
			}
			this.currentURL.searchParams.set('hideInactiveProjects', value);
			history.pushState(
				'',
				'',
				this.currentURL.search.replace(/%3A/gi, ':'),
			);
			this.fetchprojects();
		},
	},
};
export default queryMixin;
