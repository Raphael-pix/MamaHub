/* eslint-disable react/prop-types */
import { Channel,MessageSimple } from 'stream-chat-react';
import ChatInner from './chatInner';

const ChatArea = ({ setIsEditing,channel}) => {
const EmptyState = () => (
    <div className="channel-empty__container">
        <p className="channel-empty__first">no chats available</p>
        <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
    </div>
)
return (
    <div className=" channel__container">
        <Channel
            EmptyStateIndicator={EmptyState}
            Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
            channel={channel}
        >
            <ChatInner setIsEditing={setIsEditing} />
        </Channel>
    </div>
);

}

export default ChatArea
