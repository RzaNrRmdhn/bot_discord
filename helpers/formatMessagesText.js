export default function formatMessageText(message) {
    return message
        .replace(/\\\s*/g, '\n')
        .replace(/\s+(?=[#*-])/g, '\n');
}
