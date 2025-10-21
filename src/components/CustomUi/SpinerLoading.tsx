import React from "react";

export const SpinerLoading = () => {
  return (
    <div>
      <div className="col-span-1 md:col-span-2 mt-7" dir="rtl">
        <div className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="mr-3">جاري التحميل...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
