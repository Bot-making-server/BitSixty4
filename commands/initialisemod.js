const bits = require(`../bits.json`);
const Discord = require(`discord.js`);
const modRoles = require(`../modroles.json`);
const fs = require(`fs`);

module.exports = {
	name: 'modrole',
    description: 'The bot needs to know who is a mod!',
    category: `moderation`,
    aliases: [],
    cooldown: 3000,
    cooldownReply: `Yeah, you can only have one staff role....`,
	execute(message, args) {
        if(!message.member.permissions.has(`MANAGE_MESSAGES`)) return message.delete();
        if(!message.mentions.roles.size) return message.channel.send(`You need to mention a role to assign a staff role!`);
        let roleID = message.mentions.roles.first().id;
        modRoles[message.guild.id] = roleID;
        message.channel.send(`Initialised Staff Role\n${message.mentions.roles.first().name} is now the Staff Role.`)
        fs.writeFile(`modroles.json`, JSON.stringify(modRoles), () => {if(err) console.log(err);});
    }
};