const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageActionRow, MessageButton } = require('discord.js');

const TOKEN = 'YOUR_BOT_TOKEN';
const prefix = '!'; // Customize the prefix as needed

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith(prefix + 'start')) {
        // Create a button for the user to click
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('get_ign')
                    .setLabel('Get IGN')
                    .setStyle('PRIMARY')
            );

        const response = await message.reply({
            content: 'Click the button to get your IGN.',
            components: [row],
        });

        // Listen for button interactions
        const filter = (interaction) => interaction.customId === 'get_ign' && interaction.user.id === message.author.id;
        const collector = message.createMessageComponentCollector({ filter, time: 15000 }); // Adjust the time as needed

        collector.on('collect', async (interaction) => {
            await interaction.deferUpdate();

            // Ask the user to enter their IGN
            const ignPrompt = await message.author.send('Please type your IGN (In-Game Name):');
            const dmChannel = ignPrompt.channel;

            const ignCollector = dmChannel.createMessageCollector({
                filter: (ignMessage) => ignMessage.author.id === message.author.id,
                max: 1, // Collect only one message
            });

            ignCollector.on('collect', (ignMessage) => {
                const ign = ignMessage.content;

                // Generate a sequential account number (you can implement your logic here)
                const accountNumber = generateAccountNumber();

                // Send the IGN and account number to a preselected channel
                const targetChannel = message.guild.channels.cache.get('1164308416865521755'); // Replace with your channel ID
                if (targetChannel) {
                    targetChannel.send(`IGN: ${ign}\nAccount Number: ${accountNumber}`);
                } else {
                    message.author.send('Error: Preselected channel not found.');
                }
            });
        });

        collector.on('end', () => {
            response.edit({
                components: [], // Remove the button
            });
        });
    }
});

function generateAccountNumber() {
    // Implement your sequential account number generation logic here
    // For example, you could store the last used account number in a database and increment it.
    // Here, we'll use a simple counter for demonstration purposes.
    if (!generateAccountNumber.counter) {
        generateAccountNumber.counter = 1;
    } else {
        generateAccountNumber.counter++;
    }
    return generateAccountNumber.counter;
}

client.login(MTE2NDMwMTI0ODU5NDQ0NDM4OQ.Gn7WOI.oOMhv03qK2CPKKZof4t-jlhPrimVVx0yMS9U3E);
