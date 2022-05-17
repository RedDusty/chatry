import React from "react";
import MessagesMessage from "components/Messages/MessagesChat/MessagesChatSub/MessagesMessage";
import { useTypedSelector } from "redux/useTypedRedux";
import IconLoading from "icons/IconLoading";

const MessagesDialog = () => {
  const bottomDialogRef = React.useRef<HTMLDivElement>(null);

  const currentDialog = useTypedSelector((s) => s.cache.dialogCID);

  React.useEffect(() => {
    bottomDialogRef.current?.scrollIntoView();
  }, [bottomDialogRef]);

  const getMessages = useTypedSelector((s) =>
    s.cache.messages.filter((m) => m.cid === currentDialog)
  );
  const messages = getMessages.length === 1 ? getMessages[0].messages : [];

  if (currentDialog === null) {
    return <IconLoading />;
  }

  return (
    <div className="flex-1 w-full h-full lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl flex flex-col items-center px-2 sm:px-4 gap-2 overflow-y-auto">
      <div className="w-full h-16 shrink-0"></div>
      {messages.length === 0 && (
        <div className="text-slate-700 dark:text-slate-300 text-xl font-semibold text-center m-auto">
          There are no messages here yet. Write something and start
          communicating!
        </div>
      )}
      {messages.map((m, idx) => {
        return <MessagesMessage m={m} key={idx} />;
      })}
      <div className="w-full h-16 shrink-0" ref={bottomDialogRef}></div>
    </div>
  );
};

export default MessagesDialog;
