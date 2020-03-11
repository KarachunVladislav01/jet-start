import { JetView } from "webix-jet";

export default class Settings extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const changeLanguageButtons = {
			view: "segmented",
			localId: "languages",
			value: this.app.getService("locale").getLang(),
			options: [
				{
					id: "en",
					value: _("EN")
				},
				{
					id: "ru",
					value: _("RU")
				}
			],
			click: () => {
				const language = this.language.getValue();
				this.app.getService("locale").setLang(language);
			}
		};
		const view = {
			type: "clean",
			rows: [changeLanguageButtons, {}]
		};
		return view;
	}
	init() {
		this.language = this.$$("languages");
	}
}
