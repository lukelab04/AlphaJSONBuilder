(() => {
	let singleInput = Input.singleInput;
	let singleValue = Input.singleValue;

	configObj = new Input({
		values: singleValue(new Value('object', {
			staticKeys: {},
			dynamicKeys: singleInput('object', 'Panel Information', {
				staticKeys: {
					topLevel: singleInput('boolean', 'Show in tab?'),
					title: singleInput('string', 'Panel title'),
					table: singleInput('string', 'Database table'),
					serverSearch: singleInput('boolean', 'Server-side search?', { default: false }),
					paginate: new Input({
						values: [{
							value: new Value('object', {
								default: undefined,
								staticKeys: {
									pageSize: singleInput('number', 'Page Size'),
								}
							}),
							dropdownLabel: '',
						}],
						label: 'Pagination Options',
						validate: () => true,
						show: (inputObj) => {
							let selected = inputObj.parent.selected();
							if (selected) {
								return selected.key('serverSearch').serialize();
							}
							return false;
						},
						comments: 'Specify options for pagination. Note that this only takes effect if "serverSearch" is enabled.',
					}),
					buttons: singleInput('array', 'Define Table Buttons', {
						default: [],
						arrayInput: new Input({
							values: [
								{
									value: new Value('object', {
										staticKeys: {
											title: singleInput('string', 'Button name'),
											typeToOpen: singleInput('string', 'Panel Type to open', {}, {comments: 'The Panel Type corresponds to the key name of the panel, defined in "Panels".'}),
											primaryKey: singleInput('string', 'Primary Key (in this list)'),
											foreignKey: singleInput('string', 'Foreign Key (in opened list)'),
										}
									}),
									dropdownLabel: 'Open a new Panel',
								},
								{
									value: new Value('object', {
										staticKeys: {
											title: singleInput('string', 'Button name'),
											overrideAction: singleInput('string', 'Name of action to run'),
										}
									}),
									dropdownLabel: 'Open a Static Panel',
								},
								{
									value: new Value('object', {
										staticKeys: {
											title: singleInput('string', 'Button name'),
											buttons: singleInput('array', 'Dropdown Buttons', {
												arrayInput: new Input({
													values: [
														{
															value: new Value('object', {
																staticKeys: {
																	title: singleInput('string', 'Button name'),
																	typeToOpen: singleInput('string', 'Panel Type to open'),
																	primaryKey: singleInput('string', 'Primary Key (in this list)'),
																	foreignKey: singleInput('string', 'Foreign Key (in opened list)'),
																}
															}),
															dropdownLabel: 'Open a new Panel',
														},
														{
															value: new Value('object', {
																staticKeys: {
																	title: singleInput('string', 'Button name'),
																	overrideAction: singleInput('string', 'Name of action to run'),
																}
															}),
															dropdownLabel: 'Open a Static Panel',
														},
													],
													label: 'Dropdown Button options',
													comments: '',
													validate: () => true,
												})
											})
										}
									}),
									dropdownLabel: 'Open a dropdown with more options',
								}
							],
							label: 'Button Options',
							comments: '',
							validate: () => true,
						})
					}),
					mappings: singleInput('array', 'Define Columns', {
						default: undefined,
						arrayInput: singleInput('object', 'Column Options', {
							staticKeys: {
								columnName: singleInput('string', 'Database column name'),
								displayName: singleInput('string', 'Column display name (optional)', { default: undefined }),
								inList: singleInput('boolean', 'Show in list?'),
								inDetailView: singleInput('boolean', 'Show in detail view?'),
								editType: singleInput('string', 'Editor type to use (datetime, time, etc.) (optional)', { default: undefined }, {
									show: (inputObj) => {
										let selected = inputObj.parent.selected();
										if (selected) {
											return selected.key('inDetailView').serialize();
										}
										return false;
									}
								}),
								width: singleInput('string', 'Width (CSS percentage) (optional)', { default: undefined }, {
									show: (inputObj) => {
										let selected = inputObj.parent.selected();
										if (selected) {
											return selected.key('inList').serialize()
										}
										return false;
									}
								}),
								template: singleInput('string', 'Template (optional)', { default: undefined }, {
									show: (inputObj) => {
										let selected = inputObj.parent.selected();
										if (selected) {
											return selected.key('inList').serialize();
										}
										return false;
									}
								}),
								lookup: singleInput('object', 'Lookup Options (optional)', {
									default: undefined,
									staticKeys: {
										table: singleInput('string', 'Database table'),
										primaryKey: singleInput('string', 'Primary Key (in this list)'),
										foreignKey: singleInput('string', 'Foreign Key (in other list)'),
										getColumns: singleInput('array', 'Columns to get', { arrayInput: singleInput('string', 'Column Name'), default: undefined }),
										formatter: singleInput('function', 'Formatting function', { default: undefined }),
									}
								}, {
									show: (inputObj) => {
										let selected = inputObj.parent.selected();
										if (selected) {
											return selected.key('inList').serialize();
										}
										return false;
									}
								}),
							}
						})
					})
				},
			}),
		})),
		label: "Panels",
		comments: 'Add keys corresponding to panels. For example, a panel with Customer Information might be called "CustomerPanel", and the key would also be "CustomerPanel".',
		validate: () => true,
	});

	return configObj;
})();