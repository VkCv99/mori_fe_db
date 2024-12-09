import React from 'react';
import { Calendar, Activity, Target, Layers, CheckCircle } from 'lucide-react';

const AIStrategyCard = ({ app, onSelect, isSelected, index }) => {
  const getRiskColor = (risk) => {
    if (risk.includes('Low')) return 'bg-green-500';
    if (risk.includes('Medium')) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const getImpactColor = (impact) => {
    if (impact.includes('Medium')) return 'bg-blue-400';
    if (impact.includes('High')) return 'bg-purple-500';
    return 'bg-indigo-600';
  };

  return (
    <div 
        className={`mb-6 overflow-hidden g-white rounded-xl shadow-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}
        onClick={() => onSelect(app)}
        >
      {/* Strategy Header */}
      <div className="bg-primary p-6 relative">
        <h2 className="text-xl font-bold text-light-gray">AI Implementation Strategy</h2>
        {/* <p className="text-sm text-white/90 mt-2 max-w-[85%]">{strategy}</p> */}
        <div className="absolute top-6 right-8 z-10">
            <CheckCircle 
            className={`w-6 h-6 ${isSelected ? 'text-green-300 ' : 'text-light-gray'}`} 
            fill={isSelected ? "green-400" : "transparent"}
            />
        </div>
      </div>

      <div className="p-6">
        {/* Applications Grid */}
        <div className="space-y-6">
          {/* {applications.map((app, index) => ( */}
            <div 
              key={app.category_name}
              className={`p-4 rounded-lg ${
                index%2 === 0 ? 'bg-blue-50' : 'bg-purple-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-black">{app.category_name}</h3>
                  <p className="text-sm text-black">{app.value_area_name}</p>
                </div>
                <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary text-light-gray inline-flex items-center justify-center">
                  <Layers className="w-4 h-4 mr-2" />
                  {app.ai_use_class}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-black">Risk & Complexity</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm ${getRiskColor(app.riskComplexity)}`}>
                    <Activity className="w-4 h-4 mr-2" />
                    {app.riskComplexity}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-black">Impact</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm ${getImpactColor(app.impact)}`}>
                    <Target className="w-4 h-4 mr-2" />
                    {app.impact}
                  </div>
                </div>
              </div>

              <p className="text-sm text-black mb-4">{app.description}</p>

              <div className="flex items-center space-x-2 text-sm text-black">
                <Calendar className="w-4 h-4" />
                <span>{app.horizonClassification}</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIStrategyCard