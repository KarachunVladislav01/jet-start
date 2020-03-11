import { JetView } from "webix-jet";
import { countries } from "../models/countries.js";
import { statuses } from "../models/statuses.js";

import DataTable from "./dataTable.js";

export default class Data extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const dataMenu = {
			view: "segmented",
			localId: "dataMenu",
			value: "countries",
			options: [
				{
					value: _("Countries"),
					id: "countries"
				},
				{
					value: _("Statuses"),
					id: "statuses"
				}
			]
		};
		const multiView = {
			cells: [
				{
					localId: "countries",
					rows: [new DataTable(this.app, "", countries)]
				},
				{
					localId: "statuses",
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
