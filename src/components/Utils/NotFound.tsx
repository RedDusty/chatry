import IconInfo from "icons/IconInfo";
import React from "react";

const NotFound = () => {
  return (
    <section className="flex flex-col flex-1 justify-start items-start p-4 sm:p-12 lg:p-16">
      <div className="bg-sky-100 dark:bg-indigo-900 dark:bg-opacity-50 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center m-2 p-2 gap-2 lg:gap-6">
          <div className="w-16 h-16 lg:w-24 lg:h-24 fill-sky-500 dark:fill-indigo-500">
            <IconInfo />
          </div>
          <h1 className="text-sky-800 dark:text-indigo-200 text-xl sm:text-2xl lg:text-5xl">
            The page does not exist!
          </h1>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
