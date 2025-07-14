export default async function handleCreateChannel(channel) {
    const guild = channel.guild;
    const mutedRole = guild.roles.cache.find(r => r.name === 'muted');
    if (!mutedRole) return;

    try {
        await channel.permissionOverwrites.edit(mutedRole, {
            SendMessages: false,
            Speak: false
        });
        console.log(`Permission Muted di-set otomatis di channel baru: ${channel.name}`);
    } catch (err) {
        console.error(`Gagal set permission di channel baru: ${err}`);
    }
};