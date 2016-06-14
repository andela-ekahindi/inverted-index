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








describe("Index", function() 
{
  
    // beforeEach(function(){
  var index = new Index();

    // });
  describe('Read book data', function() {
    it('should check if the file passed is a valid JSON and not empty', function() {
      //Need to think about this
      // reads the JSON file and asserts that it is not empty
      // expect(index.createIndex('/books.json')).toThrow();
      // expect(index.createIndex('/books.json')).toThrow(new Error('Cannot Find /books.json'));
      // expect(index.createIndex('./books.json')).toBe('');
    });
  });


  describe('Populate Index', function() {

    it('should assert that the Index is created after the json is reaad', function() {
      expect(index.getIndex()).toBe("No Index Created");
      expect(index.createIndex("http://localhost:8000/books.json")).toBeTruthy;
      //a test that verifies that the index is created once the JSON file has been read.
    });

    it('should verify that the right word is put in the right place', function() {
      // a test that verifies the index maps the string keys to the correct objects in the JSON array
    });

    it("should return -No Index Created- the Inverted Index created by the create Index function.", function (){
      //     // expect(Index.getIndex()).toBe(false);//returns false when this is run before the createIndex method //// need to find text that does this
      //     expect(index.getIndex()).toBe("No Index Created"); //returns true when theis is run after the create index method.
    });
  });

  describe('Search index', function() {
    beforeEach(function (done) {
      index.createIndex("http://localhost:8000/books.json").then(function (data) {
        done();
      });
    });

    it("should read the JSON file and assert its not empty", function(done){
        index.loadingData("http://localhost:8000/books.json").then(function(data){
            //console.log("in test ", data);
            expect(data).toBeTruthy();
            done();
        });
    });
    it('should ensure returns an array', function() {
      //test that verifies that searching the index returns an array of the indices of the correct objects that contain the words in the search query.
    });
    it("should return -Invalid Search Term- if not a string passed.", function () 
     {
       //returns false when this is run before the createIndex method //// need to find text that does this
       expect(index.searchIndex(1)).toBe("Invalid Search Term");
     });

    it("should return -No such word found- if a string not in the books was passed.", function () 
    {
      expect(index.searchIndex("searchterm")).toBe("No such word found");
    });

    it("should confirm index object have properties which are the words", function () {
      expect(index.searchIndex("alice")).toEqual([0]);
    });

    it("should return an array of where the word is found without mindin the case", function(){
      expect(index.searchIndex("ALICE")).toEqual([0])
    });
  });
});













  //  describe("createIndex", function() 
  // {
  //   // it("should define {} if no create Index was called");
  //   // it("should create the Inverted Index from the Json file passed", function () {
  //   //   // expect(Index.createIndex("")).not.toBe(false);//returns false when empty or no .json file passsed
  //   //   expect(index.createIndex("jiii")).toBe(true);//returns true when it creates an index.

  //   // });

  // });

  // describe("getIndex", function() 
  // {
  //   index.getIndex()
  //   it("should return -No Index Created- the Inverted Index created by the create Index function.", function () 
  //   {
  //     // expect(Index.getIndex()).toBe(false);//returns false when this is run before the createIndex method //// need to find text that does this
  //     expect(index.getIndex()).toBe("No Index Created"); //returns true when theis is run after the create index method.
  //   });

  // });


  // describe("searchIndex", function() 
  // {

  //   it("should return -Invalid Search Term- if not a string passed.", function () 
  //   {
  //     //returns false when this is run before the createIndex method //// need to find text that does this
  //     expect(index.searchIndex(1)).toBe("Invalid Search Term");
  //   });

  //   it("should return -No such word found- if a string not in the books was passed.", function () 
  //   {
  //     expect(index.searchIndex("searchterm")).toBe("No such word found");

  //   });


  //   it("should confirm index object have properties which are the words", function () {
  //     expect(index.searchIndex("alice")).toBe([0]);
  //   });

  //   it("should return an array of where the word is found without mindin the case", function(){
  //     expect(index.searchIndex("ALICE")).toBe([0])
  //   });

  // });

