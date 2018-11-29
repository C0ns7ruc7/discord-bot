// wip script pseudo random choice module

// make it generate sequence of numbers, give it a 
function ego (wfunction, wargument){
	function choose(pick){
		pick = isNaN(pick) ? 0 : pick;
		var raw = (Math.random() + "").substring(2).split('');
		return raw[pick % 16];
	}
	function givenumber(max){
		max
		return Math.floor(Math.random() * Math.floor(max));
	}
	switch(wfunction){
		case "choose":
			wargument = isNaN(wargument) ? 0 : wargument;
			return choose(wargument);
		break;
		
		case "number":
			wargument = isNaN(wargument) ? 0 : wargument;
			return givenumber(wargument);
		break;
		
		defualt:
			return "what?";
		break;
	}
}