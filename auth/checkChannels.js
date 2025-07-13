export default function checkChannel(interaction, allowedChannel) {
    if (interaction.channel.name !== allowedChannel) {
        interaction.reply({
            content: `🚫 Command hanya bisa dipakai di #${allowedChannel}!`,
            ephemeral: true,
        });
        return false;
    }
    return true;
}
