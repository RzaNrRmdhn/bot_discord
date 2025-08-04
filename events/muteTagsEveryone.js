import { EmbedBuilder, PermissionsBitField } from 'discord.js';

const muteTimers = new Map();

export default async function handleMuteTags(message) {
    if (message.author.bot) return;

    const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.Administrator);    
    const isTagEveryone = message.mentions.everyone;

    const flaggedRoleIds = ['1329130763261575169'];
    const containsFlaggedRole = flaggedRoleIds.some(id => message.content.includes(`<@&${id}>`));

    if (isAdmin) return;

    if (!isTagEveryone && !containsFlaggedRole) return;

    await message.delete().catch(console.error);

    const muteRole = message.guild.roles.cache.find(
        role => role.name.toLowerCase() === 'muted'
    );

    if (!muteRole) {
        console.error('Role Muted tidak ditemukan!');
        await message.channel.send(
            `❌ Role **Muted** tidak ditemukan! Buat dulu dan blokir **Send Messages**.`
        );
        return;
    }

    const userId = message.author.id;
    await message.member.roles.add(muteRole).catch(console.error);

    const reason = isTagEveryone
        ? 'Tag everyone'
        : 'Kamu mention role yang gaboleh dimention lohh';

    const muteDuration = 10 * 60 * 1000;

    const embed = new EmbedBuilder()
        .setTitle('🚫 Peringatan Otomatis')
        .setDescription(`Heiii!! ${reason}. tolong jangan diulang ya temanku:3 ><!`)
        .setColor('#FF0000')
        .setThumbnail('https://cdn-icons-png.flaticon.com/512/726/726623.png')
        .addFields(
            { name: 'User', value: `<@${userId}>`, inline: true },
            { name: 'Status', value: `Muted 10 menit`, inline: true }
        )
        .setImage('https://media.tenor.com/OzM8E4EYEnwAAAAd/no-toxic-toxic.gif')
        .setTimestamp();

    await message.channel.send({ embeds: [embed] });

    if (muteTimers.has(userId)) {
        clearTimeout(muteTimers.get(userId));
    }

    const timeout = setTimeout(async () => {
        console.log('⏰ Timer jalan, fetching member...');
        const freshMember = await message.guild.members.fetch({ user: userId, force: true })
            .catch(err => console.error('❌ Fetch member error:', err));
        if (!freshMember) return;

        await freshMember.roles.remove(muteRole)
            .then(() => console.log(`✅ Unmute ${freshMember.user.tag}`))
            .catch(err => console.error('❌ Gagal remove Muted:', err));

        muteTimers.delete(userId);
    }, muteDuration);

    muteTimers.set(userId, timeout);
}