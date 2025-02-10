'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as SliderPrimitive from "@radix-ui/react-slider"

// ... CustomSlider component stays the same ...

const GovContractorTwin = () => {
  const [data, setData] = useState([]);
  const [basePerformance, setBasePerformance] = useState(80);
  const [baseProfit, setBaseProfit] = useState(15);
  const [baseCompliance, setBaseCompliance] = useState(90);
  const [volatility, setVolatility] = useState(20);

  const generateData = useCallback(() => {
    const newData = Array.from({length: 12}, (_, i) => {
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

  // ... rest of the component stays the same ...
};

export default GovContractorTwin;