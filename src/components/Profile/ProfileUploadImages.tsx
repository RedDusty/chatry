import IconArrow from "icons/IconArrow";
import IconCross from "icons/IconCross";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import Masonry from "react-masonry-component";
import { useTypedSelector } from "redux/useTypedRedux";
import socket, { socketUploadImages } from "socketio";

type ProfileUploadImagesType = {
  isUploadingImages: boolean;
  setUploadingImages: (v: boolean) => void;
  uid: string;
};

type imageType = {
  file: File;
  imageURL: string;
  id: number;
};

type socketRequestType = {
  error: "UNKNOWN" | "FILE_NOT_IMAGE" | "FILE_SIZE" | "USER_AUTH" | false;
  uploadID: number;
  notUploadedIDs: number[];
};

const ProfileUploadImages = ({
  isUploadingImages,
  setUploadingImages,
  uid,
}: ProfileUploadImagesType) => {
  const [images, setImages] = React.useState<imageType[]>([]);
  const cu = useTypedSelector((s) => s.user.uid);
  const cuImagesLength = useTypedSelector((s) => s.user.images.length);
  const imagesLength = cuImagesLength + images.length;
  const [uploadedImages, setUploadedImages] = React.useState<number[] | null>(
    null
  );
  const [notUploadedImages, setNotUploadedImages] = React.useState<
    number[] | null
  >(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    maxFiles: 25,
    maxSize: 4194304,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((f) => {
        if (f.size < 4194304) {
          const imageURL = URL.createObjectURL(f);
          setImages((prev) => {
            return [
              ...prev,
              { file: f, imageURL: imageURL, id: prev.length + 1 },
            ];
          });
        }
      });
    },
    onDropRejected: (err) => {},
    multiple: false,
    noKeyboard: true,
    noClick: true,
  });

  React.useEffect(() => {
    socket.on("IMAGE_UPLOAD_CLIENT", (data: socketRequestType) => {
      if (data.uploadID) {
        setUploadedImages((prev) => {
          if (prev) return [...prev, data.uploadID];
          return [data.uploadID];
        });
      } else if (data.error && data.notUploadedIDs) {
        setNotUploadedImages(data.notUploadedIDs);
      }
    });
  }, []);

  const deleteFile = (id: number) => {
    if (images && id) {
      setImages((prev) => {
        const image = prev.filter((i) => i.id === id);
        if (image.length === 1) {
          URL.revokeObjectURL(image[0].imageURL);
          const newImages = image.filter((i) => i.id !== id);
          return newImages;
        } else return prev;
      });
    }
  };

  const acceptImagesHandler = () => {
    if (cu !== uid) return;
    if (images.length === 0) return;
    if (imagesLength > 25) return;
    const files = images.map((i) => {
      return { file: i.file, id: i.id };
    });
    socketUploadImages(files, uploadedImages);
  };

  if (isUploadingImages === false) {
    return (
      <div className="mt-4 mx-auto sm:ml-0">
        <button
          className="bg-sky-600 hover:bg-sky-500 dark:bg-indigo-800 dark:hover:bg-indigo-700 border border-solid border-black text-white text-center font-semibold py-1 px-2 rounded-md w-48"
          onClick={() => {
            setUploadingImages(true);
          }}
        >
          Upload images
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 mx-auto sm:ml-0 flex flex-col gap-2 w-full h-full overflow-y-scroll">
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <button
          className="w-24 h-8 flex text-2xl font-medium whitespace-nowrap hover:underline text-slate-700 fill-slate-700 dark:text-slate-200 dark:fill-slate-200 hover:text-sky-600 hover:fill-sky-600 dark:hover:text-indigo-200 dark:hover:fill-indigo-200 text-center sm:text-left"
          onClick={() => {
            setUploadingImages(false);
          }}
        >
          <IconArrow rotate={"left"} />
          Back
        </button>
        {images.length && imagesLength < 25 ? (
          <button
            className="bg-green-600 hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-700 border border-solid border-black text-white text-center font-semibold py-1 px-2 rounded-md w-48"
            onClick={acceptImagesHandler}
          >
            Accept images
          </button>
        ) : (
          <></>
        )}
      </div>
      <ul className="mx-auto sm:mx-0 list-disc pl-1">
        <li className="text-slate-700 dark:text-slate-300 font-semibold">
          The file must be 4 MB or less
        </li>
        <li className="text-slate-700 dark:text-slate-300 mt-1 font-semibold">
          Drag 'n' drop or click Upload
        </li>
        <li className="text-slate-700 dark:text-slate-300 mt-1 font-semibold">
          25 photos per profile
        </li>
        <li className="text-slate-700 dark:text-slate-300 mt-1 font-semibold">
          Don't close the page to get image alerts
        </li>
        {notUploadedImages && notUploadedImages.length !== 0 ? (
          <li className="text-red-700 dark:text-red-300 mt-1 font-semibold">
            Some images could not be uploaded. They are marked with a red
            circle.
          </li>
        ) : (
          <></>
        )}
      </ul>
      <ProfileImageUploader
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        open={open}
        imagesLength={imagesLength}
      />
      <div className="w-full mt-4 flex items-center">
        <div
          className={`h-px flex-1 ${
            imagesLength >= 25
              ? "bg-red-500 dark:bg-red-400"
              : "bg-sky-600 dark:bg-indigo-800"
          } shrink-0`}
        ></div>
        <p
          className={`mx-2 ${
            imagesLength >= 25
              ? "text-red-500"
              : "text-sky-700 dark:text-indigo-300"
          }`}
        >
          {imagesLength + " / 25"}
        </p>
        <div
          className={`h-px flex-1 ${
            imagesLength >= 25
              ? "bg-red-500 dark:bg-red-400"
              : "bg-sky-600 dark:bg-indigo-800"
          } shrink-0`}
        ></div>
      </div>
      {imagesLength ? (
        <Masonry options={{ transitionDuration: 0.1 }} className="h-full">
          {images.map((i, idx) => {
            let isUploaded = null;

            if (uploadedImages && uploadedImages.includes(i.id))
              isUploaded = true;
            if (notUploadedImages && notUploadedImages.includes(i.id))
              isUploaded = false;
            return (
              <ProfileCardImage
                imageURL={i.imageURL}
                key={"url" + idx}
                imagesLength={images.length}
                deleteFile={deleteFile}
                id={i.id}
                isUploaded={isUploaded}
              />
            );
          })}
        </Masonry>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileUploadImages;

type ProfileImageUploaderType = {
  getRootProps: () => <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: () => DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  open: () => void;
  imagesLength: number;
};

const ProfileImageUploader = ({
  getRootProps,
  getInputProps,
  open,
  imagesLength,
}: ProfileImageUploaderType) => {
  if (imagesLength >= 25) {
    return (
      <div className="w-72 h-32 bg-red-200 dark:bg-red-900 rounded-md p-2 text-red-900 dark:text-red-200 mx-auto sm:mx-0 mt-4 cursor-not-allowed">
        <div className="w-full h-full p-2 border-2 border-dashed border-red-600 dark:border-red-400 rounded-md flex justify-center items-center">
          <button
            type="button"
            className="bg-red-300 dark:bg-red-800 p-2 rounded-md font-medium cursor-not-allowed"
          >
            Limit!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-72 h-32 bg-sky-200 dark:bg-indigo-900 rounded-md p-2 text-sky-900 dark:text-indigo-200 mx-auto sm:mx-0 mt-4"
      {...getRootProps()}
    >
      <div className="w-full h-full p-2 border-2 border-dashed border-sky-600 dark:border-indigo-400 rounded-md flex justify-center items-center">
        <input {...getInputProps()} />
        <button
          type="button"
          onClick={open}
          className="bg-sky-300 hover:bg-sky-400 dark:bg-indigo-800 dark:hover:bg-indigo-700 p-2 rounded-md font-medium"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

type ProfileCardImageType = {
  imageURL: string;
  imagesLength: number;
  deleteFile: (id: number) => void;
  id: number;
  isUploaded: null | false | true;
};

const ProfileCardImage = ({
  imageURL,
  imagesLength,
  deleteFile,
  id,
  isUploaded,
}: ProfileCardImageType) => {
  const sizeX = () => {
    if (imagesLength < 4) {
      return "w-64";
    } else if (imagesLength > 3 && imagesLength < 7) {
      return "w-48";
    } else {
      return "w-32";
    }
  };

  return (
    <div className="m-2 relative group">
      {isUploaded === true ? (
        <button
          className="w-10 h-10 block absolute top-1 left-1 p-1 rounded-full bg-green-500 bg-opacity-75 hover:bg-opacity-100 cursor-default"
          title="Image has been uploaded"
        ></button>
      ) : (
        <></>
      )}
      {isUploaded === false ? (
        <button
          className="w-10 h-10 block absolute top-1 left-1 p-1 rounded-full bg-red-500 bg-opacity-75 hover:bg-opacity-100 cursor-default"
          title="Image has NOT been uploaded"
        ></button>
      ) : (
        <></>
      )}
      {isUploaded === null || isUploaded === false ? (
        <button
          className="w-10 h-10 hidden group-hover:block absolute top-1 right-1 p-1 rounded-md bg-sky-700 hover:bg-red-700 hover:bg-opacity-50 bg-opacity-50 dark:bg-indigo-700 dark:hover:bg-red-700 dark:bg-opacity-50 dark:hover:bg-opacity-50 fill-sky-300 dark:fill-indigo-300 hover:fill-red-300 dark:hover:fill-red-300 cursor-pointer"
          title="Remove image"
          onClick={() => {
            deleteFile(id);
          }}
        >
          <IconCross />
        </button>
      ) : (
        <></>
      )}
      <img
        className={`${sizeX()} transition-all rounded-lg hover:rounded-none object-cover`}
        src={imageURL}
        alt=""
      />
    </div>
  );
};
