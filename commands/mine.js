const bits = require(`../bits.json`);
const Discord = require(`discord.js`);

module.exports = {
	name: 'mine',
    description: 'Mine for bits!',
    cooldown: 30,
    category: `economy`,
    cooldownReply: `You and your pickaxe need to recover from when you last mined!`,
	execute(message, args) {
        let mined = Math.floor(Math.random() * 30) + 12;
        let success = Math.floor(Math.random() * 3);
        let replies = [`You found nothing. Oof.`, `You went mining and obtained ${mined} bits!`, `You dug straight down and fell in lava. Sorry.`];
        if(success === 1) bits[message.author.id].bits += mined;
        if(success === 2)
        {
            bits[message.author.id].bits = 0;
            message.author.send(`***You died!***\nYou died while using \`b64#mine\` by falling in lava.\nYou lost all your bits, but you keep your Digibits.`)
        } 
        const mineEmb = new Discord.MessageEmbed()
            .setTitle(`Mining`)
            .setDescription(`⛏️ ${replies[success]}`)
            .setColor(`#00FF00`);
        message.channel.send(mineEmb);
        bits[message.author.id].bits += mined;
	},
};