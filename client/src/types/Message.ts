export interface Message {
    content: string;
    senderUsername: string;
    recipientUsername: string;
    timestamp?: Date;
}