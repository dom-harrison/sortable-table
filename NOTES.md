# NOTES

- The 'if' condition at the bottom of index.js is to allow the functions to be exported for testing, without using another library. In a real-world build this could be handled using import/exports and a transpiling library.
- If the API call fails, an error will be shown on screen.
- In order to add new columns in the future, simply adjust the fieldMap array in index.js.
- Node version >= 8 will be required for the tests to run.
