const bits = require(`../bits.json`);
const Discord = require(`discord.js`);
const shop = require(`../shop.json`);

module.exports = {
	name: 'buy',
    description: 'Buy stuff, convert bits/digibits and create portals!',
    cooldown: 2,
    cooldownReply: `Are you on a shopping spree?`,
	execute(message, args) {
        if(!args[0] || !shop[args[0]]) return;
        let currencies = [`bit`, `digibit`];
        let amount;
        if(!args[1]) amount = 1; else amount = Number(args[1]);currencies.
        if(currencies.includes(args[0]))
        {
            let opp;
            if(args[0] === `bit`) opp = `digibit`; else opp = `bit`;
            eval(`bits[message.author.id].${args[0]}s += amount; #bits[message.author.id].${opp} -= ${amount}`);
            message.channel.send(`Exchanged!`)
        }
	},
};