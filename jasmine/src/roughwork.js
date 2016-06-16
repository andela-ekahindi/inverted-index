function Index() {
  var self = this;
  this.index = {};
  this.stopWords = [
    "a", "i", "an", "and", "as", "at", "by",
    "for", "has", "in", "is", "it", "of", "on",
    "that", "the", "to", "was", "were", "with"
  ];
  this.books = [{
      "title": "Alice in Wonderland",
      "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {

      "title": " The Lord of the Rings: The Fellowship of the Ring.",
      "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
  ];
}
Index.prototype.isCreated = function() {
  return Object.keys(this.index).length > 0 ? true : false //returns true if the index has values.
};

Index.prototype.cleanData = function(string) {
  var cleanString = [];
  string = string.toLowerCase().replace(/[,.:]/g, "").split(" ");

  for (word of string) {
    if (!this.stopWords.includes(word)) {
      cleanString.push(word);
    }
  }
  return cleanString;
};

Index.prototype.getIndex = function() {
  //Getter Function that returns the index.
  return isCreated() ? this.inverted_index : "No Index Created"
};

Index.prototype.createIndex = function() {
  // var self = this;

  var loadedData = this.books;

  completed = this.populateIndex(loadedData);
  return true;
};



Index.prototype.populateIndex = function(data) {
  var self = this;
  data.forEach(function getLoadedData(book, num) {
    for (var bookProp in book) {
      var sentence = self.cleanData(book[bookProp]);
      sentence.forEach(function insertWord(word) {
        if (self.index.hasOwnProperty(word)) {
          if (self.index[word].indexOf(num) == -1) {
            self.index[word].push(num);
          }
        } else {
          self.index[word] = [num];
        }
      });
    };

  });

};
var ind = new Index();
console.log(ind.createIndex());
console.log(ind.index);
