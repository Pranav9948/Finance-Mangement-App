import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const PieCharts = ({width,height,outerRadius}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const data = [
    { name: "Entertainment", students:50 },
    { name: "Bills", students: 750 },
    { name: "Dining Out", students: 75 },
    { name: "personal care", students: 100},
  ];

  const COLORS = ["#277C78", "#626070", "#82C9D7", "#F2CDAC"];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className="">
        <PieChart width={width} height={height}>
          <Pie
            activeIndex={activeIndex}
            data={data}
            dataKey="students"
            outerRadius={outerRadius}
            fill="green"
            onMouseEnter={onPieEnter}
            style={{ cursor: "pointer", outline: "none" }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

     
    </div>
  );
};

export default PieCharts;


