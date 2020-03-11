import { JetView } from "webix-jet";
import { contacts } from "models/contacts.js";
import { countries } from "models/countries";
import { statuses } from "models/statuses";

export default class ContactEditForm extends JetView {
	config() {
		const userForm = {
			view: "form",
			localId: "userForm",
			elements: [
				{
					view: "text",
					label: "Name:",
					name: "Name",
					invalidMessage: "Must be filled"
				},
				{
					view: "text",
					label: "E-mail:",
					name: "Email",
					invalidMessage: "This is not E-mail"
				},
				{
					view: "combo",
					label: "Country",
					name: "Country",
					value: 1,
					invalidMessage: "Must be selected",
					options: {
						body: {
							data: countries,
							template: "#Name#"
						}
					}
				},
				{
					view: "combo",
					label: "Status",
					name: "Status",
					value: 1,
					invalidMessage: "Must be selected",
					options: {
						body: {
							data: statuses,
							template: "#Name#"
						}
					}
				}
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isEmail,
				Country: webix.rules.isNotEmpty,
				Status: webix.rules.isNotEmpty
			}
		};
		const formButton = {
			view: "button",
			label: "Save",
			click: () => this.saveContact()
		};

		const view = { rows: [userForm, formButton, {}] };

		return view;
	}

	init() {
		this.form = this.$$("userForm");
	}
	urlChange(view, url) {
		this.form.clear();
		const elementId = url[0].params.id;
		if (contacts.exists(elementId)) {
			this.form.setValues(contacts.getItem(elementId));
		}
	}
	saveContact() {
		const data = this.form.getValues();
		let id = this.getParam("id");
		if (!id) {
			webix.message({ type: "error", text: "No contact selected" });
			return;
		}
		if (this.form.validate()) {
			contacts.updateItem(data.id, data);
			webix.message({ type: "success", text: "Successful" });
		} else {
			webix.message({ type: "error", text: "Invalid inputs" });
		}
	}
}
