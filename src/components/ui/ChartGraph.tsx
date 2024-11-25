import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Pie, PieChart, Cell, Label } from 'recharts';

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

const ChartGraph: React.FC<UiBarChartProps> = ({ dataBar, dataPie, config, className = '' }) => {
  const getTotal = (selectedLabel: string) => {
    const selectedGraph = dataPie.find((graph) => graph.label === selectedLabel);
    if (!selectedGraph) return 0;
    return selectedGraph.data.reduce((acc, item) => acc + item.probabilities, 0);
  };

  return (
    <div className={`rounded-lg bg-white ${className}`}>
      {dataBar.map((Graph) => (
        <div key={Graph.label} className=' p-5'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left mb-2'>
            {Graph.label} - {Graph.description}
          </CardTitle>
          <BarChart data={Graph.data} width={500} height={400}>
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
        </div>
      ))}
      {dataPie.map((Graph) => (
        <div key={Graph.label} className=' p-5'>
          <CardTitle className=' text-green-400 font-montserrat font-bold text-[18px] text-left mb-2'>
            {Graph.label} - {Graph.description}
          </CardTitle>
          <PieChart width={500} height={400}>
            <Tooltip />
            <Pie
              data={Graph.data}
              dataKey='probabilities'
              nameKey='label'
              innerRadius={60}
              outerRadius={120}
              strokeWidth={5}
            >
              {Graph.data.map((entry, index) => {
                const color = config[entry.label]?.color || '#539091';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    const total = getTotal(Graph.label);

                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
                          {total.toLocaleString() + '%'}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </div>
      ))}
    </div>
  );
};

export default ChartGraph;
