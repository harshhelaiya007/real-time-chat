export type UserId = string;

export interface Chat {
    id: string,
    userId: UserId,
    name: string,
    message: string,
    upvote: UserId[]
}

export class Store {
    constructor() {

    }

    initRoom(roomId: string) {

    }
    getChats(room: string, limit: number, offset: number) {

    }
    addChat(UserId: UserId, name: string, message: string, room: string) {

    }
    upvote(UserId: UserId, name: string, message: string, room: string, chatId: string) {

    }
}