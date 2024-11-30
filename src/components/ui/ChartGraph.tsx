import React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Legend,
  Label,
} from 'recharts';

import { Chart } from 'src/services/api/statistics/interface';
import { ChartTypeEnum } from 'src/utils/constants';

import { CardTitle } from './card';

interface UiBarChartProps {
  dataChart: Chart[];
  height?: string;
  width?: string;
  className?: string;
}

interface CustomizedLabelProps {
  x: number;
  y: number;
  value: string;
}

const renderCustomizedLabel = ({ x, y, value }: CustomizedLabelProps) => {
  return (
    <text x={x} y={y} fill='rgb(83, 144, 145)' textAnchor='middle' dominantBaseline='central'>
      {value}
    </text>
  );
};

const getColor = (index: number): string => {
  const colors = [
    '#26A69A', // Teal
    '#FFA726', // Orange
    '#AB47BC', // Purple
    '#EF5350', // Red
    '#42A5F5', // Blue
    '#66BB6A', // Green
    '#80DEEA', // Cyan Light
    '#B39DDB', // Purple Light
    '#DCE775', // Green Light
    '#F48FB1', // Pink Light
    '#9FA8DA', // Blue Light
    '#FFF176', // Yellow Ligh
  ];

  return colors[index % colors.length];
};

const ChartGraph: React.FC<UiBarChartProps> = ({ dataChart, className }) => {
  const getTotal = (selectedLabel: string) => {
    const selectedGraph = dataChart.find((chart) => chart.title === selectedLabel);
    if (!selectedGraph || !selectedGraph.data) return 0;
    return selectedGraph.data.reduce((acc, item) => acc + item.value, 0);
  };

  return (
    <div className='rounded-lg bg-white flex flex-wrap items-center'>
      {dataChart.map((chart) => {
        switch (chart.type) {
          case ChartTypeEnum.BAR:
            return (
              <div key={chart.title} className={`w-full ${className} p-2`}>
                {chart.title !== '' && chart.description !== '' && (
                  <CardTitle className='text-green-400 font-montserrat font-bold text-[18px] text-left mb-2'>
                    <span className='text-[18px]'>{chart.title.toUpperCase()}</span>
                    <br />
                    <span className='text-[16px]'>{chart.description}</span>
                  </CardTitle>
                )}
                <ResponsiveContainer width='100%' height={400} className={'font-montserrat font-bold text-[14px]'}>
                  <BarChart data={chart.data}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey='category' tickLine={false} tickMargin={8} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip />
                    <Bar dataKey='value' radius={4}>
                      {chart.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getColor(index)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          case ChartTypeEnum.PIE:
            return (
              <div key={chart.title} className={`w-full ${className} p-2`}>
                {chart.title !== '' && chart.description !== '' && (
                  <CardTitle className='text-green-400 font-montserrat font-bold text-[18px] text-left mb-2'>
                    <span className='text-[18px]'>{chart.title.toUpperCase()}</span>
                    <br />
                    <span className='text-[16px]'>{chart.description}</span>
                  </CardTitle>
                )}
                <ResponsiveContainer width='100%' height={400} className={'font-montserrat font-bold text-[14px]'}>
                  <PieChart>
                    <Tooltip />
                    <Legend verticalAlign='top' />
                    <Pie
                      data={chart.data}
                      dataKey='value'
                      nameKey='category'
                      outerRadius={120}
                      innerRadius={60}
                      strokeWidth={5}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      cornerRadius={8}
                    >
                      {chart.data.map((entry, index) => {
                        return <Cell key={`cell-${index}`} fill={getColor(index)} />;
                      })}
                      <Label
                        content={({ viewBox }) => {
                          if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) {
                            return null;
                          }

                          const total = getTotal(chart.title);
                          const { cx, cy } = viewBox;

                          return (
                            <text x={cx} y={cy} textAnchor='middle' dominantBaseline='middle'>
                              <tspan x={cx} y={(cy || 0) - 6} className='fill-foreground text-[24px] font-bold'>
                                {total.toLocaleString()}
                              </tspan>
                              <tspan x={cx} y={(cy || 0) + 14} className='fill-muted-foreground text-[16px]'>
                                Total
                              </tspan>
                            </text>
                          );
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            );
          default:
            return <div> </div>;
        }
      })}
    </div>
  );
};

export default ChartGraph;
