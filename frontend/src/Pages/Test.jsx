import React from 'react'
import ResultCard from "components/Result/ResultCard"
import { Calendar, Eye, Shield, Sliders, AlertTriangle, LayoutTemplate, Repeat, MessageSquare } from 'lucide-react';

function Test() {
    const riskColor = (rating) => {
        const colors = [
          "bg-green-500",
          "bg-yellow-400",
          "bg-warm-red",
          "bg-red-500",
          "bg-red-700",
        ];
        return colors[rating - 1] || "bg-gray-500";
      };
    const resultValues =[
        {
          "name": "Operational Efficiency",
          "applicationTypes": ["Process Automation", "Resource Optimization", "Predictive Maintenance"],
          "horizon": { "period": "FY25", "number": 1 },
          "infoExposure": "Internal",
          "dataSensitivity": "Medium",
          "complexityOfUsage": "Moderate",
          "riskRating": 2,
          "opportunities": [
            "Automate repetitive tasks to reduce manual labor and errors",
            "Optimize resource allocation through predictive analytics"
          ],
          "suggestedRoute": "compose",
          "suggestedReuse": "existing app",
          "reasoning": [
            "Composing AI capabilities into existing apps can quickly enhance operational efficiency without significant disruption to current processes.",
            "Composing AI capabilities into existing apps can quickly enhance operational efficiency without significant disruption to current processes."
          ]
        },
        {
          "name": "Customer Value",
          "applicationTypes": ["Personalization", "Chatbots", "Recommendation Systems"],
          "horizon": { "period": "FY26", "number": 2 },
          "infoExposure": "External",
          "dataSensitivity": "High",
          "complexityOfUsage": "Low",
          "riskRating": 3,
          "opportunities": [
            "Personalize customer experiences using AI-driven insights",
            "Enhance customer support with intelligent chatbots"
          ],
          "suggestedRoute": "build",
          "suggestedReuse": "new app",
          "reasoning": [
            "Building a new AI-powered application can provide tailored solutions for enhancing customer value, ensuring a seamless integration of personalization and recommendation features.",
            "Building a new AI-powered application can provide tailored solutions for enhancing customer value, ensuring a seamless integration of personalization and recommendation features."
          ]
        },
        {
          "name": "Competitive Advantage",
          "applicationTypes": ["Predictive Analytics", "AI-Powered Products", "Market Intelligence"],
          "horizon": { "period": "FY27", "number": 3 },
          "infoExposure": "Confidential",
          "dataSensitivity": "Very High",
          "complexityOfUsage": "High",
          "riskRating": 4,
          "opportunities": [
            "Leverage AI for faster, data-driven decision making",
            "Develop AI-powered products to differentiate from competitors"
          ],
          "suggestedRoute": "shape",
          "suggestedReuse": "platform",
          "reasoning": [
            "Shaping a comprehensive AI platform can provide a foundation for multiple competitive advantage applications, allowing for scalability and consistent innovation.",
            "Shaping a comprehensive AI platform can provide a foundation for multiple competitive advantage applications, allowing for scalability and consistent innovation."
          ]
        },
        {
          "name": "Reporting Intelligence",
          "applicationTypes": ["Automated Reporting", "Data Visualization", "Real-time Analytics"],
          "horizon": { "period": "FY25", "number": 1 },
          "infoExposure": "Internal",
          "dataSensitivity": "Medium",
          "complexityOfUsage": "Low",
          "riskRating": 2,
          "opportunities": [
            "Generate automated, insightful reports from complex data sets",
            "Provide real-time analytics dashboards for better visibility"
          ],
          "suggestedRoute": "compose",
          "suggestedReuse": "existing app",
          "reasoning": [
            "Composing AI capabilities into existing reporting tools can quickly enhance intelligence without requiring extensive new development or training.",
            "Composing AI capabilities into existing reporting tools can quickly enhance intelligence without requiring extensive new development or training."
          ]
        },
        {
          "name": "Technology Development",
          "applicationTypes": ["AI Research", "Machine Learning Integration", "AI Infrastructure"],
          "horizon": { "period": "FY27", "number": 3 },
          "infoExposure": "Confidential",
          "dataSensitivity": "High",
          "complexityOfUsage": "Very High",
          "riskRating": 5,
          "opportunities": [
            "Accelerate R&D processes with AI-assisted simulations",
            "Implement machine learning models to improve existing systems"
          ],
          "suggestedRoute": "shape",
          "suggestedReuse": "platform",
          "reasoning": [
            "Shaping a robust AI development platform will provide the necessary infrastructure and tools for ongoing technology advancement and integration across various applications.",
            "Shaping a robust AI development platform will provide the necessary infrastructure and tools for ongoing technology advancement and integration across various applications."
          ]
        }
      ];
      const step = 3
  return (
    <div className="h-full overflow-y-auto w-full p-6 bg-gray-800 bg-opacity-30 rounded-lg backdrop-blur-sm overflow-hidden">
    {/* <div className="h-full w-full overflow-y-auto p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl"> */}
      {resultValues.map((currentArea, index) => (
        <div className="mb-6 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-primary">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-light-gray bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-light-gray">{currentArea.name.charAt(0)}</span>
            </div>
            <h2 className="text-2xl font-bold text-light-gray">{currentArea.name}</h2>
          </div>
        </div>
  
        {/* Body */}
        <div className="p-6 bg-white">
          {step < 3 && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Application Types:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentArea.applicationTypes.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 bg-warm-red text-light-gray rounded-full text-xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Horizon:
                  </h4>
                  <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {currentArea.horizon.period} (H{currentArea.horizon.number})
                  </span>
                </div>
              </div>
  
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Info Exposure:
                  </h4>
                  <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                    <Eye className="w-3 h-3 inline mr-1" />
                    {currentArea.infoExposure}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Data Sensitivity:
                  </h4>
                  <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                    <Shield className="w-3 h-3 inline mr-1" />
                    {currentArea.dataSensitivity}
                  </span>
                </div>
              </div>
  
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Complexity of Usage:
                  </h4>
                  <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                    <Sliders className="w-3 h-3 inline mr-1" />
                    {currentArea.complexityOfUsage}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Risk Rating:
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs text-light-gray ${riskColor(
                      currentArea.riskRating
                    )}`}
                  >
                    <AlertTriangle className="w-3 h-3 inline mr-1" />
                    {currentArea.riskRating} / 5
                  </span>
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Suggested Route:
                  </h4>
                  <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                    <LayoutTemplate className="w-3 h-3 inline mr-1" />
                    {currentArea.suggestedRoute}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                    Suggested Reuse:
                  </h4>
                  <span className="px-2 py-1 bg-primary text-light-gray rounded-full text-xs">
                    <Repeat className="w-3 h-3 inline mr-1" />
                    {currentArea.suggestedReuse}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-dusky-teal mb-2">
                  Reasoning:
                </h4>
                <div className="bg-light-gray p-3 rounded-md">
                <ul className="space-y-2">
                  {currentArea.reasoning.map((statement, index) => (
                    <li key={index} className="flex items-start">
                      <MessageSquare className="w-4 h-4 mr-2 text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm text-primary">{statement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </>
          )}
          <div className="mt-4">
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
      ))}
    {/* </div> */}
      <button 
          className={`w-full space-x-2 p-2 rounded-lg border transition duration-200 
              bg-gray-800 text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
            // onClick={handleSubmit}
          >
          Go To the Next Step
      </button>
  </div>
  )
}

export default Test