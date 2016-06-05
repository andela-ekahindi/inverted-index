function Index () {
	var inverted_index = {};
	var stop_words = {"a"   : true,
					  "i"   : true,
					  "an"  : true, 
					  "and" : true, 
					  "as"  : true, 
					  "at"  : true, 
					  "by"  : true, 
					  "for" : true, 
					  "has" : true, 
					  "in"  : true, 
					  "is"  : true, 
					  "it"  : true, 
					  "of"  : true, 
					  "on"  : true, 
					  "that": true, 
					  "the" : true, 
					  "to"  : true,
					  "was" : true, 
					  "were": true, 
					  "with": true};
	this.createIndex = function (filepath){
		//this is a function that creates the inverted index. It returns true if the .json file is not empty
		// need to drop common words including

		//You first Load the .json file
		var loadedData = require(filepath);

		//this is a function that remove all the stop words above. 
		var removeStopWords = function(doc_word){
			var doc = doc_word.toLowerCase().replace(/[,.:]/g, "").split(" ");
			var doc_without_stop_words = [];
			for (var i = 0; i < doc.length; i++) {
				//This is to check if a word exists in the stop word object.
				if(typeof(stop_words[doc[i]]) === "undefined"){
					doc_without_stop_words.push(doc[i]);
				}
			};
			return doc_without_stop_words;
		}

		for (var prop in loadedData){
			var documents = loadedData[prop];
			for (var bookProp in documents){
				var sentence = removeStopWords(documents[bookProp]);
				for(var i = 0; i < (sentence.length); i++){
					if (inverted_index.hasOwnProperty(sentence[i])){
						if (inverted_index[sentence[i]].indexOf(prop) == -1) {
							inverted_index[sentence[i]].push(prop);
						}
					}
					else{
						inverted_index[sentence[i]] = [prop];
					} 
				}
			}
		}
		console.log(inverted_index);
		return "one";
	};
	this.getIndex = function (){
		//this is a function that gets the inverted index from the class variable and avails it to the user. It returns the index if it is not empty.
		if(inverted_index.length === undefined){
			return "No Index Created";
		}
		else{
			return inverted_index;
		}
	};
	this.searchIndex = function (term){
		if(typeof term === "string"){
			var input = term.toLowerCase();
			//this is a function that searches for the term in the index. Produces the best results for searching those objects.
			for (var prop in inverted_index){
				if(prop === input){
					return "Search Term Given: "+ term + " Word Searched: " + prop + " Content of the Index: " + inverted_index[prop]; 
				}
			}
			return "No such word found"; //if the for loop ends without finding the word then should return this.
		}
		else{
			return "Invalid Search Term";
		}
	}
		
};

var index = new Index();
index.createIndex("../books.json" );
console.log(index.searchIndex("ALICE"));