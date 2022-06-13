import React from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "redux/useTypedRedux";
import { ChatType } from "typings/cacheTypes";
import MessagesChat from "components/Messages/MessagesBar/MessagesChat";
import { getUser } from "scripts/usersCache";

async function sortChats(chats: ChatType[], chatSearch: string, cu: string) {
  const sortedChats: ChatType[] = [];
  for (let idx = 0; idx < chats.length; idx++) {
    const userUID = chats[idx].usersUID.filter((u) => u !== cu);
    if (userUID && userUID[0]) {
      const user = await getUser(userUID[0]);
      if (
        user &&
        user.username &&
        String(user.username)
          .toLowerCase()
          .includes(String(chatSearch).toLowerCase())
      ) {
        sortedChats.push(chats[idx]);
      }
    }
  }

  return sortedChats;
}

const MessagesChats = ({
  chats,
  chatSearch,
}: {
  chats: ChatType[];
  chatSearch: string;
}) => {
  const cu = useTypedSelector((s) => s.user.uid!);
  const cd = useTypedSelector((s) => s.cache.dialogCID);
  const [sortedChats, setSortedChats] = React.useState(chats);

  React.useEffect(() => {
    const sort = async () => {
      if (chatSearch.length > 0) {
        setSortedChats(await sortChats(sortedChats, chatSearch, cu));
      } else {
        setSortedChats(chats);
      }
    };
    sort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, chatSearch, cu]);

  if (sortedChats.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center px-3 text-slate-700 dark:text-slate-400">
        <p className="text-center text-lg font-semibold">
          There is no dialogue with anyone.
        </p>
        <p className="text-center mt-2">
          Try searching through public search or{" "}
          <Link to={"/people"} className="link">
            find people
          </Link>{" "}
          to talk to.
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full px-2 flex flex-col justify-start items-center gap-1 overflow-y-auto">
        {sortedChats.map((c, idx) => {
          return (
            <MessagesChat
              chat={c}
              cu={cu}
              key={c.cid + idx}
              isActive={c.cid === cd}
            />
          );
        })}
      </div>
    );
  }
};

export default MessagesChats;
