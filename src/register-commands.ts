const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')
require('dotenv').config()

const commands = [
    {
        name: "timestamp",
        description: "Generates Discord compatible UTC timestamp from string.",
        options: [
            {
                name: "type",
                description: "Type of timestamp to be generated.",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {name: "short time", value: "t"},
                    {name: "long time", value: "T"},
                    {name: "short date", value: "d"},
                    {name: "long date", value: "D"},
                    {name: "long date w/ short time", value: "f"},
                    {name: "long date w/ weekday and short time", value: "F"},
                    {name: "relative", value: "R"},
                ]
            },
            {
                name: "timestring",
                description: "String describing the timestamp.",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    }
];

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...")

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        
        console.log('Slash commands registered.')
    }
    catch (error) {
        console.log(`Something broke: ${error}`)
    }
})();