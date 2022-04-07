import axios from "axios";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import getCroppedImg from "scripts/getCroppedImage";
import base64ToBlob from "scripts/base64ToBlob";

type avatarType = {
  file: File;
  imageURL: string;
};

const SettingsChangeAvatar = () => {
  const [avatar, setAvatar] = React.useState<avatarType | null>(null);
  const [croppedAvatar, setCroppedAvatar] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState<string | null>(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ["image/png", "image/jpg", "image/jpeg", "image/gif", "webp"],
    maxFiles: 1,
    maxSize: 8388608,
    onDrop: (acceptedFiles) => {
      setAvatar(() => {
        const f = acceptedFiles[0];
        const imageURL = URL.createObjectURL(f);
        return {
          file: f,
          imageURL,
        };
      });
    },
    onDropRejected: (err) => {},
    multiple: false,
    noKeyboard: true,
    noClick: true,
  });

  const deleteFile = () => {
    if (avatar) {
      URL.revokeObjectURL(avatar.imageURL);
      setAvatar(null);
      setCroppedAvatar(null);
    }
  };

  const cropAvatar = () => {
    if (croppedAvatar) {
      setCroppedAvatar(null);
    }
  };

  const acceptAvatar = async () => {
    const data = new FormData();
    data.append("avatar", base64ToBlob(croppedAvatar!));
    axios
      .post("/api/avatar", data)
      .then((v) => {
        if (v.data === "OK") {
          setMsg("Uploaded. The avatar will be updated soon...");
        }
      })
      .catch((v) => {
        setMsg(String(v));
      });
  };

  return (
    <div className="mt-2 flex flex-col flex-1">
      <div>
        <div className="max-w-min mx-auto sm:mx-0">
          <p className="text-lighter max-w-min whitespace-nowrap font-semibold">
            The file must be 8 MB or less!
          </p>
          <p className="text-lighter mt-1 max-w-min whitespace-nowrap font-semibold">
            Drag 'n' drop or click Upload
          </p>
          {croppedAvatar ? (
            <p className="text-lighter mt-1 max-w-min whitespace-nowrap font-semibold">
              This is just a preview of the picture in different resolutions.
            </p>
          ) : (
            <></>
          )}
          {msg ? (
            <p className="bg-sky-100 dark:bg-indigo-900 text-lighter whitespace-nowrap font-semibold rounded-md p-1">
              {String(msg)}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-wrap items-center mt-2 justify-center sm:justify-start">
          {avatar ? (
            <button
              className="bg-red-700 hover:bg-red-600 focus:bg-red-500 border border-solid border-black px-3 py-1 rounded-md text-white m-1"
              onClick={deleteFile}
            >
              Remove file
            </button>
          ) : (
            <></>
          )}
          {croppedAvatar ? (
            <button
              className="bg-sky-700 dark:bg-indigo-700 hover:bg-sky-600 dark:hover:bg-indigo-600 focus:bg-sky-500 dark:focus:bg-indigo-500 border border-solid border-black px-3 py-1 rounded-md text-white m-1"
              onClick={cropAvatar}
            >
              Crop
            </button>
          ) : (
            <></>
          )}
          {croppedAvatar ? (
            <button
              className="bg-green-700 hover:bg-green-600 focus:bg-green-500 border border-solid border-black px-3 py-1 rounded-md text-white"
              onClick={acceptAvatar}
            >
              Accept
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-1 justify-center sm:justify-start">
        {croppedAvatar ? (
          <SettingsChangeAvatarPreview croppedAvatar={croppedAvatar} />
        ) : avatar ? (
          <SettingsChangeAvatarCropper
            avatar={avatar}
            setAvatar={setAvatar}
            setCroppedAvatar={setCroppedAvatar}
          />
        ) : (
          <SettingsChangeAvatarUploader
            getInputProps={getInputProps}
            getRootProps={getRootProps}
            open={open}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsChangeAvatar;

type SettingsChangeAvatarUploaderType = {
  getRootProps: () => <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: () => DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  open: () => void;
};

const SettingsChangeAvatarUploader = ({
  getRootProps,
  getInputProps,
  open,
}: SettingsChangeAvatarUploaderType) => {
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

const SettingsChangeAvatarCropper = ({
  avatar,
  setCroppedAvatar,
  setAvatar,
}: {
  avatar: avatarType;
  setCroppedAvatar: (v: string | null) => void;
  setAvatar: (v: avatarType | null) => void;
}) => {
  const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area>();
  const onCropComplete = React.useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const cropAvatar = React.useCallback(async () => {
    try {
      const croppedImage = (await getCroppedImg(
        avatar.imageURL,
        croppedAreaPixels!
      )) as string;

      setCroppedAvatar(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, setCroppedAvatar, avatar.imageURL]);

  const removeAvatar = () => {
    URL.revokeObjectURL(avatar.imageURL);
    setAvatar(null);
  };

  return (
    <div className="mt-4 lg:mt-0 lg:ml-4 flex">
      <div className="fixed w-screen h-screen top-0 left-0 flex flex-col bg-white dark:bg-black">
        <div className="fixed w-full flex flex-col lg:flex-row justify-center items-center bottom-8 z-10">
          <button
            className="bg-red-700 hover:bg-red-600 focus:bg-red-500 border border-solid border-black px-3 py-1 rounded-md text-white w-36"
            onClick={removeAvatar}
          >
            Remove avatar
          </button>
          <button
            className="bg-green-700 hover:bg-green-600 focus:bg-green-500 border border-solid border-black px-3 py-1 rounded-md text-white mt-4 lg:mt-0 lg:ml-4 w-36"
            onClick={cropAvatar}
          >
            Crop
          </button>
        </div>
        <div className="relative flex-1">
          <Cropper
            image={avatar.imageURL}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape={"rect"}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            disableAutomaticStylesInjection={false}
            showGrid={false}
          />
        </div>
      </div>
    </div>
  );
};

const SettingsChangeAvatarPreview = ({
  croppedAvatar,
}: {
  croppedAvatar: string;
}) => {
  const [size, setSize] = React.useState(128);

  return (
    <div>
      <div className="flex items-center">
        <input
          type="number"
          value={size}
          onChange={(e) => {
            if (e.target.valueAsNumber <= 288 && e.target.valueAsNumber > 32) {
              setSize(e.target.valueAsNumber);
            } else if (e.target.valueAsNumber > 288) {
              setSize(288);
            } else setSize(32);
          }}
          className="w-16 h-12 bg-gray-300 rounded-lg p-1"
        />
        <p className="text-4xl font-semibold -mt-2 ml-1">x</p>
        <p className="w-16 h-12 bg-gray-200 rounded-lg p-1 m-1 flex justify-center items-center cursor-not-allowed">
          {size || 128}
        </p>
      </div>
      <div>
        <img
          src={croppedAvatar}
          alt={"a" + size}
          width={size || 128}
          height={size || 128}
          className="avatarRound"
          style={{ imageRendering: "crisp-edges" }}
        />
      </div>
    </div>
  );
};
