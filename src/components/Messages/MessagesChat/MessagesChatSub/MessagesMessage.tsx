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
  const view = useTypedSelector((s) => s.user.userSettings.messageView);

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
  const isPlaceSep = view === "separately" && isCUOwner;

  return (
    <div
      className={`${
        isPlaceSep ? "self-end flex-row" : "self-start flex-row-reverse"
      } flex items-start gap-2 w-full min-h-fit`}
    >
      <div className="flex flex-col gap-1 w-full">
        <p
          className={`${
            isCUOwner
              ? "text-sky-600 dark:text-indigo-400"
              : "text-slate-700 dark:text-slate-300"
          } ${
            isPlaceSep && isCUOwner ? "self-end" : "self-start"
          } font-semibold`}
        >
          {user ? user.username : "Loading"}
        </p>
        <div
          className={`flex flex-col w-full gap-2 ${
            isPlaceSep && isCUOwner ? "self-end" : "self-start"
          }`}
        >
          {typeof m.message === "string" && m.message.length !== 0 ? (
            <p
              className={`${
                isCUOwner
                  ? "bg-sky-200 dark:bg-indigo-900"
                  : "bg-slate-200 dark:bg-slate-700"
              } px-2 py-1 w-fit whitespace-normal break-normal rounded-lg text-slate-900 dark:text-slate-200`}
            >
              {m.message}
            </p>
          ) : (
            <></>
          )}
          <MessagesMessageImages
            images={m.images}
            isOwner={isCUOwner}
            isPlaceSep={isPlaceSep}
          />
        </div>
        <p
          className={`${
            isPlaceSep ? "self-start" : "self-end"
          } text-xs text-slate-600 dark:text-slate-400`}
        >
          {timeConverter(m.time)}
        </p>
      </div>
      <div className="w-12 h-12 shrink-0 relative">
        <UserIcon
          avatar={user?.avatar}
          isOnline={user ? user.online : false}
          alt={user ? user.username : "Loading"}
        />
      </div>
    </div>
  );
};

export default MessagesMessage;

const MessagesMessageImages = ({
  images,
  isOwner,
  isPlaceSep,
}: {
  images?: string[];
  isOwner: boolean;
  isPlaceSep: boolean;
}) => {
  if (images) {
    return (
      <Masonry
        className={`w-full border-0 ${
          isPlaceSep && isOwner ? "border-r-4" : "border-l-4"
        } border-solid ${
          isOwner
            ? "border-sky-300 dark:border-indigo-900"
            : "border-slate-400 dark:border-slate-700"
        } ${isPlaceSep && isOwner ? "self-end" : "self-start"}`}
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

  if (isError) {
    return <></>;
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
