// commands/replyMessage.js
import { SlashCommandBuilder } from 'discord.js';

export default function replyMessage() {
    return {
        data: new SlashCommandBuilder()
        .setName('reply_message')
        .setDescription('Balas pesan seseorang di channel.')
        .addStringOption(option =>
            option.setName('message_id')
            .setDescription('ID pesan yang mau dibalas')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Isi balasan')
            .setRequired(true))
        .addChannelOption(option =>
            option.setName('target_channel')
            .setDescription('Channel tempat pesan berada')
            .setRequired(true))
        .addAttachmentOption(option =>
            option.setName('attachment')
            .setDescription('Lampiran untuk balasan (opsional)')
            .setRequired(false))
    }
};
