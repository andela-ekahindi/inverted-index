function Index () {
	//A private variable that will store the Inverted Index
	var inverted_index = {};

	//Dictonary of Stop words
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

	//Function that checks if the Inverted Index is populated.
	var check_if_index_created = function(){
		for (var word in inverted_index) { return false; }
			return true;
	}

	//Function that Creates the Inverted Index from the .json file passed 
	var loadingData = function(filepath){
		//Check if file path is for a .json file
		if(typeof window !== "undefined"){
			return fetch('./api/some.json')  
		  .then(  
		    function(response) {  
		      if (response.status !== 200) {  
		        console.log('Looks like there was a problem. Status Code: ' +  
		          response.status);  
		        return;  
		      }

		      // Examine the text in the response  
		      response.json().then(function(data) {  
		        console.log(data);  
		      });  
		    }  
		  )  
		  .catch(function(err) {  
		    console.log('Fetch Error :-S', err);  
		  });
		}
		else{
			return require(filepath);
		} 
	}
	this.createIndex = function (filepath){
		//It returns true if the .json file is not empty
		//returns false when .json is empty.
		

		//Loadin data from the .json file
		var loadedData = loadingData(filepath);//use fetch????

		//Function that remove all the stop words above and does the formatting. 
		var removeStopWords = function(doc_word){
			var doc = doc_word.toLowerCase().replace(/[,.:]/g, "").split(" ");
			var doc_without_stop_words = [];
			for (var i = 0; i < doc.length; i++) {
				//Checks if the word exists in the stop_words object.
				if(typeof(stop_words[doc[i]]) === "undefined"){
					doc_without_stop_words.push(doc[i]);
				}
			};
			return doc_without_stop_words;
		}

        //For loop that creates the Index
		for (var prop in loadedData){
			for (var bookProp in loadedData[prop]){
				var sentence = removeStopWords(loadedData[prop][bookProp]);
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
		return true;
	};
	this.getIndex = function (){
		//Getter Function that returns the inverted index.
		var check = check_if_index_created();
		if(check){
			return "No Index Created";
		}
		else{
			return inverted_index;
		}
	};
	this.searchIndex = function (term){
		//Function that searches the Inverted Index for words.
		var check = check_if_index_created();
		if(check){
			return "No Index Created";
		}
		else{
			if(typeof term === "string"){
				var input = term.toLowerCase();
				//this is a function that searches for the term in the index. Produces the best results for searching those objects.
				for (var prop in inverted_index){
					if(prop === input){
						return inverted_index[prop]; 
					}
				}
				return "No such word found"; //if the for loop ends without finding the word then should return this.
			}
			else{
				return "Invalid Search Term";
			}
		}
	
	}
		
};


var index = new Index();
console.log(index.getIndex());
console.log(index.searchIndex("ALICE"));
index.createIndex("../books.json" );
console.log(index.searchIndex("ALICE"));
console.log(index.getIndex());


module.exports = Index;