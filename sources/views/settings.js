import { JetView } from "webix-jet";

export default class Settings extends JetView {
	config() {
		const changeLanguageButtons = {
			view: "segmented",
			value: "EN",
			options: [
				{
					localId: "en",
					value: "EN"
				},
				{
					localId: "ru",
					value: "RU"
				}
			]
		};
		const view = {
			type: "clean",
			rows: [changeLanguageButtons, {}]
		};
		return view;
	}
}
