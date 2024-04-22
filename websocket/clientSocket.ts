"use client"
import { toServerImageMessage, toServerTextMessage } from "@/types/chat";
import { Socket, io } from "socket.io-client";

const websocketServerURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

let curChatroomId: string;
export let socket: Socket = io(websocketServerURL);


function isImageFile(file: File | undefined) {
    return file && file['type'].split('/')[0] === 'image';
}

export function connect(chatroomId: string, userId: string) {
    // won't connect again if chatroomId doesn't change to prevent bugs
    if (userId === "") return;
    if (chatroomId === curChatroomId) return;

    console.log('chatroom = ', chatroomId);
    console.log('userid = ', userId);

    socket.disconnect();

    socket.connect();
    
    socket.emit("new connection", {
        userId: userId,
        chatRoomId: chatroomId
    })

    // remember current chatroomId
    curChatroomId = chatroomId;
};

export function sendMessage(newTextMessage: string) {
    // reconstruct the message to match server's expectation
    const messageToServer: toServerTextMessage = {
        text: newTextMessage
    };

    // send the message to the server
    socket.emit('chat text message', messageToServer);
};


export async function sendImage(imageFile: File) {
    // check if given file is actually an image
    if (!isImageFile(imageFile) || !imageFile) {
        alert("The file supposed to be an image.");
        return;
    }

    // extract buffer from the imageFile
    const arrayBuffer = await imageFile.arrayBuffer();
    const uiInt8Array = new Uint8Array(arrayBuffer);
    const buffer = Buffer.from(uiInt8Array);

    // reconstruct the message to match server's expectation
    const messageToServer: toServerImageMessage = {
        type: imageFile.type,
        size: imageFile.size,
        buffer: buffer
    }

    // send the image message to the server
    socket.emit('chat image message', messageToServer);
};

let i = 0;

// type any because socket.on event handler also any type
export function setIncommingMessageHandler(inComingMessageHandler: any) {
    // set the handler to events
    console.log(i++);

    socket.removeAllListeners('chat image message');
    socket.removeAllListeners('chat text message');

    socket.on('chat image message', inComingMessageHandler);
    socket.on('chat text message', inComingMessageHandler);

    console.log(socket.listeners('chat text message'));
}
