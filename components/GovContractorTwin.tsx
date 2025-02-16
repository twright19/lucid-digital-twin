import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DigitalTwinSimulator() {
  const [utilization, setUtilization] = useState(75);
  const [pricing, setPricing] = useState(200);
  const [staffing, setStaffing] = useState(10);
  const [retention, setRetention] = useState(85);
  const [pipeline, setPipeline] = useState(3);
  const [recurringRevenue, setRecurringRevenue] = useState(50);
  const [primeContracts, setPrimeContracts] = useState(70);
  const [turnover, setTurnover] = useState(10);
  const [overheadRatio, setOverheadRatio] = useState(4);
  const [data, setData] = useState([]);

  useEffect(() => {
    const profitMargin = ((utilization / 100) * pricing * staffing * (recurringRevenue / 100)).toFixed(2);
    const valuation = (profitMargin * 5 * (retention / 100) * (primeContracts / 100)).toFixed(2);
    setData([
      { name: "Now", value: parseFloat(profitMargin) },
      { name: "1 Year", value: parseFloat(profitMargin) * 1.1 },
      { name: "3 Years", value: parseFloat(valuation) },
    ]);
  }, [utilization, pricing, staffing, retention, pipeline, recurringRevenue, primeContracts, turnover, overheadRatio]);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Digital Twin Business Simulator</h1>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <label>Billable Utilization: {utilization}%</label>
            <Slider value={[utilization]} min={50} max={100} step={1} onValueChange={(v) => setUtilization(v[0])} />
          </div>
          <div>
            <label>Average Pricing ($/hr): {pricing}</label>
            <Slider value={[pricing]} min={100} max={500} step={10} onValueChange={(v) => setPricing(v[0])} />
          </div>
          <div>
            <label>Staffing: {staffing} employees</label>
            <Slider value={[staffing]} min={5} max={50} step={1} onValueChange={(v) => setStaffing(v[0])} />
          </div>
          <div>
            <label>Customer Retention: {retention}%</label>
            <Slider value={[retention]} min={50} max={100} step={1} onValueChange={(v) => setRetention(v[0])} />
          </div>
          <div>
            <label>Sales Pipeline Coverage (x Revenue): {pipeline}</label>
            <Slider value={[pipeline]} min={1} max={10} step={0.5} onValueChange={(v) => setPipeline(v[0])} />
          </div>
          <div>
            <label>Recurring Revenue: {recurringRevenue}%</label>
            <Slider value={[recurringRevenue]} min={0} max={100} step={5} onValueChange={(v) => setRecurringRevenue(v[0])} />
          </div>
          <div>
            <label>Prime vs. Subcontractor Mix: {primeContracts}% Prime</label>
            <Slider value={[primeContracts]} min={0} max={100} step={5} onValueChange={(v) => setPrimeContracts(v[0])} />
          </div>
          <div>
            <label>Employee Turnover Rate: {turnover}%</label>
            <Slider value={[turnover]} min={0} max={50} step={1} onValueChange={(v) => setTurnover(v[0])} />
          </div>
          <div>
            <label>Billable vs. Overhead Staff Ratio: {overheadRatio}x</label>
            <Slider value={[overheadRatio]} min={1} max={10} step={0.5} onValueChange={(v) => setOverheadRatio(v[0])} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Business Impact</h2>
          <p>Projected Profit Margin: ${data.length > 0 ? data[0].value : "-"}K</p>
          <p>Estimated Valuation: ${data.length > 2 ? data[2].value : "-"}K</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  );
}
