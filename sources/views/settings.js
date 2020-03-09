import { JetView } from "webix-jet";

export default class Settings extends JetView {
	config() {
		const changeLanguageButtons = {
			view: "segmented",
			value: "en",
			options: [
				{
					id: "en",
					value: "EN"
				},
				{
					id: "ru",
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
