import { SlashCommandBuilder } from 'discord.js';

export default function helpCommand(){
    return {
        data: new SlashCommandBuilder()
            .setName('nevas_help')
            .setDescription('Tampilkan Penjelasan Mengenai Bot.')
    };
}