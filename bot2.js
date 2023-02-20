const { Client, VoiceChannel, MessageEmbed } = require('discord.js');
const client = new Client();
//Might make a command that rewrites this, idk
const PREFIX = 'F.' 
const { MessageAttachment } = require('discord.js')

client.on('ready', () => {
    //WHY ARE YOU SO FUCKING CUTE!
    console.log('Yoohoo~ Shikikan! Yours truly Fubuki is here!')
});

var theSpam;
function spamTheSpam(message) {
    theSpam = setInterval(() => {
        message.channel.send(`${message.author}, <:Angry:836016450929426483>`);
    }, 5000);
}
function stopTheSpam() {
    clearInterval(theSpam);
}

//Remove "//" to make command functional again once you remember how to work

//function cmdMenu(message) {
    //const embed = new MessageEmbed() 
    //.setTitle('FubukiBot')
    //.setColor(0xff0000)
    //.setDescription(`Yoohoo Shikikan! My prefix is \`F.\` and I can use the current commands: \`\`\`
//pfp - Returns your current profile picture.
//Cat - Don't do it...
//Kalm - Stops whatever the Cat command does...
//Kick - Self explanatory (Moderation WIP)
//dm - :)
//vc - Joins vc (cCurrently useless)
//hello - hi!
//emilia - Made for Roy
//This is highly WIP so its quite barebones.
//Commands are case sensitive btw!! \`\`\``);
//    message.channel.send(embed)
//}

function contentToString(array) {
    let sentence = "";
    array.forEach((word) => {
        sentence += word;
    });
    return sentence;
}

function fbkDM(message, content) {
    // Stores the message author into this constant
    const messageA = message.author;
    let response = contentToString(content);
    // Generates a random number from [ 0 , 13 ) 
    let resp = Math.floor(Math.random() * 5);
    // Declares a string variable
    let sentence = ``;
    // Determines if the channel the bot is typing in is a server text channel
    // If true, it adds the message author to the string which will ping the user in the server
    //if (message.channel.type === 'text') {
        //sentence += `${messageA}`;
    //}
    // Logs @resp
    console.log("The response is " + resp);
    // Switch for the response generated
    switch (resp) {
        case 0:
            // Concatenates the given string to @sentence
            sentence += ` Commander, how are ya feeling today?~`;
            // Sends a message with @sentence as input
            client.users.cache.get(message.author.id).send(sentence);
            break;
        case 1:
            sentence += ` Yoohoo~ I am the destroyer who recently made the world tremble, call me Fubuki! Sorry, I’m not trying to be complacent, in fact, I was in many battles… although none of them are worth writing home about… I will continue to do better!`;
            client.users.cache.get(message.author.id).send(sentence);
            break;
        case 2:
            sentence += ` Hehe, are you that lonely Commander?~`;
            client.users.cache.get(message.author.id).send(sentence);
            break;
        case 3:
            sentence += ` Hey~ The Commission fleet is back, stop sleeping!`;
            client.users.cache.get(message.author.id).send(sentence);
            break;
        case 4:
            sentence += ` Wow! You scared me to death!`;
            client.users.cache.get(message.author.id).send(sentence);
            break;
        case 5:
            sentence += `The weather today sure is beautiful, don’t you think, Commander?`;
            client.users.cache.get(message.author.id).send(sentence);
            break;
        default:
            break;
    }
}

client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.channel.type == 'text') {
        let server = message.guild.name;
        let channel = message.channel.name;
        switch(server) {
            case "Sbeve":
                if (message.channel.name === 'fbk-test') {
                console.log(`[${server}, ${channel}] <${message.author.tag}> ${message.content}`);
                }
                break;
            case "Metropia":
                console.log(`[${server}, ${channel}] <${message.author.tag}> ${message.content}`);
                break;
        }
    }
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        switch(CMD_NAME) {
            case "Cat":
                //Unleash the Angy
                spamTheSpam(message);
                break;
            case "Kalm":
                //Kalm kat
                stopTheSpam();
                message.channel.send("Kalm <:Thumbsupcat:836069488109682729>")
                break;
            case "dm":
                //Yeah, update for more quotes
                fbkDM(message, args);
                break;
            case "pfp":
                //Same Essence as "dm" but with their URL
                message.channel.send(message.author.displayAvatarURL());
                break;
            case "kick":
                const user = message.mentions.users.first();
                // If we have a user mentioned
                if (user) {
                    // Now we get the member from the user
                    const member = message.guild.member(user);
                    // If the member is in the guild
                    if (member) {
                        /**
                         * Kick the member
                         * Make sure you run this on a member, not a user!
                         * There are big differences between a user and a member
                         */
                        member
                            .kick('FBK on top')
                            .then(() => {
                                // We let the message author know we were able to kick the person
                                message.reply(`Goodbye! ${user.username}`);
                            })
                            .catch(err => {
                                // An error happened
                                // This is generally due to the bot not being able to kick the member,
                                // either due to missing permissions or role hierarchy
                                message.reply(`I am too weak to kick ${user}`);
                                // Log the error
                                console.error(err);
                            });
                    } else {
                        // The mentioned user isn't in this guild
                        message.reply("They're not even here!");
                    }
                    // Otherwise, if no user was mentioned
                } else {
                    message.reply("Who?");
                }
                break;
            case "vc":
                if (!message.guild) return;
                     // Only try to join the sender's voice channel if they are in one themselves
                     if (message.member.voice.channel) {
                  const connection = message.member.voice.channel.join();
                } else {
                 message.reply("But I don't want to be alone :(");
                }
                break;
            case "hello":
                message.channel.send("Hi!");
                break;
            case "emilia":
                const attachment = new MessageAttachment('https://i.imgur.com/2l3YjHi.png');
                // Send the attachment in the message channel
                message.channel.send(attachment)
                break;
            case "Info":
                cmdMenu();
                break;
        }            
    }
});