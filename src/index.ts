import { Client, IntentsBitField } from 'discord.js'
import * as chrono from 'chrono-node'
require('dotenv').config()

const DEBUG = false

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

const getUTC = function (timestring: string) {
    return Math.floor(chrono.parseDate(timestring).valueOf()/1000)
}

client.on('messageCreate', message => {
    if(DEBUG) console.log(message)
    if(!message.author.bot && message.content.startsWith("ts"))
    {
        try {
            const timestring = message.content.split(" ").slice(1).join(" ")
            const timestamp = getUTC(timestring)
            const reply = `\`<t:${timestamp}:R>\``
            message.reply(reply)
        }
        catch (error) {
            message.reply("Sorry, something went wrong.")
            console.log(error)
        }
    }
})  

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    else if (interaction.commandName === "timestamp") {
        console.log("Generating timestamp...")
        const type = interaction.options.get('type')?.value as string
        const timestamp = getUTC(interaction.options.get('timestring')?.value as string)
        const reply = `<t:${timestamp}:${type}>\nt:${timestamp}:${type}`

        interaction.reply(reply)
    }
})

client.login(process.env.BOT_TOKEN)