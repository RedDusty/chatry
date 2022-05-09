import store from "redux/store";

export function getCurrentDialog() {
  const cd = store.getState().cache.dialogCID;
  if (cd === null) return null;
  const chatFiltered = store.getState().cache.chats.filter((c) => c.cid === cd);
  if (chatFiltered.length === 1) {
    const chat = chatFiltered[0];
    const messagesFiltered = store
      .getState()
      .cache.messages.filter((m) => m.cid === cd);
    if (messagesFiltered.length === 1) {
      const messages = messagesFiltered[0].messages;
      return {
        chat,
        messages,
      };
    } else return null;
  } else return null;
}

export function setCurrentDialog(cid: string | null) {
  store.dispatch({ type: "CACHE_DIALOG_CID_SET", payload: cid });
}
