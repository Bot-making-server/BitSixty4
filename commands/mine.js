const bits = require(`../bits.json`);
const Discord = require(`discord.js`);

module.exports = {
	name: 'mine',
    description: 'Mine for bits!',
    cooldown: 30,
    cooldownReply: `You and your pickaxe need to recover from when you last mined!`,
	execute(message, args) {
        let mined = Math.floor(Math.random() * 87) + 35;
        const mineEmb = new Discord.MessageEmbed()
            .setTitle(`Mining`)
            .setDescription(`⛏️ You went mining and obtained ${mined} bits!`)
            .setColor(`#00FF00`);
        message.channel.send(mineEmb);
        bits[message.author.id] += mined;
	},
};