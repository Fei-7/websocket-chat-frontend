// a type of text message that websocket expected
export type toServerTextMessage = {
    text: string;
};

// a type of image message that websocket expected
export type toServerImageMessage = {
    type: string;
    size: number;
    buffer: Buffer;
};

// a type of message that websocket will emits back
export type toClientMessage = {
    id: string;
    userId: string;
    username: string;
    createdAt: string;
    content: string;    // isImage ? imageURL : text
    isImage: boolean;
};

export type Message = {
    id: string;
    userId: string;
    username: string;
    createdAt: Date;
    content: string;
    isImage: boolean;
}
  
export type MessagesGroupByDate = {
    Date: string;
    Messages: Message[];
}