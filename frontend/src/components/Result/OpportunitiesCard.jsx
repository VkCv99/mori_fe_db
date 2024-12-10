import React from 'react'

function OpportunitiesCard({currentArea}) {

    return (
        <div 
          className={`mb-6 rounded-xl shadow-lg overflow-hidden relative`}
        >
          {/* Header */}
          <div className="p-4 bg-primary">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-light-gray bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                {/* <IconComponent className="w-6 h-6 text-light-gray" /> */}
                   <span className="text-2xl font-bold text-light-gray">{currentArea.name.charAt(0)}</span>
              </div>
              <h2 className="text-2xl font-bold text-light-gray">{currentArea.name}</h2>
            </div>
          </div>
    
          {/* Body */}
          <div className="p-6 bg-white">
            <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                Opportunities:
                </h4>
                <ul className="list-disc list-inside text-primary space-y-1 text-sm">
                    {currentArea.opportunities.map((opportunity, index) => (
                    <li key={index}>{opportunity}</li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
     
      );
}

export default OpportunitiesCard