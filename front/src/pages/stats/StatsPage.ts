import { ChartComponent } from "../../components/Charts/ChartComponent";
import { Component } from "../../utils/component";


export class StatsPage extends Component {
	
	constructor() {
		super();
		this.template = `
<div class="flex flex-col items-center justify-center h-screen">
  <div id="chart-container" class="flex items-center justify-center flex-col gap-2  space-y-2 p-4 ">
  </div>
</div>		`;
	}

	protected async initEvents(): Promise<void> {
		if (!this.element) return;
		const chartContainer = this.element.querySelector("#chart-container") as HTMLElement;
		if (chartContainer) {
			const chart = new ChartComponent({});
			chartContainer.appendChild(chart.render());
		}
	}
}