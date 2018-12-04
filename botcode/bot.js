var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./data/auth.json');

const ego = require('./data/free_will.js');
const dice = require('./data/dicey.js');
const fs = require('fs');

const lore = 2;


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `$`
    
    // shorten message function
    function speak(msg){
      bot.sendMessage({
        to: channelID,
        message: msg + ''
      });
    }
    
    if (message.substring(0, 1) == '$') {
        var args = message.substring(1).split(' ');
        var cmd = args[0].toUpperCase();
        args = args.splice(1);
        switch(cmd) {
			case 'HELP': speak(
'this is the help function of the molten bot, I have the following commands that you can use, ' + user + '! \n\n ok first up i\'m still being made so, be gentle... \n\n I have \`Ping\`, \`pong\`, \`bing\`, \`bong\`, \`ree\`, \`scream\` they are what they are, use em an I will come back at you >=\) \n then I have the \`say\` comand, it makes me repeat you... I don\'t know why that is here. \n I also keep track of \`lore\` things, you can add things with \`addlore\` and remove with \`rmvlore\` to get rid of it(wip). \n\n there are a bunch of other things in the works \n don\'t forget I use \`$\`\'s to react'
			); 
			break;
			
            case 'PING': speak('Pong!'); break;
			case 'PONG': speak('Ping!'); break;
			case 'BING': speak('Bong!'); break;
			case 'BONG': speak('Bing!'); break;
            case 'REE':  speak('ReeEeEeEEE!'); break;
            
            case 'SAY':
                var cmd = args[0];
                if (cmd && cmd.substring(0, 1) !== '$'){
					var result = '';
                	for (II in args){
						result = result + ' ' + args[II];
					}
					speak(user + ' said: ' + result);
                }else{
					var aNumber = Math.floor(Math.random() * 10);
					if (aNumber >= 6){
						speak('you what?');
					}else if(aNumber <= 3){
						speak('are you daft?');
					}else{
						speak('nope, not saying that and you can\'t make me');
					}
                }
            break;
			
			case 'SAYTO':
				var sendto = args[0].replace(/<|#|>/g, '')
				args = args.splice(1);
                
				var result = '';
				for (II in args){
					result = result + ' ' + args[II];
				}
				bot.sendMessage({
					to: sendto + '',
					message: result + ''
				});
            break;
            
            case 'SCREAM':
            	var aNumber = Math.floor(Math.random() * 10);
				if (aNumber >= 6){
                    speak('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!');
                }else if(aNumber <= 3){
                    speak('AaAaAaAaAaAaAaAaAAaAaAaAaAaAaAaAaAAaAaAa!');
                }else{
                    speak('_\*Incoherent screaming*_');
                }
            break;
            
            case 'LORE':
                var cmd = args[0];
				let loredata = fs.readFileSync('./data/lore.json');  
				let loreparsed = JSON.parse(loredata); 
                if(cmd) {
					if(cmd == 'random'){
						
					}else{
						var find = args.toString().toUpperCase();
						speak(loreparsed[find]);
//						logger.info("finding: " + find);
					}
                }else if (lore == 1){
                  speak('... please state \`lore\` and a \`topic\`');
                  const lore = 0;
                }else{
                  speak('That is a interesting topic, but there is simply too much of it to just speak about it in one sitting, how about we start with one subject first?');
                  const lore = 1;
                }
            break;
			
			case 'ADDLORE':
				fs.readFile('./data/lore.json', 'utf8', function (err,data) {
					if (err) {
						return console.log(err);
					}
					var result = data.replace('\"\}', '\", \"'+ args[0].toUpperCase().replace(/,|\*|_|\`|:/gi, '') + '\": \"' + args.join(' ') + '\"\}').replace(/(?:\r\n|\r|\n)/g, ' ');

					fs.writeFile('./data/lore.json', result, 'utf8', function (err) {
						if (err) return console.log(err);
					});
				});
				speak('I added... something related to ' + args[0]);  
			break;
			
			case '-RMVLORE':
				fs.readFile('./data/lore.json', 'utf8', function (err,data) {
					if (err) {
						return console.log(err);
					}
					var result = data.replace('\"\}', '\", \"'+ args[0].toUpperCase().replace(/,|\*|_|\`|:/gi, '') + '\": \"' + args.join(' ') + '\"\}').replace(/(?:\r\n|\r|\n)/g, ' ');

					fs.writeFile('./data/lore.json', result, 'utf8', function (err) {
						if (err) return console.log(err);
					});
				});
				speak('I added... something related to ' + args[0]);  
			break;
            
            default:
                speak('ehm... sorry, i\'m confused. halp!');
            break;
         }
     }
	
	fs.appendFile("./data/log.txt", Date.now() + ' UID: ' + userID + ' CID: ' + channelID + ' U: ' + user + ' Msg: ' + message + ' Evt: ' + evt + '\n', function(err) {
		if(err) {
			return logger.info(err);
		}
	}); 
	if (Math.floor(Math.random() * 30000) <= 200){
		bot.sendMessage({
			to: '481133060348182550',
			message: '<@&481250276825890817> you should RP! join a side or do your own thing'
		});
		logger.info('i did a shout');
	}
});


