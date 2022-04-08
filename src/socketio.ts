import io, { ManagerOptions, SocketOptions } from "socket.io-client";

export const serverURL: string =
  process.env.REACT_APP_SERVER_URL || "localhost:8000";

const socketConfig = {
  reconnection: true,
  reconnectionDelay: 250,
  reconnectionAttempts: 50,
} as Partial<ManagerOptions & SocketOptions>;

const socket = io(serverURL, socketConfig);

export default socket;

export function socketON() {
  socket.on("FRIEND_REQUEST_GET", () => {});
}

export function socketOFF() {
  socket.off("FRIEND_REQUEST_GET");
}

export const socketFriendRequest = (
  senderUID: string,
  userUID: string,
  type: "add" | "remove"
) => {
  socket.emit("FRIEND_REQUEST", {
    type: type,
    senderUID: senderUID,
    receiverUID: userUID,
  });
};
