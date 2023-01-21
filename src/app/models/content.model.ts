export class Content {
    date: string;
    content: string;
    type: 'note' | 'command' | 'image' | 'audio';
    sent: boolean;
}