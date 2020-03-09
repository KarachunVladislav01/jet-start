import { JetView } from "webix-jet";
import { countries } from "../models/countries.js";
import { statuses } from "../models/statuses.js";

import DataTable from "./dataTable.js";

export default class Data extends JetView {
	config() {
		const dataMenu = {
			view: "segmented",
			localId: "dataMenu",
			value: "countries",
			options: [
				{
					value: "Countries",
					id: "countries"
				},
				{
					value: "Statuses",
					id: "statuses"
				}
			]
		};
		const multiView = {
			cells: [
				{
					id: "countries",
					rows: [new DataTable(this.app, "", countries)]
				},
				{
					id: "statuses",
					rows: [new DataTable(this.app, "", statuses)]
				}
			]
		};

		const view = { rows: [dataMenu, multiView] };

		return view;
	}
	init() {
		this.$$("dataMenu").attachEvent("onChange", newValue => {
			this.$$(newValue).show();
		});
	}
}
