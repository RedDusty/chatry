import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTypedSelector } from "redux/useTypedRedux";

type LeftBarButtonType = {
  link: string | Function;
  Icon: JSX.Element;
  canUserPass?: string | null | boolean;
  isShow?: boolean;
};

const HeaderButton = ({
  link,
  Icon,
  canUserPass,
  isShow,
}: LeftBarButtonType) => {
  const [isSelected, setSelected] = React.useState(false);

  const history = useLocation();
  const userUID = useTypedSelector((s) => s.user.uid);

  React.useEffect(() => {
    if (typeof link === "string") {
      if (history.pathname.split("/")[1] === link.split("/")[1]) {
        setSelected(true);
      } else {
        if (isSelected === true) {
          setSelected(false);
        }
      }
    }
  }, [history, link, isSelected]);

  if (canUserPass === false && userUID === null) {
    return <></>;
  }

  const innerData = () => {
    return (
      <span
        className={`${
          isSelected ? "opacity-75" : "group-hover:opacity-60"
        } w-full h-full p-2 sm:p-3`}
      >
        {Icon}
      </span>
    );
  };

  if (typeof link === "function") {
    return (
      <button
        className={`${
          isSelected
            ? "fill-sky-600 dark:fill-indigo-300 bg-sky-400 dark:bg-indigo-500 bg-opacity-30 dark:bg-opacity-30"
            : "fill-gray-500 dark:fill-gray-400 hover:fill-sky-600 dark:hover:fill-indigo-300 bg-sky-500 dark:bg-indigo-400 bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10"
        } ${
          isShow ? "flex" : "hidden sm:flex"
        } group w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:mx-auto sm:mt-2 flex-col items-center`}
        onClick={() => {
          link();
        }}
      >
        {innerData()}
      </button>
    );
  }

  return (
    <Link
      to={link}
      className={`${
        isSelected
          ? "fill-sky-600 dark:fill-indigo-300 bg-sky-400 dark:bg-indigo-500 bg-opacity-30 dark:bg-opacity-30"
          : "fill-gray-500 dark:fill-gray-400 hover:fill-sky-600 dark:hover:fill-indigo-300 bg-sky-500 dark:bg-indigo-400 bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10"
      } ${
        isShow ? "flex" : "hidden sm:flex"
      } group w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:mx-auto sm:mt-2 flex-col items-center`}
    >
      {innerData()}
    </Link>
  );
};

export default HeaderButton;
