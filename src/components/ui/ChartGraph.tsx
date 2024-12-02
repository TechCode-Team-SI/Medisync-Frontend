import React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
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
  heightMax: number;
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

const ChartGraph: React.FC<UiBarChartProps> = ({ dataChart, className, heightMax }) => {
  const getTotal = (selectedLabel: string) => {
    const selectedGraph = dataChart.find((chart) => chart.title === selectedLabel);
    if (!selectedGraph || !selectedGraph.data) return 0;
    return selectedGraph.data.reduce((acc, item) => acc + item.value, 0);
  };

  return (
    <div className='rounded-lg bg-white flex flex-wrap justify-around items-center gap-4'>
      {dataChart.map((chart) => {
        switch (chart.type) {
          case ChartTypeEnum.BAR:
            return (
              <div key={chart.title} className={`w-full ${className}`}>
                {chart.title !== '' && chart.description !== '' && (
                  <CardTitle className='text-white bg-green-400 font-montserrat font-bold text-[18px] text-left mb-2 p-2 rounded-t-lg'>
                    <span className='text-[18px]'>{chart.title.toUpperCase()}</span>
                    <br />
                    <span className='text-[16px]'>{chart.description}</span>
                  </CardTitle>
                )}
                <ResponsiveContainer
                  width='100%'
                  height={heightMax}
                  className={'font-montserrat font-bold text-[14px] p-2'}
                >
                  <BarChart data={chart.data}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey='category' tickLine={false} tickMargin={8} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length && label) {
                          return (
                            <div className='bg-white border border-gray-300 rounded-lg p-2 shadow-lg'>
                              <p className='text-gray-800 font-semibold'>{`${label}`}</p>
                              <p className='text-gray-600'>{`Citas: ${payload[0].value}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
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
              <div key={chart.title} className={`w-full ${className}`}>
                {chart.title !== '' && chart.description !== '' && (
                  <CardTitle className='text-white bg-green-400 font-montserrat font-bold text-[18px] text-left mb-2 p-2 rounded-t-lg'>
                    <span className='text-[18px]'>{chart.title.toUpperCase()}</span>
                    <br />
                    <span className='text-[16px]'>{chart.description}</span>
                  </CardTitle>
                )}
                <ResponsiveContainer
                  width='100%'
                  height={heightMax}
                  className={'font-montserrat font-bold text-[14px] p-2'}
                >
                  <PieChart>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const total = chart.data.reduce((sum, entry) => sum + entry.value, 0);
                          const percentage = ((Number(payload[0].value) / total) * 100).toFixed(2);
                          return (
                            <div className='bg-white border border-gray-300 rounded-lg p-2 shadow-lg'>
                              <p className='text-gray-800 font-semibold'>{`${payload[0].name} : ${percentage}%`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />

                    <Legend verticalAlign='bottom' />
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

          case ChartTypeEnum.LINE:
            return (
              <div key={chart.title} className={`w-full ${className}`}>
                {chart.title !== '' && chart.description !== '' && (
                  <CardTitle className='text-white bg-green-400 font-montserrat font-bold text-[18px] text-left mb-2 p-2 rounded-t-lg'>
                    <span className='text-[18px]'>{chart.title.toUpperCase()}</span>
                    <br />
                    <span className='text-[16px]'>{chart.description}</span>
                  </CardTitle>
                )}
                <ResponsiveContainer
                  width='100%'
                  height={heightMax}
                  className={'font-montserrat font-bold text-[14px] p-2'}
                >
                  <LineChart data={chart.data}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey='category' tickLine={false} tickMargin={8} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length && label) {
                          return (
                            <div className='bg-white border border-gray-300 rounded-lg p-2 shadow-lg'>
                              <p className='text-gray-800 font-semibold'>{`${label}`}</p>
                              <p className='text-gray-600'>{`Citas: ${payload[0].value}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line dataKey='value' stroke='#8884d8' strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
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
