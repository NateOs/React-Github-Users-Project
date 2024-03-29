import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: 'bar3d',
    width: '550',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      //* Config
      "chart": {
        "caption": "Most Forked",
        'yAxisName': 'Forks',
        'xAxisName':'Repos',
        'xAxisNameFontSize': '16px',
        'yAxisNameFontSize': '16px',
        showPercentValues: 0
      },
      //* Data
      data
    },
  };
  return <ReactFC {...chartConfigs} />; 
}

export default ChartComponent