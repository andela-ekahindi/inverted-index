# inverted-index
## Introduction
An inverted index is a Data Structure that is used for storing a mapping of words to their location in a certain file, document or object.[Read More](https://en.wikipedia.org/wiki/Inverted_index)
##

## Usage
1. Ensure you are in the [master branch](https://github.com/andela-ekahindi/inverted-index/tree/master).
2. Download the ZIP or Clone the [repository](https://github.com/andela-ekahindi/inverted-index.git).
3. Copy the inverted-index.js.
4. Include the file in your .html file as a script.
5. Create an new instance and use Index and use its Methods.

## Methods
The main methods for the create Index Class are:


##### 1. createIndex(filepath)
This is a method that takes in a filepath to a .json file. From the .json objeect it creates an inverted-index for the contents of that file. 


##### 2. getIndex()
This is a method that does not take any parameters. It return the Inverted-Index of the file passed by calling the method above. 


##### 3. searchIndex(searchterm)
This is a method that is used to search for a word that is in the Inverted-Index create by calling the createIndex(filepath) method.
## Testing
The browser environment was picked to run the test. 

##### Running Tests
1. Install node.js.[How to](https://nodejs.org/en/).
2. Install [http-server](https://github.com/indexzero/http-server).The reason is that a browser cannot load local files thus a need too establish a simple server to provide the files.
3. Go to the jasmine directory in your terminal.
4. Start the server using the command below.
    > http-server [path] [options]
5. Copy one of the links provided by running the command.
6. Paste it on your browser
7. Open the SpecRunner.html file
8. Watch tests pass ;-)
