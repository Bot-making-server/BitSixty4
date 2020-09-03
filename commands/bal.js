const bits = require(`../bits.json`);
const Discord = require(`discord.js`);

module.exports = {
    name: 'balance',
    aliases: [`bal`, `bits`],
    description: 'Check your bits!',
    cooldown: 2,
    cooldownReply: `You checked your bits like ONE MILLISECOND AGO!`,
	execute(message, args) {
        let mined = Math.floor(Math.random() * 87) + 35;
        const balEmb = new Discord.MessageEmbed()
            .setTitle(`Your Bits`)
            .setDescription(`**Bits:** ${bits[message.author.id].bits}\n**Digibits:** ${bits[message.author.id].digibits}`)
            .setColor(`#FF0000`);
        message.channel.send(balEmb);
        
	},
};