import React from "react";
import Masonry from "react-masonry-component";
import { useTypedSelector } from "redux/useTypedRedux";
import IconCross from "icons/IconCross";

type imageType = {
  url: string;
  isExternal: boolean;
};

type MessageAttachmentType = {
  setAttachShow: (v: boolean) => void;
  setImages: React.Dispatch<React.SetStateAction<imageType[]>>;
  images: imageType[];
};

const MessageAttachment = ({
  setAttachShow,
  setImages,
  images,
}: MessageAttachmentType) => {
  const userImages = useTypedSelector((s) => s.user.images);

  return (
    <div className="flex justify-center items-center fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0 z-50">
      <div className="bg-slate-200 dark:bg-slate-700 md:rounded-md flex flex-col p-4 w-full h-full sm:h-[75%] sm:max-h-[768px] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex justify-between items-center py-1">
          <p className="text-slate-700 dark:text-slate-200 font-semibold text-center flex-1 mr-1">
            Select an image or paste a link. No more than 5 images.
          </p>
          <button
            className="w-10 h-10 p-2 bg-red-200 dark:bg-red-800 hover:bg-red-400 dark:hover:bg-red-600 fill-red-700 dark:fill-red-400 hover:fill-red-900 dark:hover:fill-red-200 rounded-full"
            onClick={() => {
              setAttachShow(false);
            }}
            title="Close"
          >
            <IconCross />
          </button>
        </div>
        <MessageImageFetch setImages={setImages} />
        <Masonry className="w-full h-full flex-1 overflow-y-auto">
          {images
            .filter((f) => f.isExternal === true)
            .map((i, idx) => {
              const imageIDX = images.map((e) => e.url).indexOf(i.url);
              const imagesLength = images.filter(
                (e) => e.isExternal === true
              ).length;

              return (
                <MessageExternalImageCard
                  idx={imageIDX + 1}
                  imagesLength={userImages.length + imagesLength}
                  setImages={setImages}
                  url={i.url}
                  key={i.url + idx}
                />
              );
            })}
          {userImages.length !== 0 ? (
            userImages.map((i, idx) => {
              const imagesFiltered = images.filter((c) => c.url === i.url);
              let isSelected = false;
              if (imagesFiltered.length === 1) {
                isSelected = true;
              }
              const imageIDX = images.map((e) => e.url).indexOf(i.url);
              const imagesLength = images.filter(
                (e) => e.isExternal === true
              ).length;

              return (
                <MessageUserImageCard
                  imagesLength={userImages.length + imagesLength}
                  setImages={setImages}
                  url={i.url}
                  isSelected={isSelected}
                  idx={imageIDX + 1}
                  key={i.hash + idx}
                />
              );
            })
          ) : (
            <></>
          )}
        </Masonry>
      </div>
    </div>
  );
};

export default MessageAttachment;

type MessageImageFetchType = {
  setImages: React.Dispatch<React.SetStateAction<imageType[]>>;
};

