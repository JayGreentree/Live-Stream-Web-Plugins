var app = (function () {

	var headlines = [];	

	var start = function() {
		getHeadlines();
	}
	
	var getHeadlines = function () {		
		$.when(
			//note we're using a CORS hack here
			getRssSourcePromise("https://cors-anywhere.herokuapp.com/https://cointelegraph.com/rss"),
			getRssSourcePromise("https://cors-anywhere.herokuapp.com/https://www.recode.net/rss/current"),
			getRssSourcePromise("https://cors-anywhere.herokuapp.com/https://techcrunch.com/feed/"),
			getRssSourcePromise("https://cors-anywhere.herokuapp.com/https://www.cnet.com/rss/news/")
		).done(function() {
			//console.log(headlines.length);
			
			shuffleArray(headlines);
			
			//don't forget to attribute your feeds
			headlines.unshift('Headlines from CoinTelegraph.com, CNET, TechCrunch & Recode.net');
			headlines.unshift('Please share, like & subscribe the show!');
			headlines.unshift('Follow the show on Twitter @BobAndKevinShow');
			
			var concatHeadlines = headlines.join(" - ");
							
			$("marquee").text(concatHeadlines);
		}).fail(function(e){
			//console.log(e);
			document.writeln("<span style='color: red;'>" + e.statusText + "</span>");
		});	
	}
	
	var getRssSourcePromise = function(url) {
		return $.ajax({
			type: "GET",
			url: url,			
			dataType: "xml"
		}).done(function(data) {
			addHeadlines(data);
		});
	}
	
	var addHeadlines = function(data) {
		$(data).find("item").each(function () {
			var el = $(this);

			//headlines.push(cleanHeadline("Hello&nbsp;World!%20Hi There!"));
			
			headlines.push(cleanHeadline(el.find("title").text()));
		});
	}
	
	var shuffleArray = function (array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	
	var cleanHeadline = function(input) {
		return unescape(input).replace(/&nbsp;/gi,' ');
	}

	return {
		start: start
	}		
})();

app.start();