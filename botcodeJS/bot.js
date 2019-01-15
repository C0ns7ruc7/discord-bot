// imported constants and vars
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./data/auth.json');
var randomnumbers = require('./data/rnum.js')
function rNum(num){return randomnumbers.anum(num);}
const fs = require('fs');

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

	fs.rename('./logs/log.txt', './logs/log' + Date.now() + '.txt', (err) => {
		if (err) throw err;
	});
	fs.writeFile('./logs/log.txt', '', 'ascii', (err) => {
		if (err) throw err;
	});  
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
    
    if (message.substring(0, 1) == '$' || message.substring(0, 22) == '<@!517269535024349195>') {
        var args = message.substring(1).split(' ');
        var cmd = args[0].toUpperCase();
        var args = args.splice(1);
		var responce = ((rNum(10)) >= 5) ? '?' : '!';
		
        switch(cmd) {
			case 'HELP': speak(
'this is the help function of the molten bot, I have the following commands that you can use, <@' + userID + '>! \n\n' + 
'Ok first up i\'m still being made so, be gentle... \n\n' + 
'- I have \`Ping\`, \`pong\`, \`bing\`, \`bong\`, \`ree\`, \`scream\`, \`beep\` and \`boop\` they are what they are, use em an I will come back at you >=\) \n' + 
'- then I have the \`say\` {msg} comand, it makes me repeat you... I don\'t know why that is here. \n' + 
'- I also keep track of \`lore\` [lore name] things, do a empty command for a list. \n' +
'- you can add things with \`addlore\` {[first word is key] the rest, explaining stuf} \n' + 
'- remove lore with \`rmvlore\` to get rid of it(wip). \n' + 
'- there is also the \`mail\` [#channel(or when in DM a number)] {msg}  where you can send to a channel \n' + 
'- a functional command is the \`whatis\` [@user/role OR #channel], it shows you the number needed for DM\'ing using the mail function \n' + 
'- I also have the \`roll\` command, it works as a automatic 2d6 if you don\'t add comments \n\n' + 
'there are a bunch of other things in the works \n' + 
'don\'t forget I use \`$\`\'s to react'
			); 
			break;
			
            case 'PING': speak('**\`Pong' + responce + '\`**'); break;
			case 'PONG': speak('**\`Ping' + responce + '\`**'); break;
			case 'BING': speak('**\`Bong' + responce + '\`**'); break;
			case 'BONG': speak('**\`Bing' + responce + '\`**'); break;
			case 'BEEP': speak('**\`Boop' + responce + '\`**'); break;
			case 'BOOP': speak('**\`Beep' + responce + '\`**'); break;
            
            case 'SAY':
                var cmd = args[0];
                if (cmd && cmd.substring(0, 1) !== '$'){
					var result = '';
                	for (II in args){
						result = result + ' ' + args[II];
					}
					speak('_<@' + userID+ '> said:_ **' + result + '**');
                }else{
					var aNumber = rNum(10);
					if (aNumber >= 6){
						speak('you what?');
					}else if(aNumber <= 3){
						speak('are you daft?');
					}else{
						speak('nope, not saying that and you can\'t make me');
					}
                }
            break;
			
			case 'WHATIS':
                if (args[0]){
					speak('_<@' + userID+ '> the deciphered things you said:_' + args.join(' ').replace(/<|>|@/gi, '').replace(/#/gi, ' Channel:').replace(/&/gi, ' Role:').replace(/!/gi, ' User:'));
                }else{
					speak('you forgot everything');
                }
            break;
			
			case 'ROOTSAYTO':
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
			
			case 'MAIL':
				if(args[0]){
					var sendto = args[0].replace(/<|#|>/g, '')
					args = args.splice(1);
					
					var result = '';
					for (II in args){
						result = result + ' ' + args[II];
					}
					bot.sendMessage({
						to: sendto + '',
						message: '**\`[' + Math.floor((channelID - userID) / Date.now()) + ']\`**:' + result + ''
					});
					speak('your message has been sent');
				}else{
					speak('you broke the message');
				}
				
            break;
            
            case 'SCREAM':
            	var aNumber = rNum(10);
				if (aNumber >= 6){
                    speak(((rNum(10)) >= 5) ? 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!' : '$ree');
                }else if(aNumber <= 3){
                    speak(((rNum(10)) >= 5) ? 'AaAaAaAaAaAaAaAaAAaAaAaAaAaAaAaAaAAaAaAa!' : '***AAAAH!***' );
                }else{
                    speak(((rNum(10)) >= 5) ? '_\*Incoherent screaming*_' : '\"...\" _the sounds were so high only a dog can hear them_');
                }
            break;
			
			case 'REE':
            	var aNumber = rNum(10);
				if (aNumber >= 6){
                    speak(((rNum(10)) >= 5) ? 'ReeEeEeEEE!' : 'rEeeeEEEE!');
                }else if(aNumber <= 3){
                    speak(((rNum(10)) >= 5) ? '$scream' : 'rrrreeeeeeeEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE!');
                }else{
                    speak(((rNum(10)) >= 5) ? '_\*explodes with \`ree\`\'s*_' : '_\*Screaming frog sounds*_');
                }
            break;
            
			case 'LORE':
				let loredata = fs.readFileSync('./data/lorenew.json');  
				let loreparsed = JSON.parse(loredata); 
				var result = '';
                if(args[0]) {
					var find = args.toString().toUpperCase();
					try {
					  result = loreparsed["lore"][find][1];
					}
					catch(err) {
					  result = "not found";
					}
					
					speak(result);
				}else{
					var listvar = Object.keys(loreparsed["lore"]);
					var listresult = [];
					listvar.foreach(function(III){
						listresult.push(III);
					});
					speak('_<@' + userID+ '>, I have the following topic(s) available:\n_ **' + listresult + '**');
				}
            break;
			
			case 'ADDLORE':
				if(args[0]){
					fs.readFile('./data/lore.json', 'utf8', function (err,data) {
						if (err) {
							return console.log(err);
						}
						var result = data.replace('\"\}', '\", \"'+ args[0].toUpperCase().replace(/,|\*|_|\`|:/gi, '') + '\": \"' + args.join(' ').replace(/\"/g, '\\"') + '\"\}').replace(/(?:\r\n|\r|\n)/g, ' ');

						fs.writeFile('./data/lore.json', result, 'utf8', function (err) {
							if (err) return console.log(err);
						});
					});
					speak('I added... something related to ' + args[0]);  
				}else{
					speak('\`you eh... need to add some text, just start writing things after the \"$addlore\", you can add embellishments all you like too, by the way.\`');  
				}
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
			
			case 'DIE':
				if (channelID == '483465099093344276')
				{
					die();
				}else{
					speak('You can only do that in the \`bot commands\` channel');
				}
			break;
			
			case 'ROLL':
				if(args[0]){
					speak('conditional roll');
				}else{
					var num1 = rNum(6) + 1;
					var num2 = rNum(6) + 1;
					speak( '<@' + userID+ '> has rolled **' + (num1 + num2) + '** ( \`' + num1 + '\`, \`' + num2 + '\` )');
				}
			break;
            
            default:
                speak('ehm... ok? try running \`$help\`');
            break;
        }
     }
	
	fs.appendFile("./logs/log.txt", Date.now() + ' UID: ' + userID + ' CID: ' + channelID + ' U: ' + user + ' Msg: ' + message + ' Evt: ' + evt + '\n', function(err) {
		if(err) {
			return logger.info(err);
		}
	}); 

	if (Math.floor(Math.random() * 30000) <= 10){
		bot.sendMessage({
			to: '481133060348182550',
			message: 'no alignmend does not mean you don\'t do nothing, you should RP! join a side or do your own thing'
		});
	}
});


