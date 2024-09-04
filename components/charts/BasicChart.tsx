import * as React from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

const pData = [90, 94, 99, 110, 102, 108, 117];
const xLabels = [
  '15.01.2024',
  '15.02.2024',
  '15.03.2024',
  '15.04.2024',
  '15.05.2024',
  '15.06.2024',
  '15.07.2024',
];

export default function BasicChart() {
  return (
    <ChartContainer
      width={500}
      height={300}
      series={[
        { data: pData, label: 'pv', type: 'line' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    >
      <LinePlot />
      <MarkPlot />
      <ChartsReferenceLine
        x="Page C"
          lineStyle={{ stroke: 'red' }}
      />
      <ChartsReferenceLine y={95} label="Hedef Kilo" lineStyle={{ stroke: 'red' }} />
      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
  );
}
