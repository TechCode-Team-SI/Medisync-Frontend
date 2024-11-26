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
} from 'recharts';

import { Histogram, Tart } from 'src/services/api/statistics/interface';

import { CardTitle } from './card';

interface UiBarChartProps {
  dataBar: Histogram[];
  dataPie: Tart[];
  config: Record<string, { label: string; color: string }>;
  height?: string;
  width?: string;
  className?: string;
}

const toCapitalCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

interface CustomizedLabelProps {
  x: number;
  y: number;
  value: string;
}

const renderCustomizedLabel = ({ x, y, value }: CustomizedLabelProps) => {
  return (
    <text
      x={x}
      y={y}
      fill='rgb(83, 144, 145)'
      textAnchor='middle'
      dominantBaseline='central'
      className='font-montserrat font-bold text-[14px] text-left mb-2'
    >
      {value}
    </text>
  );
};

const ChartGraph: React.FC<UiBarChartProps> = ({ dataBar, dataPie, config, className = '' }) => {
  return (
    <div className={`rounded-lg bg-white ${className} flex flex-wrap items-center`}>
      {dataBar.map((Graph) => (
        <div key={Graph.label} className='w-full lg:w-1/2 p-2'>
          <CardTitle className='text-green-400 font-montserrat font-bold text-[18px] text-left mb-2'>
            <span className='text-[18px]'> {Graph.label.toUpperCase()} </span>
            <br />
            <span className='text-[16px]'>{Graph.description} </span>
          </CardTitle>
          <ResponsiveContainer width='100%' height={400}>
            <BarChart data={Graph.data.map((entry) => ({ ...entry, label: toCapitalCase(entry.label) }))}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey='label' tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <Tooltip />
              <Bar dataKey='frequency' radius={4}>
                {Graph.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={config[entry.label]?.color || '#539091'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
      {dataPie.map((Graph) => (
        <div key={Graph.label} className='w-full lg:w-1/2 p-2'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left mb-2'>
            <span className='text-[18px]'> {Graph.label.toUpperCase()} </span>
            <br />
            <span className='text-[16px]'>{Graph.description} </span>
          </CardTitle>
          <ResponsiveContainer width='100%' height={400}>
            <PieChart>
              <Tooltip />
              <Legend verticalAlign='top' />
              <Pie
                data={Graph.data.map((entry) => ({ ...entry, label: toCapitalCase(entry.label) }))}
                dataKey='probabilities'
                nameKey='label'
                outerRadius={120}
                innerRadius={16}
                strokeWidth={5}
                labelLine={false}
                label={renderCustomizedLabel}
                cornerRadius={8}
              >
                {Graph.data.map((entry, index) => {
                  const color = config[entry.label]?.color || '#539091';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default ChartGraph;
