const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./tokens.json');
const clientId = '921475709694771252';
const guildId = '843954443845238864';
const fetch = require('node-fetch');


fetch('https://api.github.com/repos/ciderapp/cider/branches').then(async(branches) => {
    branches = await branches.json()
    let branchMenu = new SlashCommandStringOption().setName('branch').setDescription('The branch to get builds from.').setRequired(true);

    branches.forEach(branch => {
        branchMenu.addChoice(branch.name, branch.name)
    });

    const commands = [
            new SlashCommandBuilder().setName('nightly').setDescription('Gives you download links for the latest nightly builds').addBooleanOption(option => option.setName('show').setDescription('Show to everyone!').setRequired(false)),
            new SlashCommandBuilder().setName('branchbuilds').setDescription('Gives you download links for the latest builds of a specified branch').addStringOption(branchMenu).addBooleanOption(option => option.setName('show').setDescription('Show to everyone!').setRequired(false)),
            new SlashCommandBuilder().setName('macos').setDescription('Shows available macOS builds (Signed for M1 and Intel Macs)').addBooleanOption(option => option.setName('show').setDescription('Show to everyone!').setRequired(false)),
            new SlashCommandBuilder().setName('sauceme').setDescription('Gives you a random extra saucy image (18+)'),
            new SlashCommandBuilder().setName('marin').setDescription('Gives you a random picture of our godess Marin Kitagawa')
        ]
        .map(command => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
})