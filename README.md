# MiscTools
A discord bot to make my life a little easier.

### Usage
These steps are assuming you have made a bot in the discord developer portal - you'll need the unique token from there to use this! Make sure to select the appropriate permissions and add the bot your server before following these steps.
1. Download the repo
2. Create a `.env` file with the following variables:
```
BOT_TOKEN=[bot token from discord dev portal]
GUILD_ID=[server/guild token]
CLIENT_ID=[bot's client id]
```
3. Run `npm install`
4. Run `npm start`
5. Profit! You should see the following messages appear in the console output:
```
Registering slash commands...
Slash commands registered.
✔️  BotName#0000 has connected!
```
