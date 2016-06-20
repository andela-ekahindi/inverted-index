describe('Index', function() {

  var index = new Index();

  describe('Read book data', function() {


    it('should check if an Invalid Arguement is passed', function() {
      expect(index.createIndex()).toBe('Invalid Arguement');
    });

    it('should check if the file passed is a valid file', function(done) {

      index.createIndex('/test').catch(function(e) {
        expect(e).toEqual(jasmine.any(Error)); //
        done();
      });
    });


    it('should check if the file passed is a valid JSON and not empty', function(done) {

      index.createIndex('/emptyBook.json').catch(function(e) {
        expect(e).toEqual(jasmine.any(Error)); //
        done();
      });
    });


  });

  describe('Populate Index', function() {
    it('should assert that the Index is created after the json is read', function(done) {
      expect(index.getIndex()).toBe("No Index Created");

      index.createIndex("/books.json").then(function(result) {
        expect(result).toBeTruthy();
        done();
      });
    });


    it("should read the JSON file and assert its not empty ", function(done) {
      index.readJson("/books.json").then(function(response) {
        expect(response).toBeTruthy();
        done();
      });
    });


  });

  describe('Search index', function() {
    beforeEach(function(done) {
      index.createIndex("/books.json").then(function() {
        done();
      })
    });

    it('should ensure it returns an array', function() {
      expect(Array.isArray(index.searchIndex("alice"))).toBeTruthy();
    });

    it("should return -Invalid Search Term- if not a string passed.", function() {
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
