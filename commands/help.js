const bits = require(`../bits.json`);
const Discord = require(`discord.js`);
const { prefix } = require(`../config.json`)

module.exports = {
	name: 'help',
    description: '',
    cooldown: 1,
    cooldownReply: `...`,
	execute(message, args) {
        const data = [];
        const { commands } = message.client;
        const modules = [`economy`, `moderation`, `miscellaneous`];

        if (!args.length) {
            data.push('Here\'s a list of all my modules:');
            data.push(modules.join(`\n`))
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command, or \`${prefix}help [module]\` to get the commands in a module!`);
            
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my modules!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
        if(modules.includes(args[0].toLowerCase())){
            const commandsInModule = [];
            commandsInModule.push(`This is a list of every command in the ${args[0].toLowerCase()} module:`)
            commandsInModule.push(commands.filter(c => c.category === args[0]).map(command => command.name).join(', '));
            const helpEmbed1 = new Discord.MessageEmbed()
            .setTitle(`Module's commands`)
            .setDescription(commandsInModule.join(`\n`))
            .setColor(`#0000ff`)
            .setFooter(`Hope this helped!`);
            return message.channel.send(helpEmbed1)
        }
        const name = args[0].toLowerCase();
const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

if (!command) {
	return message.reply('That\'s not a valid command!');
}

data.push(`**Name:** ${command.name}`);

if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
if (command.description) data.push(`**Description:** ${command.description}`);
if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

message.channel.send(data, { split: true });

        // ...
	},
};