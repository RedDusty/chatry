import React from "react";
import { socketMessageSend } from "socketio";
import { useTypedSelector } from "redux/useTypedRedux";
import Picker, { IEmojiData } from "emoji-picker-react";
import { ChatType } from "typings/cacheTypes";
import IconSend from "icons/IconSend";
import IconAttachment from "icons/IconAttachment";
import IconResize from "icons/IconResize";
import IconInfo from "icons/IconInfo";
import IconSun from "icons/IconSun";
import IconMoon from "icons/IconMoon";

type ErrorType = "none" | "length" | "spaces";

type imageType = {
  url: string;
  isExternal: boolean;
};

const MessagesInput = ({
  c,
  isAttachShow,
  setAttachShow,
  images,
  setImages,
}: {
  c: ChatType;
  isAttachShow: boolean;
  setAttachShow: (v: boolean) => void;
  images: imageType[];
  setImages: React.Dispatch<React.SetStateAction<imageType[]>>;
}) => {
  const [isError, setError] = React.useState<ErrorType>("none");
  const [text, setText] = React.useState("");
  const [isEmojiActive, setEmojiActive] = React.useState(false);
  const [resize, setResize] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const theme = useTypedSelector((s) => s.user.userSettings.theme);
  const cid = useTypedSelector((s) => s.cache.dialogCID);
  const cu = useTypedSelector((s) => s.user.uid);

  const resizer = () => {
    if (resize && textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "10px";
      if (textareaRef.current.scrollHeight > 256) {
        textareaRef.current.style.height = "256px";
      } else {
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + 8 + "px";
      }
    }
  };

  const checker = (t: string) => {
    const checker = t.match(/(^[\s\r\n]{4,})|\w+([\s\r\n]){4,}/gm);
    let isError = false;
    if (checker) {
      setError("spaces");
      isError = true;
    } else if (text.length > 512) {
      setError("length");
      isError = true;
    } else {
      setError("none");
    }
    return isError;
  };

  const textHandler = (t: string) => {
    checker(t);
    setText(t);
    resizer();
  };

  const resizeHandler = () => {
    if (resize === true && textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "64px";
    } else if (resize === false && textareaRef && textareaRef.current) {
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 8 + "px";
    }
    setResize(!resize);
  };

  const emojiHandler = () => {
    setEmojiActive(!isEmojiActive);
  };

  const emojiPicker = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => {
    setText((prevText) => {
      const ta = textareaRef.current;
      let textWithEmoji = prevText;
      if (ta) {
        const selpos = ta.selectionStart;
        textWithEmoji =
          text.substring(0, selpos) +
          emojiObject.emoji +
          text.substring(selpos, text.length);
      } else textWithEmoji += emojiObject.emoji;
      checker(textWithEmoji);
      return textWithEmoji;
    });
    resizer();
  };

  const sendHandler = () => {
    let accepterUID: any =
      c.chatType === "two-side"
        ? c.usersUID.filter((u) => u !== cu)
        : undefined;
    if (accepterUID && accepterUID.length === 1) {
      accepterUID = accepterUID[0];
    }
    if (checker(text) === false) {
      if (images.length < 6) {
        socketMessageSend(
          text,
          cid!,
          accepterUID,
          images.map((i) => i.url)
        );
        setText("");
        setImages([]);
      }
    }
  };

  return (
    <div className="w-full h-max flex flex-col items-center mt-2 sm:mb-4 transition-all">
      <div className="w-full sm:max-w-sm lg:max-w-lg xl:max-w-xl flex justify-between px-4 gap-2 sm:gap-4">
        <div className="flex gap-2">
          <button
            className="w-10 h-10 p-2 cursor-pointer rounded-full btn-msg"
            title="Attachment"
            onClick={() => {
              setAttachShow(!isAttachShow);
            }}
          >
            <IconAttachment />
          </button>
          <div
            className={`w-10 h-10 p-2 cursor-pointer rounded-full text-center ${
              images.length > 5 ? "btn-msg-error" : "btn-msg"
            }`}
            title={images.length > 5 ? "Images exceeded" : "Images left"}
          >
            {5 - images.length < -7 ? "-7+" : 5 - images.length}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="w-10 h-10 p-2 cursor-pointer rounded-full btn-msg"
            title="Resize"
            onClick={resizeHandler}
          >
            <IconResize />
          </button>
          <div
            className={`w-10 h-10 p-2 cursor-pointer rounded-full text-center ${
              text.length > 512 ? "btn-msg-error" : "btn-msg"
            }`}
            title={text.length > 512 ? "Symbols exceeded" : "Symbols left"}
          >
            {512 - text.length < -99 ? "-99+" : 512 - text.length}
          </div>
          <button
            className="w-10 h-10 p-2 cursor-pointer rounded-full btn-msg"
            title="Emoji picker"
            onClick={emojiHandler}
          >
            {theme === "white" ? <IconSun /> : <IconMoon />}
          </button>
        </div>
        <div className="flex gap-2 relative">
          {isError !== "none" && (
            <button className="w-10 h-10 group p-2 cursor-pointer rounded-full btn-msg-error">
              <IconInfo />
              <div className="hidden group-hover:block group-focus:block absolute w-screen sm:w-64 md:w-[244px] lg:w-[444px] -top-[72px] md:-top-20 lg:-top-12 -right-[16px] sm:-left-52 lg:-left-[374px] xl:-left-[404px] bg-red-200 dark:bg-red-900 text-center sm:text-left sm:rounded-md p-2">
                <p className="text-red-700 dark:text-red-200">
                  {isError === "spaces" &&
                    "Spaces and new lines between words should not exceed 4."}
                  {isError === "length" &&
                    "The message must not exceed 512 characters."}
                </p>
              </div>
            </button>
          )}
          <button
            className="w-10 h-10 p-2 cursor-pointer rounded-full btn-msg"
            title="Send"
            onClick={sendHandler}
          >
            <IconSend />
          </button>
        </div>
      </div>
      <textarea
        spellCheck="true"
        aria-multiline="true"
        onChange={(e) => {
          textHandler(e.target.value);
        }}
        ref={textareaRef}
        value={text}
        className={`w-full sm:max-w-sm lg:max-w-lg xl:max-w-xl resize-none break-words overflow-y-auto mt-2 p-2 text-black dark:text-slate-200 bg-slate-200 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 border-0 border-t sm:border border-solid border-slate-500 focus:border-sky-500 dark:focus:border-indigo-400 sm:rounded-lg outline-none`}
        placeholder="Write something..."
        style={{ height: 64 }}
      />
      {isEmojiActive && (
        <div
          className={`w-full sm:max-w-sm lg:max-w-lg xl:max-w-xl sm:mt-2 epicker ${
            theme === "white" ? "epicker-white" : "epicker-dark"
          }`}
        >
          <Picker
            onEmojiClick={emojiPicker}
            preload={false}
            skinTone="neutral"
            disableAutoFocus={true}
            pickerStyle={{
              width: "100%",
              height: "256px",
              background: theme === "white" ? "#e2e8f0" : "#1e293b",
              boxShadow: "none",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MessagesInput;
