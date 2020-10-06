const bits = require(`../bits.json`);
const Discord = require(`discord.js`);

module.exports = {
	name: 'work',
    description: 'Help out some people for some bits!',
    aliases: [`helpout`, `behelpful`, `benice`],
    cooldown: 45,
    cooldownReply: `No jobs right now!`,
    category: `economy`,
	execute(message, args) {
        let success = Math.floor(Math.random() * 2);
        let earned = Math.floor(Math.random() * 50) + 32;
        let replies = [`You helped someone establish a flow`, `You gave someone a tutorial for a Discord bot`, `You helped develop a bot`, `You helped build a server`, `You helped make a website`];
        let reply = Math.floor(Math.random() * replies.length);
        if(success === 1)
        {
            const workEmb = new Discord.MessageEmbed()
            .setTitle(`Helping out`)
            .setDescription(`${replies[reply]} and they gave you ${earned} bits!`)
            .setColor(`#00FF00`);
            message.channel.send(workEmb);
            bits[message.author.id].bits += earned;
        }
        else {
            const workEmb = new Discord.MessageEmbed()
            .setTitle(`Fail`)
            .setDescription(`You couldn't find any jobs!`)
            .setColor(`#FF0000`);
            message.channel.send(workEmb);
        }
	},
};