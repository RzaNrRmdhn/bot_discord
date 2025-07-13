import { SlashCommandBuilder } from "discord.js";

export default function sendMessages(){
    return {
        data: new SlashCommandBuilder()
        .setName('send_message')
        .setDescription('Kirim Pesan Ke semua Channel.')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Masukkan pesan yang akan dikirim')
            .setRequired(true))
        .addChannelOption(option =>
            option.setName('target_channel')
            .setDescription('Channel tujuan untuk mengirim pesan')
            .setRequired(true))
        .addAttachmentOption(option =>
            option.setName('attachment')
            .setDescription('Lampiran yang akan dikirim (opsional)')
            .setRequired(false))
    };
}