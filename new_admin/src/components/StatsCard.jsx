import React from "react";

const StatsCard = ({ title, value, isWarning = false }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <p className={`text-2xl font-semibold ${isWarning ? 'text-red-600' : 'text-gray-900'}`}>
                  {value}
                </p>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;