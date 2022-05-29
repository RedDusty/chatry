import React from "react";
import Masonry from "react-masonry-component";
import { useTypedSelector } from "redux/useTypedRedux";
import UserIcon from "components/Utils/UserIcon";
import { MessageType } from "typings/cacheTypes";
import { UserShortType } from "typings/UserTypes";
import timeConverter from "scripts/timeConverter";
import { getUser } from "scripts/usersCache";

const MessagesMessage = ({ m }: { m: MessageType }) => {
  const [user, setUser] = React.useState<UserShortType | null>(null);
  const cu = useTypedSelector((s) => s.user.uid);

  React.useEffect(() => {
    if (m.user !== "system") getUser(m.user, setUser);
  }, [m.user]);

  if (m.user === "system") {
    return (
      <div className="text-slate-700 dark:text-slate-300 font-semibold text-lg self-center my-4">
        {m.message}
      </div>
    );
  }

  const isCUOwner = user ? cu === user.uid : false;

  const usernameColor = () => {
    if (m.error) {
      return "text-red-600 dark:text-red-400";
    } else if (isCUOwner) {
      return "text-sky-600 dark:text-indigo-400";
    } else return "text-slate-700 dark:text-slate-300";
  };

  const messageColor = () => {
    if (m.error) {
      return "bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-200";
    } else if (isCUOwner) {
      return "bg-sky-200 dark:bg-indigo-900 text-slate-900 dark:text-slate-200";
    } else
      return "bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-200";
  };

  return (
    <div className="flex items-start gap-2 w-full min-h-fit">
      <div className="w-12 h-12 shrink-0 relative">
        <UserIcon
          avatar={user?.avatar}
          isOnline={user ? user.online : false}
          alt={user ? user.username : "Loading"}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <p className={`${usernameColor()} font-semibold`}>
          {user ? user.username : "Loading"}
        </p>
        <div className="flex flex-col w-full gap-2">
          {typeof m.message === "string" && m.message.length !== 0 ? (
            <p
              className={`${messageColor()} px-2 py-1 w-fit whitespace-normal break-normal rounded-lg`}
            >
              {m.message}
            </p>
          ) : (
            <></>
          )}
          <MessagesMessageImages images={m.images} isOwner={isCUOwner} />
        </div>
        <p
          className={`text-xs ${
            m.error
              ? "text-red-700 dark:text-red-400 font-semibold"
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          {m.error ? "Not sent" : timeConverter(m.time)}
        </p>
      </div>
      {m.error ? <div className="re"></div> : <></>}
    </div>
  );
};

export default MessagesMessage;

const MessagesMessageImages = ({
  images,
  isOwner,
}: {
  images?: string[];
  isOwner: boolean;
}) => {
  if (images && images.length !== 0) {
    return (
      <Masonry
        className={`w-full border-0 border-solid border-l-4 ${
          isOwner
            ? "border-sky-300 dark:border-indigo-700"
            : "border-slate-400 dark:border-slate-500"
        }`}
        options={{
          horizontalOrder: true,
        }}
      >
        {images.map((i, idx) => {
          return (
            <MessagesMessageImageCard
              image={i}
              imagesLength={images.length}
              key={i + idx}
            />
          );
        })}
      </Masonry>
    );
  }

  return <></>;
};

const MessagesMessageImageCard = ({
  image,
  imagesLength,
}: {
  image: string;
  imagesLength: number;
}) => {
  const [isError, setError] = React.useState(false);
  const [isZoom, setZoom] = React.useState(false);
  const regex = image.match(/images%2F([^.]*)/);
  let hash = "";
  if (regex) hash = regex[1];

  const copyURLHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigator.clipboard.writeText(image);
    const { currentTarget } = e;
    currentTarget.innerText = "Copied";
    currentTarget.className = "text-green-300 dark:text-green-500";
    setTimeout(() => {
      currentTarget.innerText = "Copy URL";
      currentTarget.className =
        "text-slate-100 dark:text-slate-300 hover:text-sky-300 dark:hover:text-indigo-300 hover:underline";
    }, 750);
  };

  const copyHASHHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigator.clipboard.writeText(hash);
    const { currentTarget } = e;
    currentTarget.innerText = "Copied";
    currentTarget.className = "text-green-300 dark:text-green-500";
    setTimeout(() => {
      currentTarget.innerText = "Copy HASH";
      currentTarget.className =
        "text-slate-100 dark:text-slate-300 hover:text-sky-300 dark:hover:text-indigo-300 hover:underline";
    }, 750);
  };

  if (isError) {
    return (
      <div className="m-2 bg-slate-300 dark:bg-slate-700 w-36 h-24 rounded-md err-load">
        <div className="bg-black bg-opacity-50 dark:bg-opacity-25 w-full h-full rounded-md flex flex-col justify-center items-center gap-2">
          <p className="text-slate-100 dark:text-slate-300">Couldn't load</p>
          <button
            className="text-slate-100 dark:text-slate-300 hover:text-sky-300 dark:hover:text-indigo-300 hover:underline"
            onClick={copyURLHandler}
            title={image}
          >
            Copy URL
          </button>
          <button
            className="text-slate-100 dark:text-slate-300 hover:text-sky-300 dark:hover:text-indigo-300 hover:underline"
            onClick={copyHASHHandler}
            title={hash}
          >
            Copy Hash
          </button>
        </div>
      </div>
    );
  }

  const sizeX = () => {
    if (imagesLength >= 5) return "w-36";
    if (imagesLength >= 3) return "w-48";
    return "w-64";
  };

  return (
    <div
      className="m-2 group cursor-pointer"
      onClick={() => {
        setZoom(!isZoom);
      }}
    >
      <div
        className={
          isZoom
            ? "fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50"
            : sizeX()
        }
      >
        <img
          className={`${
            isZoom ? "w-full h-full object-contain" : `object-cover ${sizeX()}`
          } transition-all rounded-lg`}
          src={image}
          alt=""
          onError={() => setError(true)}
        />
      </div>
    </div>
  );
};
