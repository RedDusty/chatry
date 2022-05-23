import React from "react";
import MessagesHeader from "components/Messages/MessagesChat/MessagesHeader";
import MessagesDialog from "components/Messages/MessagesChat/MessagesDialog";
import MessagesInput from "components/Messages/MessagesChat/MessagesInput";
import { getCurrentDialog } from "scripts/currentDialog";
import MessageAttachment from "components/Messages/MessagesChat/MessagesChatSub/MessageAttachment";

type imageType = {
  url: string;
  isExternal: boolean;
};

const MessagesChat = () => {
  const [isAttachShow, setAttachShow] = React.useState(false);
  const [images, setImages] = React.useState<imageType[]>([]);
  const chat = getCurrentDialog();

  if (chat === null) {
    return <></>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center flex-1">
      <MessagesHeader c={chat.chat} />
      <MessagesDialog />
      {isAttachShow ? (
        <MessageAttachment
          setAttachShow={setAttachShow}
          setImages={setImages}
          images={images}
        />
      ) : (
        <></>
      )}
      <MessagesInput
        c={chat.chat}
        setAttachShow={setAttachShow}
        isAttachShow={isAttachShow}
        images={images}
        setImages={setImages}
      />
    </div>
  );
};

export default MessagesChat;
