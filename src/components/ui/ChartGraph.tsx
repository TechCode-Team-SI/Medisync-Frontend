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
  config: Record<string, { label: string; color: string }>;
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

const ChartGraph: React.FC<UiBarChartProps> = ({ dataChart, config, className = '' }) => {
  const getTotal = (selectedLabel: string) => {
    const selectedGraph = dataChart.find((chart) => chart.title === selectedLabel);
    if (!selectedGraph || !selectedGraph.data) return 0;
    return selectedGraph.data.reduce((acc, item) => acc + item.value, 0);
  };

  return (
    <div className={`rounded-lg bg-white ${className} flex flex-wrap items-center`}>
      {dataChart.map((chart) => {
        switch (chart.type) {
          case ChartTypeEnum.BAR:
            return (
              <div key={chart.title} className='w-full lg:w-1/2 p-2'>
                <CardTitle className='text-green-400 font-montserrat font-bold text-[18px] text-left mb-2'>
                  <span className='text-[18px]'>{chart.title.toUpperCase()}</span>
                  <br />
                  <span className='text-[16px]'>{chart.description}</span>
                </CardTitle>
                <ResponsiveContainer width='100%' height={400} className={'font-montserrat font-bold text-[14px]'}>
                  <BarChart data={chart.data}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey='category' tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                    <Tooltip />
                    <Bar dataKey='value' radius={4}>
                      {chart.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={config[entry.category]?.color || '#539091'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          case ChartTypeEnum.PIE:
            return (
              <div key={chart.title} className='w-full lg:w-1/2 p-2'>
                <CardTitle className='text-green-400 font-montserrat font-bold text-[18px] text-left mb-2'>
                  <span className='text-[18px]'>{chart.title.toUpperCase()}</span>
                  <br />
                  <span className='text-[16px]'>{chart.description}</span>
                </CardTitle>
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
                        const color = config[entry.category]?.color || '#539091';
                        return <Cell key={`cell-${index}`} fill={color} />;
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
