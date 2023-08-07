import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

const dummyFriendChatList = [
  {
    name: "Luis1990",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1991",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1992",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1993",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1994",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
];

export type FriendType = {
  id?: number;
  name: string;
  email?: string;
  photoURL?: string;
  recentMessage?: string;
};

export type FriendContextType = {
  friendList: FriendType[] | null;
  setFriendList: Dispatch<SetStateAction<any[]>>;
};

export const FriendContext = createContext<FriendContextType>(null!);

type FriendContextProps = {
  children: ReactNode;
};

export const FriendListContext = ({ children }: FriendContextProps) => {
  const [friendList, setFriendList] = useState(dummyFriendChatList);

  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      {children}
    </FriendContext.Provider>
  );
};
