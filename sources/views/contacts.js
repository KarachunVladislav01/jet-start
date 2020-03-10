import { JetView } from "webix-jet";
import { contacts } from "../models/contacts.js";

export default class Contact extends JetView {
	config() {
		const usersList = {
			view: "list",
			localId: "userList",
			select: true,
			scroll: false,
			template:
				"<div class= 'users-list--flex'>{common.userInfo()}{common.deleteIcon}</div>",
			type: {
				userInfo: obj => {
					return `<span>${obj.Name}, ${obj.Email}</span>`;
				},

				deleteIcon: "<span class='remove-btn webix_icon wxi-close'></span>"
			}
		};

		const userForm = {
			view: "form",
			localId: "userForm",
			elements: [
				{
					view: "text",
					label: "User Name:",
					name: "name"
				},
				{
					view: "text",
					label: "Email:",
					name: "Email"
				},
				{}
			]
		};

		const addButton = {
			view: "button",
			value: "Add",
			click: () => this.addContact()
		};

		const view = {
			margin: 20,
			cols: [{ rows: [usersList, addButton] }, userForm]
		};
		return view;
	}
	init() {
		this.$$("userList").parse(contacts);
	}
}
