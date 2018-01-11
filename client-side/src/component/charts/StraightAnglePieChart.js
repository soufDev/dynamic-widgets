import React from 'react';
import { PieChart, Pie } from 'recharts';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const StraightAnglePieChart = () => (
  <Card>
    <PieChart width={400} height={200}>
      <Pie
        startAngle={180}
        endAngle={0}
        data={data}
        cx={140}
        cy={160}
        outerRadius={110}
        fill="#8884d8"
        label
      />
    </PieChart>
  </Card>
);

export default StraightAnglePieChart;