const MessageImageFetch = ({ setImages }: MessageImageFetchType) => {
  const [url, setURL] = React.useState("");
  const [isError, setError] = React.useState(false);
  const image = new Image();
  const fetchImageHandler = async () => {
    setError(false);
    image.src = url;
    image.onerror = (e) => {
      setError(true);
    };
    image.onload = (e) => {
      setImages((prev) => {
        if (prev.length < 7) {
          const tempURL = url;
          setURL("");
          const newImages = [...prev, { url: tempURL, isExternal: true }];
          return newImages.filter(
            (i, idx, self) => idx === self.findIndex((t) => t.url === i.url)
          );
        } else return prev;
      });
    };
  };

  return (
    <div className="w-full flex flex-col gap-1 py-2">
      <div className="w-full flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-tl-lg rounded-bl-lg bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200"
          placeholder="Paste url here..."
          onChange={(e) => {
            setURL(e.target.value);
          }}
          value={url}
        />
        <button
          className="bg-green-400 dark:bg-green-800 hover:bg-green-500 dark:hover:bg-green-600 text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-50 font-semibold p-2 rounded-tr-lg rounded-br-lg"
          onClick={fetchImageHandler}
        >
          Add
        </button>
      </div>
      {isError ? (
        <p className="text-red-700 dark:text-red-300 font-semibold">
          Error when loading the image.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

type MessageUserImageCardType = {
  imagesLength: number;
  setImages: React.Dispatch<React.SetStateAction<imageType[]>>;
  url: string;
  isSelected: boolean;
  idx: number;
};

const MessageUserImageCard = ({
  imagesLength,
  setImages,
  url,
  isSelected,
  idx,
}: MessageUserImageCardType) => {
  const sizeX = () => {
    if (imagesLength < 4) {
      return "w-64";
    } else if (imagesLength > 3 && imagesLength < 7) {
      return "w-48";
    } else {
      return "w-32";
    }
  };

  const divUnSelected =
    "bg-white group-hover:bg-sky-500 dark:group-hover:bg-indigo-500 bg-opacity-75 group-hover:bg-opacity-50 dark:group-hover:bg-opacity-50 border-2 border-solid border-slate-700 outline-2 outline outline-white group-hover:outline-sky-500 dark:group-hover:outline-indigo-500";

  const divSelected =
    "bg-green-500 border-2 border-solid border-green-700 outline-2 outline outline-green-500";

  const imageUnSelected =
    "border-2 border-solid border-transparent group-hover:border-sky-500 dark:group-hover:border-indigo-500";

  const imageSelected = "border-2 border-solid border-green-500";

  return (
    <div
      className="m-1 group cursor-pointer group relative"
      onClick={() => {
        if (isSelected) {
          setImages((prev) => {
            return prev.filter((u) => u.url !== url);
          });
        } else {
          setImages((prev) => {
            if (prev.length < 7) {
              return [...prev, { url: url, isExternal: false }];
            } else return prev;
          });
        }
      }}
    >
      <div
        className={`w-8 h-8 rounded-full absolute top-2 right-2 text-center text-xl font-semibold text-white ${
          isSelected ? divSelected : divUnSelected
        }`}
      >
        {isSelected ? idx : ""}
      </div>
      <img
        className={`${sizeX()} ${
          isSelected ? imageSelected : imageUnSelected
        } transition-all rounded-lg object-cover`}
        src={url}
        alt=""
      />
    </div>
  );
};

type MessageExternalImageCardType = {
  imagesLength: number;
  setImages: React.Dispatch<React.SetStateAction<imageType[]>>;
  url: string;
  idx: number;
};

const MessageExternalImageCard = ({
  idx,
  imagesLength,
  setImages,
  url,
}: MessageExternalImageCardType) => {
  const sizeX = () => {
    if (imagesLength < 4) {
      return "w-64";
    } else if (imagesLength > 3 && imagesLength < 7) {
      return "w-48";
    } else {
      return "w-32";
    }
  };

  const urlStyle =
    "bg-sky-700 bg-opacity-50 hover:bg-opacity-100 border-2 border-solid border-sky-500 outline outline-2 outline-sky-700";

  const deleteStyle =
    "bg-green-500 group-hover:bg-red-500 border-2 border-solid border-green-700 group-hover:border-red-700 outline-2 outline outline-green-500 group-hover:outline-red-500 fill-red-200";

  return (
    <div className="m-1 group cursor-default relative">
      <button
        className={`w-10 h-10 p-1 ${urlStyle} rounded-full absolute top-2 left-2 text-center font-semibold text-white`}
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
        title="Copy url"
      >
        URL
      </button>
      <button
        className={`w-8 h-8 p-1 group ${deleteStyle} rounded-full absolute top-2 right-2 text-center font-semibold text-white`}
        onClick={() => {
          setImages((prev) => {
            return prev.filter((i) => i.url !== url);
          });
        }}
        title="Delete"
      >
        <div className="hidden group-hover:block w-full h-full">
          <IconCross />
        </div>
        <p className="group-hover:hidden w-full h-full font-semibold text-white">
          {idx}
        </p>
      </button>
      <img
        className={`${sizeX()} border-2 border-solid border-green-500 transition-all rounded-lg object-cover`}
        src={url}
        alt=""
      />
    </div>
  );
};
