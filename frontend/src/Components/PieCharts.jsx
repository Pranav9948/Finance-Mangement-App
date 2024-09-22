import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Cell, LabelList } from "recharts";

const PieCharts = ({ width, height, outerRadius, pieData }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  let pieValue = "targetAmount";

  const bills = useSelector((state) => state.billState.bills) || [];
  const transactions =
    useSelector((state) => state.transactionState.transactions) || [];

  const data = pieData?.map((item) => ({
    name: item.category,
    currentAmount: item.currentAmount,
    targetAmount: item.targetAmount,
    color: item.color,
  }));

  if (transactions.length > 0 || bills.length > 0) {
    pieValue = "currentAmount";
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className="">
        <PieChart width={width} height={height}>
          <Pie
            activeIndex={activeIndex}
            isAnimationActive={true}
            data={data}
            dataKey={pieValue}
            outerRadius={outerRadius}
            fill="green"
            onMouseEnter={onPieEnter}
            style={{ cursor: "pointer", outline: "none" }}
          >

                


            {data?.map((entry, index) => (
        
                
                <Cell key={entry.name} fill={entry.color} />
            
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default PieCharts;
