const bits = require(`../bits.json`);
const Discord = require(`discord.js`);
const modRoles = require(`../modroles.json`);

module.exports = {
	name: 'warn',
    description: 'For those times someone starts breaking the rules.',
    category: `moderation`,
    aliases: [],
    cooldown: 2,
    cooldownReply: `Are you on a shopping spree?`,
	execute(message, args) {
        if(!modRoles[message.guild.id]) return message.channel.send(`I can't use moderation until you initialize a staff role!`);
        let modrole = message.guild.roles.cache.get(modRoles[message.guild.id]);
        if(!message.member.roles.cache.has(modrole)) return message.delete();
        if(!message.mentions.members.size) return message.channel.send(`You need to mention a user to warn them.`);
        let reason = args.shift().join(" ");
        message.mentions.members.first().send(`**You were warned in ${message.guild.name}**\nReason: ${reason}\nModerator: ${message.author}`);
        message.channel.send(`Successfully warned **${message.mentions.members.first().user.tag}* for ${reason}!`);
    }
};