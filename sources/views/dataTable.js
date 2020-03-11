import { JetView } from "webix-jet";

export default class DataTable extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this._gridData = data;
	}

	config() {
		const _ = this.app.getService("locale")._;
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
					value: _("Add"),
					click: () => this.addItem()
				},
				{
					view: "button",
					value: _("Delete"),
					click: () => this.deleteItem()
				}
			]
		};

		const view = { rows: [dataTable, defaultButtons] };
		return view;
	}

	init() {
		this.table = this.$$("dataTable");
		this._gridData.waitData.then(() => {
			this.table.sync(this._gridData);
		});
	}

	addItem() {
		this._gridData
			.waitSave(() => {
				this._gridData.add({ Name: "name" }, 0);
			})
			.then(res => {
				this.table.select(res.id);
			});
	}

	deleteItem() {
		const itemId = this.table.getSelectedId();
		if (itemId) {
			this.webix
				.confirm({
					text: "Are you sure"
				})
				.then(() => {
					this._gridData.remove(itemId);
				});
		}
	}
}
