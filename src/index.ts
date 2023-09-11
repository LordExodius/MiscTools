import { Client, IntentsBitField } from 'discord.js'
import * as chrono from 'chrono-node'
require('dotenv').config()

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
})

client.on('ready', (c) => {
    console.log(`✔️  ${c.user.tag} has connected!`)
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "timestamp") {
        let offsetValue = ""
        const offset = interaction.options.get('offset')?.value as number
        if (offset < 0) {const offsetValue = `-${offset}`}
        else {const offsetValue = `+${offset}`}

        const type = interaction.options.get('type')?.value as string
        const day = interaction.options.get('day')?.value as number
        const month = interaction.options.get('month')?.value as number
        const year = interaction.options.get('year')?.value as number
        const hour = interaction.options.get('hour')?.value ? interaction.options.get('hour')?.value as number : 10
        const minute = interaction.options.get('hour')?.value ? interaction.options.get('hour')?.value as number : 0
        
        const timestamp = Date.parse(`${year}-${month}-${day} ${hour}:${minute}:00:00 GMT${offsetValue}`)/1000
        const reply = `<t:${timestamp}:${type}>\nt:${timestamp}:${type}`

        console.log(timestamp)
        console.log(reply)

        interaction.reply(reply)
    }

    else if (interaction.commandName === "string-timestamp") {
        console.log("Generating timestamp...")
        const type = interaction.options.get('type')?.value as string
        console.log(interaction.options.get('timestring')?.value as string)
        const timestamp = Math.floor(chrono.parseDate(interaction.options.get('timestring')?.value as string).valueOf()/1000)
        console.log(timestamp)
        const reply = `<t:${timestamp}:${type}>\nt:${timestamp}:${type}`

        interaction.reply(reply)
    }
})

client.login(process.env.BOT_TOKEN)