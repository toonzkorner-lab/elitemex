import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const trafficData = [
  { name: 'Mon', visitors: 1200 },
  { name: 'Tue', visitors: 1350 },
  { name: 'Wed', visitors: 1100 },
  { name: 'Thu', visitors: 1500 },
  { name: 'Fri', visitors: 1800 },
  { name: 'Sat', visitors: 2200 },
  { name: 'Sun', visitors: 1950 },
];

const productViews = [
  { name: 'Industrial', views: 850 },
  { name: 'Epoxy', views: 720 },
  { name: 'Microcement', views: 650 },
  { name: 'Commercial', views: 500 },
  { name: 'Residential', views: 300 },
];

export default function AnalyticsDash() {
  return (
    <>
      <div className="admin-header">
        <h1>Site Analytics</h1>
        <p>Traffic and engagement overview for the last 7 days.</p>
      </div>

      <div className="chart-card">
        <h3>Visitor Traffic</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#A0A0A5" />
              <YAxis stroke="#A0A0A5" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1C1C1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#0A84FF' }}
              />
              <Line type="monotone" dataKey="visitors" stroke="#0A84FF" strokeWidth={3} dot={{ r: 4, fill: '#0A84FF' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h3>Top Products & Industries (Views)</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={productViews} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#A0A0A5" />
              <YAxis dataKey="name" type="category" stroke="#A0A0A5" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1C1C1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#34C759' }}
              />
              <Bar dataKey="views" fill="#34C759" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
