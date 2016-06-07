describe("Index", function() 
{
  describe("")
  var index = new Index();
  describe("createIndex", function() 
  {
    it("should define {} if no create Index was called");
    it("should create the Inverted Index from the Json file passed", function () {
      // expect(Index.createIndex("")).not.toBe(false);//returns false when empty or no .json file passsed
      expect(index.createIndex("jiii")).toBe(true);//returns true when it creates an index.

    });

  });

  describe("getIndex", function() 
  {
    it("should return the Inverted Index created by the create Index function.", function () 
    {
      // expect(Index.getIndex()).toBe(false);//returns false when this is run before the createIndex method //// need to find text that does this
      expect(index.getIndex()).toBe("two"); //returns true when theis is run after the create index method.
    });

  });


  describe("searchIndex", function() 
  {
    it("should return -Invalid Search Term- if not a string passed.", function () 
    {
      //returns false when this is run before the createIndex method //// need to find text that does this
      expect(index.searchIndex(1)).toBe("Invalid Search Term");
    });

    it("should return -No such word found- if a string not in the books was passed.", function () 
    {
      expect(index.searchIndex("searchterm")).toBe("No such word found");

    });

    // it("should confirm index object have properties which are the words", function () {
    //   expect(index.searchIndex("alice")).toBe(['0']);
    // });

    // // it("should return an array of where the word is found without mindin the case", function(){
    // //   expect(index.searchIndex("ALICE")).toBe(['0'])
    // // });

  });

});