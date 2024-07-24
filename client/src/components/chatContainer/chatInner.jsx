/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  useChannelStateContext,
} from "stream-chat-react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GlobalContext } from "../../context/context";

export const GiphyContext = React.createContext({});

const ChatInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = () => {
  const { channel, watcher_count } = useChannelStateContext();
  //const { client } = useChatContext();

  const getWatcherText = (watchers) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  const MessagingHeader = () => {
    const { setIsGroupSelected, setSelectedGroup } = useContext(GlobalContext);
    const resetSelectedGroup = () => {
      setIsGroupSelected(false);
      setSelectedGroup(null);
    };

    {
      /* 
      const members = Object.values(channel.state.members).filter(
        ({ user }) => user.id !== client.userID
      );
    const additionalMembers = members.length - 3;

    if (channel.type === "messaging") {
      return (
        <div className="team-channel-header__name-wrapper">
          {members.map(({ user }, i) => (
            <div key={i} className="team-channel-header__name-multi">
              <Avatar
                image={user.avatar}
                name={user.name || user.id}
                size={32}
              />
              <p className="team-channel-header__name user">
                {user.name || user.id}
              </p>
            </div>
          ))}

          {additionalMembers > 0 && (
            <p className="team-channel-header__name user">
              and {additionalMembers} more
            </p>
          )}
        </div>
      );
    }
      */
    }

    return (
      <div className="team-channel-header__channel-wrapper">
        <div className="team-channel-header__name-multi">
          <div className="team-channel-header__avatar">
            <img src={channel.data.image} alt="" />
          </div>
          <div className="team-channel-header__name-online">
            <p className="team-channel-header__name">{channel.data.name}</p>
            <div className="team-channel-header-online">
              <p className="team-channel-header__online-text">
                {getWatcherText(watcher_count)}
              </p>
            </div>
          </div>
        </div>
        <span className="chat-settings-icon">
          <IoIosCloseCircleOutline
            size={20}
            color="#434343"
            onClick={() => resetSelectedGroup()}
            style={{ cursor: "pointer" }}
          />
        </span>
      </div>
    );
  };

  return (
    <div className="team-channel-header__container">
      <MessagingHeader />
    </div>
  );
};

export default ChatInner;
