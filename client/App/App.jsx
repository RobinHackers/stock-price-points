import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BarChart from '../BarChart/BarChart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeklyData: [
        {// Temporary Data to prevent errors.
          weekIndex: 1,
          weekHigh: 1,
          weekLow: 1,
          weekAverage: 1,
          weekStocksPurchased: 1,
        },
      ],
      yearlyData: {
        stocksPurchasedYear: 1,
        yearHighest: 1,
        yearLowest: 1,
        yearAverage: 1,
      },
      currentPrice: 18.5,
      averageOnLine: 1,
      priceOnLine: 180,
    };

    this.componentDidMount = () => {
      $.ajax({
        method: 'GET',
        url: '/data/company/onecompany',
        success: (output) => {
          console.log(output);
          this.setState({
            weeklyData: output[0].weeks.sort((a, b) => a.weekAverage - b.weekAverage),
            yearlyData: output[0].yearly,
          });
        },
      });
    };

    this.updateAverageOnLine = (averageOnLine) => {
      this.setState({
        averageOnLine,
      });
    };

    this.updateCurrentOnLine = (priceOnLine) => {
      this.setState({
        priceOnLine,
      });
    };
  }

  render() {
    const {
      weeklyData,
      yearlyData,
      currentPrice,
      priceOnLine,
      averageOnLine,
    } = this.state;
    return (
      <BarChart
        weeklyData={weeklyData}
        yearlyData={yearlyData}
        currentPrice={currentPrice}
        priceOnLine={priceOnLine}
        averageOnLine={averageOnLine}
        updateAverageOnLine={this.updateAverageOnLine}
        updateCurrentOnLine={this.updateCurrentOnLine}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('mainChart'));
