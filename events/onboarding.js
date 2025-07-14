export default async function handleOnboarding(member) {
    console.log(`👋 Selamat datang ${member.user.tag}!`);

    const welcomeChannel = member.guild.channels.cache.get('1370350795781967922');

    if(welcomeChannel) {
        await welcomeChannel.send(`👋Haloow Welkam!! Salken Aku Nevas, <@${member.id}>! 
            Silakan kenalan di <#1392801305424171008> dan Kalau ambil role di <#1340643587041398876>! Moga Betah yawwww []~(￣▽￣)~*`);
    }
}
