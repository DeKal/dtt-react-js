import React from "react";
import { connect } from 'react-redux';
import { Pie } from "react-chartjs-2";
import { Translate } from "react-localize-redux";
import { getTranslate } from 'react-localize-redux';

const options = {
	responsive: true,
	maintainAspectRatio: true,
}

class HistoryPieChart extends React.Component {
	constructor(props) {
		super(props);
		const { sumYes, sumNo, labels } = props;
		this.state = {
			data: {
				labels: this.translate(labels),
				datasets: [{
					data: [this.calPercent(sumNo), this.calPercent(sumYes)],
					backgroundColor: [
						'#980f0b',
						'#176b04'
					],
					hoverBackgroundColor: [
						'#980f0b',
						'#176b04'
					]
				}]
			}
		}

	}

	componentDidUpdate(prevProps) {
		if (JSON.stringify(prevProps.localize) !== JSON.stringify(this.props.localize) ||
			prevProps.sumYes !== this.props.sumYes || prevProps.sumNo !== this.props.sumNo) {
			const { sumYes, sumNo, labels } = this.props;
			this.setState({
				data: {
					labels: this.translate(labels),
					datasets: [{
						data: [this.calPercent(sumNo), this.calPercent(sumYes)],
						backgroundColor: [
							'#980f0b',
							'#176b04'
						],
						hoverBackgroundColor: [
							'#980f0b',
							'#176b04'
						]
					}]
				}
			})
		}
	}

	translate(labels) {
		const translatedLabels = [];
		labels.map((label) => {
			translatedLabels.push(this.props.translate(label));
		})
		return translatedLabels;
	}

	calPercent(sum)
	{
		const total = this.props.sumYes + this.props.sumNo;
		if(total === 0)
			return 0;
		return Math.round(sum*100/total);
	}

	render() {
		return (
			<div className="container">
				<div className="chart-header">
					{this.props.translate("Chart odds")}
        </div>
				<Pie data={this.state.data} options={options} />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps,
	localize: state.localize,
  translate: getTranslate(state.localize)
});

export default connect(mapStateToProps)(HistoryPieChart);
