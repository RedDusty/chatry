import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTypedSelector } from "redux/useTypedRedux";
import { setUser } from "scripts/usersCache";
import Masonry from "react-masonry-component";
import {
  imageType,
  lastUsernamesType,
  UserPrivacyType,
} from "typings/UserTypes";
import ProfileInfo from "components/Profile/ProfileInfo";
import ProfileActions from "components/Profile/ProfileActions";
import ProfileUploadImages from "components/Profile/ProfileUploadImages";
import IconInfo from "icons/IconInfo";
import IconHide from "icons/IconHide";
import IconCross from "icons/IconCross";
import IconAttachment from "icons/IconAttachment";
import { socketDeleteImage } from "socketio";

type errorType =
  | "NOT_FOUND"
  | "FORBIDDEN_PRIVATE"
  | "FORBIDDEN_FRIEND"
  | null
  | true;

type UserProfileType = {
  username: string;
  uid: string;
  online: boolean | number;
  avatar: string | null;
  privacy: UserPrivacyType;
  usernames: lastUsernamesType[];
  images: imageType[];
};

const Profile = () => {
  const [pUser, setPUser] = React.useState<UserProfileType | null>(null);
  const [error, setError] = React.useState<errorType>(null);
  const [isUploadingImages, setUploadingImages] = React.useState(false);
  const [isImageZoomed, setImageZoom] = React.useState<imageType | null>(null);
  const cu = useTypedSelector((s) => s.user.uid);
  const images = useTypedSelector((s) => s.user.images);

  const url = window.location.pathname.split("/").pop();

  React.useEffect(() => {
    setError(null);
    if (pUser?.uid !== window.location.pathname.split("/")[2]) {
      axios
        .get("/api/user", {
          params: {
            user: window.location.pathname.split("/")[2],
          },
        })
        .then((v) => {
          if (v.data) {
            if (v.data.error) setError(v.data.error);
            if (v.data.user) {
              setPUser(v.data.user);
              setUser(v.data.user);
            }
          }
        })
        .catch((e) => {
          setError(e.error || true);
        });
    }
  }, [pUser?.uid, url, cu]);

  if (error === "NOT_FOUND") {
    return (
      <section className="cont flex-col justify-start items-start p-4 sm:p-12 lg:p-16">
        <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-50 rounded-xl">
          <div className="flex flex-col sm:flex-row items-center m-2 p-2 gap-2 lg:gap-6">
            <div className="w-16 h-16 lg:w-24 lg:h-24 fill-red-500">
              <IconInfo />
            </div>
            <h1 className="text-red-800 dark:text-red-200 text-xl sm:text-2xl lg:text-5xl">
              {error === "NOT_FOUND" && "This account does not exist!"}
            </h1>
          </div>
          <div className="m-2 p-2 flex flex-col gap-4 mt-4 sm:text-lg lg:text-xl text-zinc-900 dark:text-zinc-200">
            <p>
              If you're sure the account exists, try searching for it by
              <Link to={"/people?search="} className="link">
                &nbsp;name&nbsp;
              </Link>
              or entering an
              <Link to={"/people?search=id"} className="link">
                &nbsp;id&nbsp;
              </Link>
              .
            </p>
            <p>
              To
              <Link to={"/people?search=id"} className="link">
                &nbsp;search&nbsp;
              </Link>
              by id, put a "#" at the beginning of the search or click the link
              in that line.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cont flex-col justify-start items-start p-2 sm:p-12 lg:p-16 h-full">
      {!isUploadingImages && (
        <ProfileInfo
          avatar={pUser ? pUser.avatar : undefined}
          username={pUser ? pUser.username : undefined}
          online={pUser ? pUser.online : false}
          uid={pUser ? pUser.uid : undefined}
          lastUsernames={pUser ? pUser.usernames : []}
          error={error}
        />
      )}
      {pUser ? (
        pUser.uid !== cu && (
          <ProfileActions uid={pUser.uid} privacy={pUser!.privacy} />
        )
      ) : (
        <></>
      )}
      {pUser && pUser.uid === cu ? (
        <ProfileUploadImages
          isUploadingImages={isUploadingImages}
          setUploadingImages={setUploadingImages}
          uid={pUser?.uid}
        />
      ) : (
        <></>
      )}
      {!isUploadingImages && (
        <div
          className={`h-px w-full px-4 ${
            error
              ? "bg-red-500 dark:bg-red-400"
              : "bg-sky-600 dark:bg-indigo-800"
          } mt-4 shrink-0`}
        ></div>
      )}
      {pUser &&
      pUser.uid === cu &&
      images.length !== 0 &&
      !isUploadingImages ? (
        <Masonry
          options={{ transitionDuration: 0.1 }}
          className="w-full h-full overflow-y-auto"
        >
          {images.map((i, idx) => {
            return (
              <ProfileCardImage
                image={i}
                setImageZoom={setImageZoom}
                key={"url" + idx}
              />
            );
          })}
        </Masonry>
      ) : (
        <></>
      )}
      {pUser &&
      pUser.uid !== cu &&
      pUser.images.length !== 0 &&
      !isUploadingImages ? (
        <Masonry
          options={{ transitionDuration: 0.1 }}
          className="w-full h-full overflow-y-auto"
        >
          {pUser.images.map((i, idx) => {
            return (
              <ProfileCardImage
                image={i}
                setImageZoom={setImageZoom}
                key={"url" + idx}
              />
            );
          })}
        </Masonry>
      ) : (
        <></>
      )}
      {isImageZoomed ? (
        <ProfileZoomedImage
          image={isImageZoomed}
          setImageZoom={setImageZoom}
          isOwner={pUser ? pUser.uid === cu : false}
        />
      ) : (
        <></>
      )}
      {error === "FORBIDDEN_FRIEND" || error === "FORBIDDEN_PRIVATE" ? (
        <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-50 rounded-xl mx-auto sm:ml-0 mt-4">
          <div className="flex flex-col sm:flex-row items-center m-2 p-2 gap-2 lg:gap-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 fill-red-500">
              <IconInfo />
            </div>
            <h1 className="text-red-800 dark:text-red-200 text-xl sm:text-2xl lg:text-3xl">
              {error === "FORBIDDEN_FRIEND" &&
                "You need to be a friend to view this profile."}
              {error === "FORBIDDEN_PRIVATE" &&
                "You need to be an authorized to view this profile."}
            </h1>
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Profile;

type ProfileZoomedImageType = {
  image: imageType;
  isOwner: boolean;
  setImageZoom: (v: imageType | null) => void;
};

const ProfileZoomedImage = ({
  image,
  isOwner,
  setImageZoom,
}: ProfileZoomedImageType) => {
  const [isShow, setShow] = React.useState(true);
  const [isDelete, setDelete] = React.useState(false);

  return (
    <div className="fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0 z-50">
      <img
        className="w-full h-full object-contain"
        src={image.url}
        alt=""
        onClick={() => setImageZoom(null)}
      />
      {isShow ? (
        <>
          {isOwner ? (
            <button
              className="bg-red-500 fill-red-400 hover:fill-red-500 bg-opacity-50 hover:bg-red-900 hover:bg-opacity-100 shadow-md w-12 h-12 rounded-full p-2 absolute bottom-20 right-4"
              onClick={() => setDelete(true)}
              title="Delete image"
            >
              <IconCross />
            </button>
          ) : (
            <></>
          )}
          <button
            className="bg-slate-300 fill-white bg-opacity-50 hover:bg-slate-600 hover:bg-opacity-100 shadow-md w-12 h-12 rounded-full p-2 absolute bottom-4 right-4"
            onClick={() => {
              setShow(false);
            }}
            title="Hide buttons"
          >
            <IconHide />
          </button>
          <a
            className="bg-slate-300 fill-white bg-opacity-50 hover:bg-slate-600 hover:bg-opacity-100 shadow-md w-12 h-12 rounded-full p-2 absolute bottom-4 right-20"
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open image in new tab"
          >
            <IconAttachment />
          </a>
        </>
      ) : (
        <></>
      )}
      {isDelete ? (
        <div className="fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0 z-50 flex justify-center items-center">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-md flex gap-8 flex-col justify-between p-4">
            <p className="text-black dark:text-white font-semibold">
              Are you sure you want to delete this image?
            </p>
            <div className="w-full flex justify-between">
              <button
                className="bg-green-600 hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-600 text-green-100 hover:text-green-50 font-semibold px-2 py-1 rounded-md"
                onClick={() => {
                  setDelete(false);
                  setShow(true);
                }}
              >
                No, not delete
              </button>
              <button
                className="bg-red-600 hover:bg-red-400 dark:bg-red-800 dark:hover:bg-red-600 text-red-100 hover:text-red-50 font-semibold px-2 py-1 rounded-md"
                onClick={() => {
                  setDelete(false);
                  setImageZoom(null);
                  socketDeleteImage(image);
                }}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

type ProfileCardImageType = {
  image: imageType;
  setImageZoom: (v: imageType | null) => void;
};

const ProfileCardImage = ({ image, setImageZoom }: ProfileCardImageType) => {
  return (
    <div
      className="m-2 group cursor-pointer"
      onClick={() => {
        setImageZoom({ ...image });
      }}
    >
      <img
        className="w-64 transition-all rounded-lg hover:rounded-none object-cover"
        src={image.url}
        alt=""
      />
    </div>
  );
};
