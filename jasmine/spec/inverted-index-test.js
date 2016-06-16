// describe('Index', function() {
//   var index = new Index();
//   describe('Read book data', function() {
//     it('should check .......', function() {
//       expect(index.createIndex()).toBe("Invalid Arguement")

//     });

//     it('should.....', function() {

//     });
//   });


//   describe
// });



describe("Index", function() {

  // beforeEach(function(){
  var index = new Index();

  // });
  describe('Read book data', function() {
    it('should check if the file passed is a valid JSON and not empty', function() {
      index.createIndex('/test').then(function(check) {

        expect(check).toEqual(jasmine.any(Error));

      });

    });

    it('should check if valid filepath', function() {
      // var checkagainst;

      index.readJson('/test').then(function(done, check) {
        // var checkagainst = check;
        console.log(expect(check).toEqual(jasmine.any(Error)));
        done();
      });
      //expect(check).toEqual(jasmine.any(Error));
    });

  });


  describe('Populate Index', function() {

    it('should assert that the Index is created after the json is reaad', function() {
      expect(index.getIndex()).toBe("No Index Created");
      expect(index.createIndex("/books.json").then(function(done) {
        console.log(index.index)
        done();
      })).toBeTruthy();

      //a test that verifies that the index is created once the JSON file has been read.
    });

  });

  describe('Search index', function() {
    beforeEach(function(done) {
      index.createIndex("/books.json").then(function(created) {

        // console.log("isCreated:", created);
        done();
      })
    });

    it("should read the JSON file and assert its not empty", function(done) {
      console.log(index.index);
      index.readJson("/books.json").then(function(response) {
        //console.log("in test ", data);
        console.log(index.getIndex());
        console.log("resonse: ", response);
        expect(response).toBeTruthy();
        done();
      });
    });
    it('should ensure returns an array', function() {
      //test that verifies that searching the index returns an array of the indices of the correct objects that contain the words in the search query.
      expect(Array.isArray(index.searchIndex("alice"))).toBeTruthy();
    });
    it("should return -Invalid Search Term- if not a string passed.", function() {
      //returns false when this is run before the createIndex method //// need to find text that does this
      expect(index.searchIndex(1)).toBe("Invalid Search Term");
    });

    it("should return -No such word found- if a string not in the books was passed.", function() {
      expect(index.searchIndex("searchterm")).toBe("No such word found");
    });

    it('should verify that the right word is put in the right place', function() {
      expect(index.searchIndex("alice")).toEqual([0]);
    });


  });
});
