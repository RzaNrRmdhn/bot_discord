import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
    console.log(`✅ Bot ready as ${client.user.tag}`);
});

const gambar = [
    'https://i.pinimg.com/1200x/70/ac/33/70ac33943d25bcb07439a0a725ee37e2.jpg',
    'https://i.pinimg.com/1200x/30/49/46/304946c4edd7d8f516f8ced526adae57.jpg',
    'https://i.pinimg.com/1200x/4f/9d/71/4f9d712fa437fb0d22dcd8786f84d21f.jpg',
    'https://i.pinimg.com/1200x/c2/8e/7e/c28e7e971f1359ea116b860145f68701.jpg',
    'https://i.pinimg.com/1200x/53/9f/76/539f76d3bc874c5f8416e899ca5668ec.jpg'
]

const wrapAndIndent = (text) => {
    const maxLength = 75;
    const words = text.split(' ');
    let linePart = '';
    const lines = [];

    words.forEach(word => {
        if ((linePart + ' ' + word).length > maxLength) {
            lines.push(linePart.trim());
            linePart = word;
        } else {
            linePart += ' ' + word;
        }
    });

    if (linePart) lines.push(linePart.trim());
    if (lines.length === 1) {
        return `\t• ${lines[0]}`;
    } else {
        return `\t• ${lines[0]}\n${lines.slice(1).map(l => `\t  ${l}`).join('\n')}`;
    }
};

const formatMessageText = (message) => {
    return message
        .replace(/[.!?] (?=[A-Z#])/g, match => `${match.trim()}\n`)
        .split('\n')
        .map(line => {
            const trimmed = line.trim();

            if (trimmed.includes(' - ')) {
                const parts = trimmed.split(' - ');
                const intro = parts.shift().trim();
                const bullets = parts.map(item => wrapAndIndent(item)).join('\n');
                return [intro, bullets].filter(Boolean).join('\n');

            } else if (/^-\s+/.test(trimmed)) {
                return wrapAndIndent(trimmed.slice(2).trim());
            } else {
                return trimmed;
            }
            }).join('\n');
};

const handleCommand = async (interaction, options) => {
    const { targetChannelName, successMsg } = options;

    const message = interaction.options.getString('message');
    const format_messages = formatMessageText(message);

    const targetChannel = interaction.guild.channels.cache.find(
        ch => ch.name === targetChannelName
    );

    if (!targetChannel) {
        await interaction.reply({
            content: `❌ Channel #${targetChannelName} tidak ditemukan!`,
            ephemeral: true,
        });
        return;
    }

    const randomFile = gambar[Math.floor(Math.random() * gambar.length)];
    await interaction.deferReply({ ephemeral: true });

    await targetChannel.send({
        content: format_messages,
        files: [randomFile],
    });

    await interaction.editReply({
        content: successMsg.replace('{channel}', `#${targetChannel.name}`),
    });
};

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const allowedChannel = 'command-log';
    if (interaction.channel.name !== allowedChannel) {
        await interaction.reply({
            content: `🚫 Command hanya bisa dipakai di #${allowedChannel}!`,
            ephemeral: true,
        });
        return;
    }

    if (interaction.commandName === 'pengumuman') {
        await handleCommand(interaction, {
            targetChannelName: 'command-log', // Ganti kalau mau
            successMsg: '✅ Pengumuman terkirim ke {channel}!',
        });
    }

    if (interaction.commandName === 'update_rules') {
        await handleCommand(interaction, {
            targetChannelName: 'command-log', // Ganti kalau mau rules beda channel
            successMsg: '✅ Rules berhasil diupdate di {channel}!',
        });
    }
});

client.login(process.env.BOT_TOKEN);
