const SkeletonLoader = () => {
    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-gray-300 animate-pulse">
          <div className="h-20 bg-gray-400 rounded mb-6"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-8 bg-gray-400 rounded mb-4 w-3/4 mx-auto"></div>
          ))}
        </div>
  
        {/* Content Area */}
        <div className="flex-1 p-6 space-y-6">
          {/* Header Skeleton */}
          <div className="h-16 bg-gray-400 rounded mb-6 animate-pulse"></div>
  
          {/* Main Content - Skeleton for Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-300 h-40 rounded-md animate-pulse"></div>
            ))}
          </div>
  
          {/* Table Skeleton */}
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  {[...Array(4)].map((_, index) => (
                    <th key={index} className="h-12 bg-gray-300 animate-pulse"></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {[...Array(4)].map((_, colIndex) => (
                      <td key={colIndex} className="h-10 bg-gray-300 animate-pulse"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  

 
