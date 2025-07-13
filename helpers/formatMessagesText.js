export default function formatMessageText(message) {
    return message.replace(
        /(?<!\d)([.!?])\s+|\s+(?=[*#-]|__)/g,
        (match, p1) => p1 ? `${p1}\n` : '\n'
    ).replace(/\\\s*/g, '\n')
}
