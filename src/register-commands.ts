const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')
require('dotenv').config()

const commands = [
    {
        name: "timestamp",
        description: "Generates Discord compatible UTC timestamp.",
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
                name: "offset",
                description: "UTC offset.",
                required: true,
                type: ApplicationCommandOptionType.Number
            },
            {
                name: "day",
                description: "Day of timestamp.",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "month",
                description: "Month of timestamp.",
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices: [
                    {name: "January", value: 1},
                    {name: "February", value: 2},
                    {name: "March", value: 3},
                    {name: "April", value: 4},
                    {name: "May", value: 5},
                    {name: "June", value: 6},
                    {name: "July", value: 7},
                    {name: "August", value: 8},
                    {name: "September", value: 9},
                    {name: "October", value: 10},
                    {name: "November", value: 11},
                    {name: "December", value: 12},
                ],
            },
            {
                name: "year",
                description: "Year of timestamp.",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "hour",
                description: "Hour of timestamp (in 24hr time).",
                type: ApplicationCommandOptionType.Number
            },
            {
                name: "minute",
                description: "Minute of timestamp.",
                type: ApplicationCommandOptionType.Number
            },
        ]
    },
    {
        name: "string-timestamp",
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