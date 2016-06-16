function Index() {

  //A private variable that will store the Inverted Index
  this.index = {};
  //Dictonary of Stop words
  this.stopWords = [
    "a", "i", "an", "and", "as", "at", "by",
    "for", "has", "in", "is", "it", "of", "on",
    "that", "the", "to", "was", "were", "with"
  ];
};

// Prototypes to separate the implementation.
//Function that checks if the Inverted Index is populated.
Index.prototype.isCreated = function() {
  return Object.keys(this.index).length > 0 ? true : false //returns true if the index has values.
};
//Function that Reads the Json data from files. 
Index.prototype.readJson = function(filepath) {
  //Check if file path is for a .json file
  return fetch(filepath)
    .then(function(response) {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(new Error("File Not Found"));
      }

    })
    .catch(function(err) {
      // console.log("This is fetch error", err);

      return err;
    });


};
//Function that remove all the stop words above and does the formatting. 
Index.prototype.cleanData = function(string) {
  var self = this;
  var cleanString = [];
  string = string.toLowerCase().replace(/[,.:]/g, "").split(" ");

  for (word of string) {
    if (!self.stopWords.includes(word)) {
      cleanString.push(word);
    }
  }
  return cleanString;
};
//Function that Populates Index
Index.prototype.populateIndex = function(data) {
  var here = this;
  data.forEach(function getLoadedData(book, num) {
    for (var bookProp in book) {
      var sentence = here.cleanData(book[bookProp]);
      sentence.forEach(function insertWord(word) {
        if (here.index.hasOwnProperty(word)) {
          if (here.index[word].indexOf(num) == -1) {
            here.index[word].push(num);
          }
        } else {
          here.index[word] = [num];
        }
      });
    };
  });
};



//Function for creating the Index.
Index.prototype.createIndex = function(filepath) {
  self = this;


  return this.readJson(filepath).then(function(response) {
      var data = response;
      self.populateIndex(data);
      return Promise.resolve(self.isCreated());
    }).catch(function() {
      console.log("We are here");
    })
    // console.log(self.index);
    // return true;

};
Index.prototype.exist = function(term) {
  return this.index.hasOwnProperty(term);
}

Index.prototype.getIndex = function() {
  //Getter Function that returns the index.
  return this.isCreated() ? this.index : "No Index Created"
};

Index.prototype.searchIndex = function(term) {
  //Function that searches the Inverted Index for words.
  var self = this;

  if (typeof term !== 'string') {
    return "Invalid Search Term";
  }

  if (!self.isCreated()) {
    return "No Index Created";
  }

  var input = term.toLowerCase();
  //this is a function that searches for the term in the index. Produces the best results for searching those objects.
  return self.exist(input) ? self.index[input] : "No such word found"
}
