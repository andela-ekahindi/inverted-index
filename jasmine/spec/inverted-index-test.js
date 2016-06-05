describe("Index", function() 
{
  var index = new Index();
  describe("createIndex", function() 
  {
    it("should create the Inverted Index from the Json file passed", function () {
      // expect(Index.createIndex("")).not.toBe(false);//returns false when empty or no .json file passsed
      expect(index.createIndex("jiii")).toBe("one");//returns true when it creates an index.

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
    it("should return the best search instance of the terms given.", function () 
    {
      // expect(Index.getIndex(searchterm)).toBe(false);//returns false when this is run before the createIndex method //// need to find text that does this
      expect(index.searchIndex("searchterm")).toBe("No such word found"); //returns this when that search term does not exist.
      //returns true when the search term is in the Inverted index.
    });

  });

});