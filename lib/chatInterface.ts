export interface Message {
    id: string;
    userId: string;
    createdAt: Date;
    content: string;
    isImage: boolean;
}

export interface MessagesGroupByDate {
    Date: string;
    Messages: Message[];
}

export interface StudentChatListData {
    jobId: string;
    jobTitle: string;
    chatrooms: {
        chatroomId: string;
        latestMessage: Message | null;
        employer: {
            profileImageUrl: string | null;
            employerId: string;
            salutation: string;
            firstname: string;
            middlename: string | null;
            lastname: string;
            position: string;
            organization: string;
        };
    }[];
}

export interface EmployerChatListData {
    jobId: string;
    jobTitle: string;
    chatrooms: {
        chatroomId: string;
        latestMessage: Message | null;
        student: {
            profileImageUrl: string | null;
            studentId: string;
            salutation: string;
            firstname: string;
            middlename: string | null;
            lastname: string;
        };
    }[];
}

export interface ChatRoomInfo {
    student: {
        id: string;
        salutation: string;
        firstname: string;
        middlename: string | null;
        lastname: string;
    };
    employer: {
        id: string;
        salutation: string;
        firstname: string;
        middlename: string | null;
        lastname: string;
        position: string;
        organization: string;
    };
    job: {
        id: string;
        title: string;
    };
};