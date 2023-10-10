class ChatMessage {
    constructor(message = null) {
        this.message = '```ansi\n';

        if (message) {
            this.message += message;
        }
    }

    append(appendage) {
        this.message += `${appendage}\n`;

        return this;
    }

    getMessage() {
        this.message += '```';

        return this.message;
    }
}

module.exports = ChatMessage;
