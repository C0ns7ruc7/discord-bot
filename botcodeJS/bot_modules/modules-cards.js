module.exports = {	
	cards: function(args, userID, fs, logger, evt){
		
					//rgeneric random function
		function rand(max, min){
			return Math.floor(Math.random() * (max - min) ) + min;
		}
		
		var argsUpper = args.map(function(x){ return x.toUpperCase() });
		
		switch(argsUpper[0]){
			
			case 'NEW':	//create method
			
				function oneset(x){
					return ["Ace of " + x,
					x + " 2",
					x + " 3",
					x + " 4",
					x + " 5",
					x + " 6",
					x + " 7",
					x + " 8",
					x + " 9",
					x + " 10",
					"Jack of " + x,
					"Queen of " + x,
					"King of " + x];
				}
				
				function jokers(x){
					var z = [];
					for (y = 0; x > y; ++y){
						z.push("Joker");
					}
					return z;
				}
				
					//create object
				var newdeck = [];
				if (argsUpper[2] == "STANDARD"){
					newdeck = []
						.concat(oneset("Spades"))
						.concat(oneset("Diamonds"))
						.concat(oneset("Hearts"))
						.concat(oneset("Clubs"))
						.concat(jokers(2));
					
				}else if(argsUpper[2] == "DOUBLE"){
					newdeck = []
						.concat(oneset("Spades"))
						.concat(oneset("Diamonds"))
						.concat(oneset("Hearts"))
						.concat(oneset("Clubs"))
						.concat(jokers(4))
						.concat(oneset("Triads"))
						.concat(oneset("Fruits"))
						.concat(oneset("Guns"))
						.concat(oneset("Glasses"));
					
				}else if(argsUpper[2] == "JOKERS"){
					newdeck = []
						.concat(oneset("Pranks"))
						.concat(oneset("Disasters"))
						.concat(oneset("Laughs"))
						.concat(oneset("Frights"))
						.concat(oneset("Crazzies"))
						.concat(jokers(8));
					
				}else{
					newdeck = []
						.concat(oneset("Spades"))
						.concat(oneset("Diamonds"))
						.concat(oneset("Hearts"))
						.concat(oneset("Clubs"))
						.concat(jokers(3));
					
				}
				
					//saves object
				var serverloc;
				if (argsUpper[1] == "SERVER"){
					serverloc = evt["d"]["guild_id"];
				}else if(argsUpper[1] == "CHAT"){
					serverloc = evt["d"]["channel_id"];
				}else if(argsUpper[1] == "PERSONAL"){
					serverloc = evt["d"]["author"]["id"];
				}else{
					// todo: make soemthing here
				}
				
				let carddata = fs.readFileSync('./data/carddeck.json');  
				let cardparsed = JSON.parse(carddata);
				
				var newdata = cardparsed.serverloc[newdeck];
				
				logger.info(newdata);
				
				fs.writeFile('./data/carddeck.json', JSON.stringify(newdata), 'utf8', function (err) {
					if (err){logger.info(err)};
				}); 
				
			break;
			
			case 'DRAW'://draw method
				
				let drawdata = fs.readFileSync('./data/carddeck.json');  
				let drawparsed = JSON.parse(drawdata);
				var newdeck = drawparsed;
				
				var serverloc;
				if (argsUpper[1] == "SERVER"){
					var serverloc = evt["d"]["guild_id"];
				}else if(argsUpper[1] == "CHAT"){
					var serverloc = evt["d"]["channel_id"];
				}else if(argsUpper[1] == "PERSONAL"){
					var serverloc = evt["d"]["author"]["id"];
				}else{
					// todo: make soemthing here
				}
				
				logger.info("newdeck|"+newdeck);
				
				var draw = rand(newdeck.length-1, 0);
				var secondary = rand(newdeck[primary].length-1, 0);
				var tertairy = newdeck[primary][secondary].splice(0, 1);
				
				return tertairy;
				
			break;
			
				//return the vallue to be said
			default: break;
		}
		return tertairy;
	}
};

