import React from "react";
import IconShow from "icons/IconShow";
import IconHide from "icons/IconHide";

type inputTypeType = "text" | "password";

type AuthInputType = {
  inputType: inputTypeType;
  setState: (v: string) => void;
  state: string;
  autoComplete: string;
  placeholder: string;
};

const AuthInput = ({
  inputType,
  setState,
  state,
  autoComplete,
  placeholder,
}: AuthInputType) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputTypeResult = () => {
    if (inputType === "password" && showPassword) {
      return "text";
    } else {
      return inputType;
    }
  };

  return (
    <div
      className={`text-lg w-full ${inputType === "password" ? "flex" : "block"}`}
    >
      <input
        type={inputTypeResult()}
        className="bg-white text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 focus:text-black dark:focus:text-white bg-opacity-10 border border-solid border-black dark:border-white border-opacity-10 dark:border-opacity-10 hover:border-opacity-25 dark:hover:border-opacity-25 focus:border-opacity-50 dark:focus:border-opacity-50 w-full px-3 py-2 rounded-md"
        placeholder={placeholder}
        onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
        onChange={(e) => {
          setState(e.target.value.toString().trim().replaceAll(" ", ""));
        }}
        value={state}
        autoComplete={autoComplete}
      />
      {inputType === "password" ? (
        <button
          className="bg-white fill-gray-500 dark:fill-gray-400 hover:fill-gray-700 dark:hover:fill-gray-200 focus:fill-black dark:focus:fill-white bg-opacity-10 border border-solid border-black dark:border-white border-opacity-10 dark:border-opacity-10 hover:border-opacity-25 dark:hover:border-opacity-25 focus:border-opacity-50 dark:focus:border-opacity-50 rounded-md p-2 ml-2 w-12 h-12 flex justify-center items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IconShow /> : <IconHide />}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AuthInput;
