import React from "react";

type InputCheckerType = {
  ifChecked: string;
  ifNotChecked: string;
  callback: (v: boolean) => void;
  id: string;
  defaultValue: boolean;
};

const InputChecker = ({
  ifChecked,
  ifNotChecked,
  callback,
  id,
  defaultValue,
}: InputCheckerType) => {
  const [isChecked, setChecked] = React.useState(defaultValue);

  return (
    <div className="text-lg flex items-center">
      <input
        className="w-0 h-0 hidden input-checker-input"
        type="checkbox"
        id={id}
        onChange={(e) => {
          setChecked(e.target.checked);
          callback(e.target.checked);
        }}
        checked={isChecked}
      />
      <span
        className={`px-1 ${
          isChecked
            ? "text-slate-600 dark:text-slate-300"
            : "text-sky-600 dark:text-indigo-400"
        }`}
      >
        {ifNotChecked}
      </span>
      <label
        htmlFor={id}
        className={`w-12 h-6 rounded-xl border-solid border cursor-pointer duration-150 block ${
          isChecked
            ? "bg-green-100 dark:bg-green-300 border-green-300 dark:border-green-500"
            : "bg-sky-100 dark:bg-indigo-300 border-sky-300 dark:border-indigo-400"
        }`}
      >
        <span
          className={`block h-6 w-6 border-solid border rounded-xl input-checker-span -mt-px ${
            isChecked
              ? "bg-green-500 dark:bg-green-700 border-green-700 dark:border-green-900"
              : "bg-sky-500 dark:bg-indigo-700 border-sky-700 dark:border-indigo-900"
          }`}
        ></span>
      </label>
      <span
        className={`px-1 ${
          isChecked
            ? "text-green-700 dark:text-green-300"
            : "text-slate-600 dark:text-slate-300"
        }`}
      >
        {ifChecked}
      </span>
    </div>
  );
};

export default InputChecker;
