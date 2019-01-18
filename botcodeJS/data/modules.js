module.exports = {	
	helpText: function(userID){	
		return 'this is the help function of the molten bot, I have the following commands that you can use, <@' + userID + '>! \n\n' + 
			'Ok first up i\'m still being made so, be gentle... \n\n' + 
			'- I have \`Ping\`, \`pong\`, \`bing\`, \`bong\`, \`ree\`, \`scream\`, \`beep\` and \`boop\` they are what they are, use em an I will come back at you >=\) \n' + 
			'- then I have the \`say\` {msg} comand, it makes me repeat you... I don\'t know why that is here. \n' + 
			'- I also keep track of \`lore\` [lore name] things, do a empty command for a list. \n' +
			'- you can add things with \`addlore\` {[first word is key] the rest, explaining stuf} \n' + 
			'- if you just want any lore, use \`rlore\` for random stuff.\n' +
			'- remove lore with \`rmvlore\` to get rid of it(wip). \n' + 
			'- there is also the \`mail\` [#channel(or when in DM a number)] {msg}  where you can send to a channel \n' + 
			'- a functional command is the \`whatis\` [@user/role OR #channel], it shows you the number needed for DM\'ing using the mail function \n' + 
			'- I also have the \`roll\` command, it works as a automatic 2d6 if you don\'t add comments \n' + 
			'- then there is the \`die\` command that can shut me down.\n' +
			'\n' + 
			'there are a bunch of other things in the works \n' + 
			'don\'t forget I use \`$\`\'s to react';
		},
	
	randomNum: function(num){
		var data = ((Math.random()*10)+'').replace('.', '').split('');
		var numb = data[data[0]] * 1;
		if (numb >= num){
			numb = numb % num;
		}
		return numb;
	},
	
	randomResponce: function(inputArray){
		var decider = this.randomNum(inputArray.length)
		return inputArray[decider];
	},
	
	whatIs: function(args, userID){
		if (args[0]){
			return (
				'_<@' 
				+ userID
				+ '> the deciphered things you said:_' 
				+ args.join(' ')
				.replace(/<|>|@/gi, '')
				.replace(/#/gi, ' Channel:')
				.replace(/&/gi, ' Role:')
				.replace(/!/gi, ' User:')
			);
		}else{
			return('you forgot everything...');
		}
	},
	
	returnText: function(args, userID){
		var cmd = args[0];
		if (cmd && cmd.substring(0, 1) !== '$'){
			var result = '';
			for (II in args){
				result = result + ' ' + args[II];
			}
			return('_<@' + userID + '> said:_ **' + result + '**');
		}else{
			return this.randomResponce([
				'you what?',
				'are you daft?',
				'nope, not saying that and you can\'t make me',
				'err... did you try not doing the \'thing\'?'
			]);
		}
	},
	
	sendText: function(args, channelID, userID){
		if(args[0]){
			var sendto = args[0].replace(/<|#|>/g, '')
			args = args.splice(1);
			
			var result = '';
			for (II in args){
				result = result + ' ' + args[II];
			}
			return[
				'your message has been sent',
				'**\`[' + Math.floor((channelID - userID) / Date.now()) + ']\`**:' + result + '',
				sendto + '',
			];
		}else{
			return(['you broke the message']);
		}	
	},
	
	getLore: function(args, userID, fs, logger){
		let loredata = fs.readFileSync('./data/lore.json');  
		let loreparsed = JSON.parse(loredata); 
		if(args[0]) {
			var find = args.toString().toUpperCase();
			try {
				var listvar = Object.keys(loreparsed["lore"]);
				
				var III, len;
				for (III = 0, len = listvar.length; III < len; ++III) {
					if(loreparsed["lore"][III][0] === find){
						var result = loreparsed["lore"][III][1];
					}
				}	
				if(result){}else{result = "not found, try adding it with `$addlore` '" + args.join(' ') + " + 'soemthing you wrote'";}
			}catch(err){
				result = "Something went horribly wrong...";
				logger.info(err);
			}
			return(result);
		}else{
			var listvar = Object.keys(loreparsed["lore"]);
			var listresult = [];

			var III, len;
			for (III = 0, len = listvar.length; III < len; ++III) {
				listresult.push(
					' ' + loreparsed["lore"][III][0].toLowerCase().replace(',', ' ')
				);
			}
			return('_<@' + userID+ '>, I have the following topic(s) available:\n_ **' + listresult + '**');
		}
	},
	
	randomLore: function(fs, logger){
		let loredata = fs.readFileSync('./data/lore.json');  
		let loreparsed = JSON.parse(loredata);
		var result = "Something went horribly wrong...";		
		try {
			var listvar = Object.keys(loreparsed["lore"]);
			result = loreparsed["lore"][this.randomNum(listvar.length)-1][1]
		}catch(err){
			logger.info(err);
		}
		return(result);
	},
	
	setLore: function(args, userID, fs, logger){
		var loreResult;
		if(args[0]){
			var objectKey = args[0]
				.toUpperCase()
				.replace(/,|\*|\`|:/gi, '')
				.split('\n')[0]
				.replace(/_|-/g, ',');
			let data = fs.readFileSync('./data/lore.json', function (err) {
				if (err) { logger.info(err);}
			});
			var newdata = JSON.parse(data); 
			var listvar = Object.keys(newdata["lore"]);
			
			var III, len;
			for (III = 0, len = listvar.length; III < len; ++III) {
				if(newdata["lore"][III][0] === objectKey){
					if(newdata["lore"][III][2] === userID){
						newdata["lore"][III] = [
							objectKey,
							args.join(' '),
							userID
						];
						loreResult = "edited data";
						var done = true;
					}
					loreResult = "you don't own the data";
				}
			}	
			if(done === false){
				newdata["lore"][(Object.keys(newdata["lore"])).length] = [
					objectKey,
					args.join(' '),
					userID
				];
				loreResult = "\`I added: " + objectKey.toLowerCase() + '.\`';
			}
			fs.writeFile('./data/lore.json', JSON.stringify(newdata), 'utf8', function (err) {
				if (err){logger.info(err)};
			}); 
			
			return loreResult;
		}else{
			return '\`you eh... need to add some text, just start writing things after the \"$addlore\", you can add embellishments all you like too, by the way.\`';  
		}
	}
};