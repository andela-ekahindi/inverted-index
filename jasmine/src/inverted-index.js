'use strict';

function Index() {
  // variable that store

  this.index = {};

  // Array of all Stop words

  this.stopWords = [
    'a', 'i', 'an', 'and', 'as', 'at', 'by',
    'for', 'has', 'in', 'is', 'it', 'of', 'on',
    'that', 'the', 'to', 'was', 'were', 'with', ' '
  ];
}

// Prototypes to separate the implementation.
// Function that checks if the Inverted Index is populated. Rwtuens true if the object has keys.

Index.prototype.isCreated = function() {
  return Object.keys(this.index).length > 0 ? true : false;
};

// Function that Reads .json file using the fetch API. Which uses promises instead of annoying callbacks

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

// Function that formats the data by removing all the stop words above and does the formatting.

Index.prototype.cleanData = function(string) {
  var cleanString = [];
  string = string.toLowerCase().replace(/\W/g, ' ').split(' ');

  for (var word of string) {
    if (!this.stopWords.includes(word)) {
      cleanString.push(word);
    }
  }
  return cleanString;
};

// Function that Inserts the actual words in the index object.

Index.prototype.populateIndex = function(data) {
  var self = this;
  data.forEach(function getLoadedData(book, location) {
    var sentences = '';
    Object.keys(book).forEach(function(keys) {
      sentences += book[keys] + ' ';
    });

    var sentence = self.cleanData(sentences);

    sentence.forEach(function(word) {
      if (self.index.hasOwnProperty(word)) {
        if (self.index[word].indexOf(location) === -1) {
          self.index[word].push(location);
        }
      } else {
        self.index[word] = [location];
      }
    });
  });
};

// Main function that calls all the other methods above.

Index.prototype.createIndex = function(filepath) {
  var self = this;
  if (typeof filepath !== 'string') {
    return 'Invalid Argument';
  } else {
    return this.readJson(filepath).then(function(response) {
        self.populateIndex(response);
        return self.isCreated();
      })
      .catch(function(err) {
        throw err;
      });
  }
};

Index.prototype.exist = function(term) {
  return this.index.hasOwnProperty(term);
};

Index.prototype.getIndex = function() {
  return this.isCreated() ? this.index : null;
};

Index.prototype.searchIndex = function(term) {

  // Function that searches the Inverted Index for words.

  if (typeof term !== 'string') {
    return null;
  }

  if (!this.isCreated()) {
    return null;
  }

  var input = term.toLowerCase().replace(/\W/g, '');

  // Function that searches for the term in the index. Produces the best results for searching those objects.

  return this.exist(input) ? this.index[input] : -1;
};
