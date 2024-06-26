"use client"
import { Message, MessagesGroupByDate } from "../types/chat";
import { toClientMessage } from "../types/chat";
import { Dispatch, SetStateAction } from "react";

type messageByDateSetter = Dispatch<SetStateAction<MessagesGroupByDate[]>>;

// this function is dedicated to ChatMessageList component
export function constructIncommingMessageHandler(
    setMessagesByDate: messageByDateSetter/*,
    dispatch: ThunkDispatch<{
        chatList: ChatListReloadState;
    }, undefined, UnknownAction> & Dispatch<UnknownAction>,
    toggleChatListReload: ActionCreatorWithoutPayload<"chatList/toggleChatListReload">*/
) {
    // construct an event handler with the given messagesByDate setter
    const inComingMessageHandler = (message: toClientMessage) => {
        // console.log(message);
        setMessagesByDate((messagesByDate) => {
            // reconstruct the incomming message's date string into Date object
            const newMessageDate: Date = new Date(message.createdAt);

            // reconstruct the incomming message to match frontend's expectation
            const newMessage: Message = {
                id: message.id,
                userId: message.userId,
                username: message.username,
                createdAt: newMessageDate,
                content: message.content,
                isImage: message.isImage
            };

            // get the latest messages group. where the group is grouped by date
            const latestMessageByDate = messagesByDate.length !== 0 ? messagesByDate[messagesByDate.length - 1] : undefined;

            if (latestMessageByDate) {
                const latestMessage = latestMessageByDate.Messages[latestMessageByDate.Messages.length - 1];
                if (latestMessage.id === newMessage.id) {
                    // console.log("Same id");
                    const returnval = [...messagesByDate];
                    // console.log(returnval === messagesByDate);
                    return returnval;
                }
            }

            // check if incomming message's date is the same as the latest
            if (!latestMessageByDate || latestMessageByDate.Date !== newMessageDate.toDateString()) {
                // construct a new messageByDate group with the incomming message
                const newMessageByDate: MessagesGroupByDate = {
                    Date: newMessageDate.toDateString(),
                    Messages: [newMessage]
                }

                // console.log("New day");
                // add the message group to the array of messages group 
                const returnval = [...messagesByDate, newMessageByDate];
                // console.log(returnval ===  messagesByDate);
                return returnval;
            }

            // console.log("Same day");
            // add the incomming message into the latest group
            messagesByDate[messagesByDate.length - 1].Messages.push(newMessage);
            const returnval = [...messagesByDate];
            // console.log(returnval === messagesByDate);
            return returnval;
        });
    }

    return inComingMessageHandler;
}