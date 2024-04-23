export interface Message {
    id: string;
    userId: string;
    username: string;
    createdAt: Date;
    content: string;
    isImage: boolean;
}

export interface MessagesGroupByDate {
    Date: string;
    Messages: Message[];
}

export interface ChatListData {
    id: string;
    username: string;
}

export interface GroupListData {
    id: string;
    name: string;
    userIds: string[];
}

export interface ChatRoomInfo {
    name?: string;
    isGroup: boolean;
    userIds: string[];
    users: {
        id: string;
        username: string;
    }[];
};

export interface Sender {
    id: string;
    username: string;
    chatRooms: any;
};