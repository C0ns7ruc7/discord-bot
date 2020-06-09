module.exports = {	
	cards: function(args, userID, fs, logger, evt){
		
					//rgeneric random function
		function rand(max, min){
			return Math.floor(Math.random() * (max - min) ) + min;
		}
		
		var argsUpper = args.map(function(x){ return x.toUpperCase() });
		var tertairy;     // used as generic return variable
		var trinari;      // used as variable preceeding 'tertairy'
		var newdata = {}; // used to hold saved jason as variable
		var severloctxt;  // text associated with "serverloc"
		
		let drawdata = fs.readFileSync('./data/carddeck.json');
		let drawparsed = JSON.parse(
			(drawdata == "" ? "{}" : drawdata) // checks if it's not a buggerup
		);
		var newdeck = drawparsed;
		
		var serverloc; // find the position it was saved in
		if (argsUpper[1] == "SERVER"){
			serverloc = evt["d"]["guild_id"];
			severloctxt = "for the whole server";
		}else if(argsUpper[1] == "CHAT"){
			serverloc = evt["d"]["channel_id"];
			severloctxt = "for this chat";
		}else if(argsUpper[1] == "PERSONAL"){
			serverloc = evt["d"]["author"]["id"];
			severloctxt = "only for you";
		}else{
			// todo: make soemthing here
			return "`You can't draw from everyone's deck`";
		}
		
		function save(newdeck){
			newdata = newdeck;
			
			fs.writeFile('./data/carddeck.json', JSON.stringify(newdata), 'utf8', function (err) {
				if (err){logger.info(err)};
			}); 
		}
		
		switch(argsUpper[0]){
			
			case 'NEW':	//create method
			
				tertairy = "... wait, something went wrong";
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
				
					//create deck object
				var deckcreate = [[], [], []]; // [deck], [hand], [discard];
				if (argsUpper[2] == "STANDARD"){
					deckcreate[0] = []
						.concat(oneset("Spades"))
						.concat(oneset("Diamonds"))
						.concat(oneset("Hearts"))
						.concat(oneset("Clubs"))
						.concat(jokers(2));
					tertairy = argsUpper[2];
				}else if(argsUpper[2] == "DOUBLE"){
					deckcreate[0] = []
						.concat(oneset("Spades"))
						.concat(oneset("Diamonds"))
						.concat(oneset("Hearts"))
						.concat(oneset("Clubs"))
						.concat(jokers(4))
						.concat(oneset("Triads"))
						.concat(oneset("Fruits"))
						.concat(oneset("Guns"))
						.concat(oneset("Glasses"));
					tertairy = argsUpper[2];
				}else if(argsUpper[2] == "ICON"){
					deckcreate[0] = []
						.concat(oneset("♠"))
						.concat(oneset("♦"))
						.concat(oneset("♥"))
						.concat(oneset("♣"))
						.concat(jokers(2));
					tertairy = argsUpper[2];
				}else if(argsUpper[2] == "OFFICAL"){
					deckcreate[0] = []
						.concat(oneset("Spades"))
						.concat(oneset("Diamonds"))
						.concat(oneset("Hearts"))
						.concat(oneset("Clubs"));
					tertairy = argsUpper[2];
				}else if(argsUpper[2] == "JOKERS"){
					deckcreate[0] = []
						.concat(oneset("Pranks"))
						.concat(oneset("Disasters"))
						.concat(oneset("Laughs"))
						.concat(oneset("Frights"))
						.concat(oneset("Crazzies"))
						.concat(jokers(8));
					tertairy = argsUpper[2];
				}else{
					deckcreate[0] = []
						.concat(oneset("Spades"))
						.concat(oneset("Diamonds"))
						.concat(oneset("Hearts"))
						.concat(oneset("Clubs"))
						.concat(jokers(3));
					tertairy = "Defualt";
				}
				
				newdeck[serverloc] = deckcreate;
				
				save(newdeck);
				
				return "`Made a deck of cards " + severloctxt + " with the type: " + tertairy + ".`";
			break;
			
			case 'DRAW'://draw method
				trinari = "";
				
				function carddrawfunc(x){
					if((newdeck[serverloc][0].length-1, 0) <= x){ // true if no cards left
						var reshuffle = newdeck[serverloc][2].splice(0, (newdeck[serverloc][2].length));
						newdeck[serverloc][0] = newdeck[serverloc][0].concat(reshuffle);
						logger.info(reshuffle);
						logger.info(newdeck);
					}
					
					for(y = 0; y < x; y++){
						var primary = rand(newdeck[serverloc][0].length-1, 0);
						var secondary = newdeck[serverloc][0].splice(primary, 1);
						newdeck[serverloc][1] = newdeck[serverloc][1].concat(secondary);
						
						if (argsUpper[3] == "HIDDEN"){
							trinari = y + 1;
						}else{
							trinari = trinari + "[" + secondary + "] ";
						}
					}
					
				}
				if(argsUpper[2] && !isNaN(argsUpper[2])){
					carddrawfunc(argsUpper[2]);
				}else{
					carddrawfunc(1);
				}
				
				tertairy = trinari;
				
				save(newdeck);
				
				return tertairy;
			break;
			
			case 'LOOK'://play method				
				if (argsUpper[2] == "HIDDEN"){
					
					var count = 0;
					var i;

					for (i in newdeck[serverloc][1]) {
						if (newdeck[serverloc][1].hasOwnProperty(i)) {
							count++;
						}
					}
					return "Card count: " + count;
				}else{
					
					var count = 0;
					var i;
					tertairy = "";

					for (i in newdeck[serverloc][1]) {
						if (newdeck[serverloc][1].hasOwnProperty(i)) {
							count++;
							tertairy = tertairy + "[(" + count + ")" + newdeck[serverloc][1][i] + "] ";
						}
					}
					
					return tertairy;
				}
			break;
			
			case 'PLAY'://play method
				trinari = "";
				
				if(argsUpper[2] && !isNaN(argsUpper[2])){
					if(newdeck[serverloc][1].length >= argsUpper[2]){
						var secondary = newdeck[serverloc][1].splice(argsUpper[2]-1, 1);
						newdeck[serverloc][2] = newdeck[serverloc][2].concat(secondary);
					
						trinari = trinari + "<@" + userID + "> played: [" + secondary + "]";
					}else{
						trinari = "_You place down a imaginary card, fooling only yourself._ (`too small/big number`)";
					}
				}else{
					trinari = "_You fumble with your cards, unable to decide._ (`No vallid number`)";
				}
				
				tertairy = trinari;
				
				save(newdeck);
				return tertairy;
			break;
			
			case 'DISCARD'://discard method
				trinari = "";
				
				if(argsUpper[2] && !isNaN(argsUpper[2])){
					if(newdeck[serverloc][1].length >= argsUpper[2]){
						var secondary = newdeck[serverloc][1].splice(argsUpper[2]-1, 1);
						newdeck[serverloc][2] = newdeck[serverloc][2].concat(secondary);
					
						trinari = trinari + "<@" + userID + "> discarded: [" + secondary + "]";
					}else{
						trinari = "_You discard your sanity, the cards in hand are unchanged._ (`too small/big number`)";
					}
				}else{
					trinari = "_You decide to hold on to your cards._ (`No vallid number`)";
				}
				
				tertairy = trinari;
				
				save(newdeck);
				return tertairy;
			break;
			
				//return the vallue to be said
			default: break;
		}
		 return tertairy;
	}
};

