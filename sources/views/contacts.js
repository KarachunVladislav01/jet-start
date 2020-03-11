import { JetView } from "webix-jet";
import { contacts } from "../models/contacts.js";
import userForm from "./contactForm.js";

export default class Contact extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
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
			},
			onClick: {
				"wxi-close": (e, id) => this.deleteContact(id)
			}
		};

		const addButton = {
			view: "button",
			value: _("Add"),
			click: () => this.addContact()
		};

		const view = {
			margin: 20,
			cols: [{ rows: [usersList, addButton] }, userForm]
		};
		return view;
	}
	init(view, url) {
		this.list = this.$$("userList");
		this.list.sync(contacts);

		contacts.waitData.then(() => {
			this.list.attachEvent("onAfterSelect", chosenId =>
				this.show(`./contacts?id=${chosenId}`)
			);
			let id = url[0].params.id;
			if (!contacts.exists(id)) {
				id = contacts.getFirstId();
			}
			this.list.select(id);
		});
	}

	addContact() {
		contacts
			.waitSave(() => {
				contacts.add({ Name: "", Email: "" }, 0);
			})
			.then(res => {
				this.list.select(res.id);
				webix.message({ type: "info", text: "Please enter user details" });
			});
	}

	deleteContact(id) {
		contacts.remove(id);
		this.list.unselectAll();
		this.show("./contacts");
	}
}
