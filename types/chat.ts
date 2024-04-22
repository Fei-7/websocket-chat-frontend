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
    createdAt: string;
    content: string;    // isImage ? imageURL : text
    isImage: boolean;
};