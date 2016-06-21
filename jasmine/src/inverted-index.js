function Index() {
  var self = this;
  //A private variable that will store the Inverted Index
  this.index = {};
  //Dictonary of Stop words
  this.stopWords = [
    "a", "i", "an", "and", "as", "at", "by",
    "for", "has", "in", "is", "it", "of", "on",
    "that", "the", "to", "was", "were", "with", ''
  ];
};

// Prototypes to separate the implementation.
//Function that checks if the Inverted Index is populated.
Index.prototype.isCreated = function() {
  return Object.keys(self.index).length > 0 ? true : false //returns true if the index has values.
};
//Function that Reads the Json data from files. 
Index.prototype.readJson = function(filepath) {
  return fetch(filepath)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    }).catch(function(err) {
      throw err;
    });
};
//Function that remove all the stop words above and does the formatting. 
Index.prototype.cleanData = function(string) {
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
  var self = this;
  data.forEach(function getLoadedData(book, location) {
    var sentences = '';
    Object.keys(book).forEach(function(keys) {
      sentences += book[keys] + " ";
    });

    var sentence = self.cleanData(sentences);

    sentence.forEach(function(word) {
      if (self.index.hasOwnProperty(word)) {
        if (self.index[word].indexOf(location) == -1) {
          self.index[word].push(location);
        }
      } else {
        self.index[word] = [location];
      }
    });
  });
};
//Function for creating the Index.
Index.prototype.createIndex = function(filepath) {
  self = this;
  if (typeof filepath !== 'string') {
    return "Invalid Arguement";
  } else {
    return this.readJson(filepath).then(function(response) {
        var data = response;
        self.populateIndex(data);
        return self.isCreated();
      })
      .catch(function(err) {
        throw err;
      });
  }

};
Index.prototype.exist = function(term) {
  return self.index.hasOwnProperty(term);
}

Index.prototype.getIndex = function() {
  //Getter Function that returns the index.
  return self.isCreated() ? self.index : "No Index Created"
};

Index.prototype.searchIndex = function(term) {
  //Function that searches the Inverted Index for words.
  //var self = this;


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
