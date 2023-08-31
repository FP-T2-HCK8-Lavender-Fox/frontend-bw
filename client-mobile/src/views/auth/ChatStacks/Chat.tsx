import React from "react";
import { Users } from "../../../models/users";
import { useSelector } from "react-redux";
// @ts-ignore
import * as TalkRn from "@talkjs/expo";
import { RootState, useAppDispatch } from "../../../stores/store";
import { getSelf } from "../../../stores/reducers/categoryReducer";

export default function Chat({ route }: any) {
  const dispatch = useAppDispatch();
  const myself: Users = useSelector(
    (state: RootState) => state.categories.userSelf
  );

  const { friends } = route.params;
  const me = {
    id: myself.id,
    name: myself.name,
    email: myself.email,
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    role: "default",
  };

  const other = {
    id: friends.id,
    name: friends.name,
    email: friends.email,
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    // @ts-ignore
    TalkRn.oneOnOneId(me, other)
  );
  // @ts-ignore
  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  React.useEffect(() => {
    dispatch(getSelf());
  }, [route]);

  return (
    // @ts-ignore

    <TalkRn.Session appId="tDrNYdEW" me={me}>
      <TalkRn.Chatbox
        conversationBuilder={conversationBuilder}
        // @ts-ignore
        style={{
          zIndex: 999,
          position: "absolute",
          // tambahkan properti gaya lainnya di sini
        }}
      />
    </TalkRn.Session>
  );
}
