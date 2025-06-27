import React from 'react'

const TabsComponent = ({ tabs, activeTab, handleTabClick }) => {
  console.log('activetab', activeTab)
  return (
    <React.Fragment>
      <div className="flex border-b border-gray-700 space-x-6 text-white mb-6 ">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => handleTabClick(tabItem.id)}
            className={`flex items-center justify-center gap-2 p-1 transition-all duration-200 ${activeTab === tabItem.id
                ? 'border-b-2 border-blue-500 text-blue-400 font-semibold'
                : 'hover:text-blue-300 border-b-2 border-gray-900 text-gray-400'
              }`}
          >
            <span>{tabItem.icon}</span>
            <span>{tabItem.label}</span>
          </button>
        ))}
      </div>
    </React.Fragment>
  )
}

export default TabsComponent