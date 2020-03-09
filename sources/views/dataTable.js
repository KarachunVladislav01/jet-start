import { JetView } from "webix-jet";

export default class DataTable extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._gridData = data;
	}

	config() {
		const dataTable = {
			view: "datatable",
			localId: "dataTable",
			autoConfig: true,
			editable: true,
			editaction: "dblclick",
			scrollX: false
		};
		const defaultButtons = {
			cols: [
				{
					view: "button",
					value: "Add",
					click: () => this.addItem()
				},
				{
					view: "button",
					value: "Delete",
					click: () => this.deleteItem()
				}
			]
		};

		const view = { rows: [dataTable, defaultButtons] };
		return view;
	}

	init() {
		this.table = this.$$("dataTable");
		this.table.parse(this._gridData);
	}

	addItem() {
		this.table.add({ Name: "name" }, 0);
	}

	deleteItem() {
		const item = this.dataTable.getSelectedId();
		if (item) {
			this.webix
				.confirm({
					text: "Are you sure"
				})
				.then(() => {
					this.table.remove(item);
				});
		}
	}
}
