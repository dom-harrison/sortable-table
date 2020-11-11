
// Mock window object
global.window = { addEventListener: () => false };

const index = require('./index.js');

let res;

// Test compareObjects function
console.log('1: Test compareObjects function');
const a = {
  id: 1,
  first_name: 'John',
  last_name: 'Smith',
  email: 'johnsmith200@gmail.com',
  date: '12/13/2018',
};
const b = {
  id: 2,
  first_name: 'John',
  last_name: 'Smith',
  email: 'johnsmith100@gmail.com',
  date: '11/7/2018',
};
// Test id key
console.log('* When key = id and asc = true, result should be -1 if a.id < b.id');
res = index.compareObjects('id', true)(a, b);
console.log('*', res === -1);
// Test id key descending
console.log('* When key = id and asc = false, result should be 1 if a.id < b.id');
res = index.compareObjects('id', false)(a, b);
console.log('*', res === 1);
// Test date key
console.log('* When key = date and asc = true, result should be 1 if a.date > b.date');
res = index.compareObjects('date', true)(a, b);
console.log('*', res === 1);
// Test fullName key
console.log('* When key = fullName and asc = true, result should be 0 if a.first_name + a.last_name = b.first_name + b.last_name');
res = index.compareObjects('fullName', true)(a, b);
console.log('*', res === 0);
// Test other keys
console.log('* When key = email and asc = true, result should be 1 if a.email > b.email');
res = index.compareObjects('email', true)(a, b);
console.log('*', res === 1);


// Test formatTableHead function
console.log('2: Test formatTableHead function');
console.log('* Expect all column headers to be returned');
let expectedResult = '<tr><th onclick=sortRows("id")>NUMBER</th><th onclick=sortRows("date")>DATE</th><th onclick=sortRows("fullName")>FULL NAME</th><th onclick=sortRows("email")>EMAIL</th><th onclick=sortRows("city")>CITY</th><th onclick=sortRows("country")>COUNTRY</th></tr>';
res = index.formatTableHead();
console.log('*', res === expectedResult);


// Test formatTableBody function
console.log('3: Test formatTableBody function');
const inputArray = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Smith',
    email: 'johnsmith200@gmail.com',
    gender: 'male',
    date: '12/13/2018',
    address: '1 Test Lane',
    city: 'Sigetec',
    country: 'Croatia',
    country_code: 'HR',
  },
  {
    id: 2,
    first_name: 'John',
    last_name: 'Smith',
    email: 'johnsmith100@gmail.com',
    gender: 'male',
    date: '11/7/2018',
    address: '1 Test Street',
    city: 'Sigetec',
    country: 'Croatia',
    country_code: 'HR',
  }];
console.log('* When two users are inputted expect two formatted rows to be returned');
expectedResult = '<tr><td class="id"><span onclick=sortRows("id")>NUMBER</span>1</td><td class="date"><span onclick=sortRows("date")>DATE</span>12/13/2018</td><td class="fullName"><span onclick=sortRows("fullName")>FULL NAME</span>John Smith</td><td class="email"><span onclick=sortRows("email")>EMAIL</span>johnsmith200@gmail.com</td><td class="city"><span onclick=sortRows("city")>CITY</span>Sigetec</td><td class="country"><span onclick=sortRows("country")>COUNTRY</span>Croatia</td></tr><tr><td class="id"><span onclick=sortRows("id")>NUMBER</span>2</td><td class="date"><span onclick=sortRows("date")>DATE</span>11/7/2018</td><td class="fullName"><span onclick=sortRows("fullName")>FULL NAME</span>John Smith</td><td class="email"><span onclick=sortRows("email")>EMAIL</span>johnsmith100@gmail.com</td><td class="city"><span onclick=sortRows("city")>CITY</span>Sigetec</td><td class="country"><span onclick=sortRows("country")>COUNTRY</span>Croatia</td></tr>';
res = index.formatTableBody(inputArray);
console.log('*', res === expectedResult);


// Test getData function
console.log('4: Test getData function');
(async () => {
  // Happy path
  console.log('* Expect user details to be returned when fetch returns JSON object successfully');
  global.fetch = () => Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        id: 1,
        first_name: 'John',
        last_name: 'Smith',
        email: 'johnsmith200@gmail.com',
        gender: 'male',
        date: '12/13/2018',
        address: '1 Test Lane',
        city: 'Sigetec',
        country: 'Croatia',
        country_code: 'HR',
      }],
    ),
  });
  res = await index.getData();

  console.log('*', res[0].id === 1);
  // Unhappy path
  console.log('* Expect API error to be logged and no result when fetch response is not Ok ');
  global.fetch = () => Promise.resolve({ ok: false, statusText: 'Resource not Found' });
  res = await index.getData();
  console.log('*', res === undefined);
})();
