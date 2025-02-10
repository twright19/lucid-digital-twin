'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as SliderPrimitive from "@radix-ui/react-slider"

interface DataPoint {
  month: string;
  performanceScore: number;
  profitMargin: number;
  complianceScore: number;
}

const CustomSlider = ({ value, onValueChange, max, step, label }: {
  value: number;
  onValueChange: (value: number) => void;
  max: number;
  step: number;
  label: string;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <span className="text-sm text-gray-500">{value}%</span>
    </div>
    <SliderPrimitive.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      value={[value]}
      max={max}
      step={step}
      onValueChange={(values) => onValueChange(values[0])}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-blue-600 rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </SliderPrimitive.Root>
  </div>
);

const GovContractorTwin = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [basePerformance, setBasePerformance] = useState(80);
  const [baseProfit, setBaseProfit] = useState(15);
  const [baseCompliance, setBaseCompliance] = useState(90);
  const [volatility, setVolatility] = useState(20);

  const generateData = useCallback(() => {
    const newData: DataPoint[] = Array.from({length: 12}, (_, i) => {
      const variance = (Math.random() - 0.5) * volatility;
      return {
        month: `Month ${i+1}`,
        performanceScore: Math.max(0, Math.min(100, basePerformance + variance)),
        profitMargin: Math.max(0, Math.min(30, baseProfit + variance/2)),
        complianceScore: Math.max(0, Math.min(100, baseCompliance + variance))
      };
    });
    setData(newData);
  }, [basePerformance, baseProfit, baseCompliance, volatility]);

  useEffect(() => {
    generateData();
  }, [generateData]);

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <CustomSlider
            label="Base Performance Score"
            value={basePerformance}
            onValueChange={setBasePerformance}
            max={100}
            step={1}
          />
          <CustomSlider
            label="Base Profit Margin"
            value={baseProfit}
            onValueChange={setBaseProfit}
            max={30}
            step={0.5}
          />
          <CustomSlider
            label="Base Compliance Score"
            value={baseCompliance}
            onValueChange={setBaseCompliance}
            max={100}
            step={1}
          />
          <CustomSlider
            label="Market Volatility"
            value={volatility}
            onValueChange={setVolatility}
            max={50}
            step={1}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Settings Impact</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex justify-between">
              <span>Performance Score:</span>
              <span className="font-medium">{basePerformance}% ± {volatility}%</span>
            </li>
            <li className="flex justify-between">
              <span>Profit Margin:</span>
              <span className="font-medium">{baseProfit}% ± {volatility/2}%</span>
            </li>
            <li className="flex justify-between">
              <span>Compliance Score:</span>
              <span className="font-medium">{baseCompliance}% ± {volatility}%</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="h-96 w-full bg-gray-50 p-4 rounded-lg">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="performanceScore" stroke="#3b82f6" name="Performance Score" strokeWidth={2} />
            <Line type="monotone" dataKey="profitMargin" stroke="#10b981" name="Profit Margin" strokeWidth={2} />
            <Line type="monotone" dataKey="complianceScore" stroke="#ef4444" name="Compliance Score" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GovContractorTwin;