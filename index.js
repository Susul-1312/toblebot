require('dotenv').config();

const Discord = require("discord.js");
const { SlashCommandHandler } = require("djs-slash-commands");
const fetch = require('node-fetch');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.on("interactionCreate", async (interaction) => {
	console.log("Interaction Received")

	if (!interaction.isCommand()) return;
	if (interaction.commandName != 'toblerone') return;

	interaction.defer();
	console.log("Interaction Deferred");

	const text = interaction.options.getString('text').toLowerCase().includes("susul") ? "susul is g0d" : interaction.options.getString('text')

	const body = `authcode=FhpV1OTIIKrfE3iBIo3kz&productcode=826-102700&imagetype=png&VariableValues%5B0%5D%5BName%5D=Name&VariableValues%5B0%5D%5BValue%5D=${encodeURI(text)}&VariableValues%5B0%5D%5BVariableType%5D=Text`;

	const res = await fetch("https://api.emaginationstore.com/v2.0/Personalisation/GeneratePreviewImages", {
		"credentials": "omit",
		"headers": {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		body,
		"method": "POST",
		"mode": "cors"
	});
	const json = await res.json()

	console.log("Fetched JSON", json);

	const embed = new Discord.MessageEmbed()
		.setTitle('Toblerone')
		.setColor('#FF1493')
		.setImage(json[1])

	interaction.reply({ embeds: [ embed ] });
});

client.on("ready", () => {
	console.log("Client alive!")
});

client.login(process.env.TOKEN)
