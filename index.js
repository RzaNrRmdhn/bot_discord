import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
    res.send("Bot is alive!");
});

app.listen(3000, () => {
    console.log("Express server running...");
});

dotenv.config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
    console.log(`✅ Bot ready as ${client.user.tag}`);
});

// const gambar = [
//     'https://i.pinimg.com/1200x/70/ac/33/70ac33943d25bcb07439a0a725ee37e2.jpg',
//     'https://i.pinimg.com/1200x/30/49/46/304946c4edd7d8f516f8ced526adae57.jpg',
//     'https://i.pinimg.com/1200x/4f/9d/71/4f9d712fa437fb0d22dcd8786f84d21f.jpg',
//     'https://i.pinimg.com/1200x/c2/8e/7e/c28e7e971f1359ea116b860145f68701.jpg',
//     'https://i.pinimg.com/1200x/53/9f/76/539f76d3bc874c5f8416e899ca5668ec.jpg'
// ]

const formatMessageText = (message) => {
    return message.replace(/(?<!\d)([.!?])\s+|\s+(?=[*#-]|__)/g, (match, p1) => {
        return p1 ? `${p1}\n` : '\n';
    });
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

    // const randomFile = gambar[Math.floor(Math.random() * gambar.length)];
    await interaction.deferReply({ ephemeral: true });

    await targetChannel.send({
        content: format_messages,
        // files: [randomFile],
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

    if (interaction.commandName === 'testing') {
        await handleCommand(interaction, {
            targetChannelName: 'command-log',
            successMsg: '✅ Koneksi bot ke Discord berhasil! Pesan: {channel}',
        });
    }

    if (interaction.commandName === 'pengumuman') {
        await handleCommand(interaction, {
            // targetChannelName: 'command-log',
            targetChannelName: '✧⋅📣┃𝐀𝐧𝐧𝐨𝐮𝐧𝐜𝐞𝐦𝐞𝐧𝐭',
            successMsg: '✅ Pengumuman terkirim ke {channel}!',
        });
    }

    if (interaction.commandName === 'update_rules') {
        await handleCommand(interaction, {
            targetChannelName: '✧⋅📣┃𝐑𝐮𝐥𝐞𝐬',
            successMsg: '✅ Rules berhasil diupdate di {channel}!',
        });
    }
});

client.login(process.env.BOT_TOKEN);
