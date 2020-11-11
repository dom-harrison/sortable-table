console.log('Hi VRBO!');

// Table rows array
let tableJSON;
// Previous ascending column flag
let previousAscCol;


// Call API at provided URL
const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText); 
    }
    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log('API error:', error);
  }
};


// Map of field names and headers
const fieldMap = [
  { name: 'id', header: 'NUMBER' },
  { name: 'date', header: 'DATE' },
  { name: 'fullName', header: 'FULL NAME' },
  { name: 'email', header: 'EMAIL' },
  { name: 'city', header: 'CITY' },
  { name: 'country', header: 'COUNTRY' },
];


// Format table head from given array
const formatTableHead = () => {
    let head = '<tr>';
    fieldMap.forEach((field) => {
      head += `<th onclick=sortRows("${field.name}")>${field.header}</th>`;
    });
    head += '</tr>';
  return head;
};


// Format table body from given array
const formatTableBody = (rowsArray = []) => {
  let tableRows = '';

  rowsArray.forEach((entry = {}) => {
    let row = '<tr>';
    fieldMap.forEach((field) => {
      row += `<td class="${field.name}"><span onclick=sortRows("${field.name}")>${field.header}</span>`;
      if (field.name === 'fullName') {
        row += `${entry.first_name} ${entry.last_name}</td>`;
      } else {
        row += `${entry[field.name]}</td>`;
      }
    });
    tableRows += `${row}</tr>`;
  });
  return tableRows;
};


// Comparison function for given field and sorting direction
const compareObjects = (key, asc) => (a, b) => {
  let A;
  let B;

  if (key === 'id') {
    A = a[key];
    B = b[key];
  } else if (key === 'date') {
    A = new Date(a.date).getTime();
    B = new Date(b.date).getTime();
  } else if (key === 'fullName') {
    A = (a.first_name + a.last_name).toUpperCase();
    B = (b.first_name + b.last_name).toUpperCase();
  } else {
    A = a[key].toUpperCase();
    B = b[key].toUpperCase();
  }

  let comparison = 0;
  if (A > B) {
    comparison = 1;
  } else if (A < B) {
    comparison = -1;
  }
  return asc ? comparison : comparison * -1;
};


// Sort rows of 'tableJSON' array and re-render the table body
const sortRows = (column) => {
  if (tableJSON) {
    const isAscending = previousAscCol !== column;
    tableJSON.sort(compareObjects(column, isAscending));

    document.getElementById('tableBody').innerHTML = formatTableBody(tableJSON);
    previousAscCol = isAscending ? column : undefined;
  }
};


// Call API and render initial table body
const main = async () => {
  const url = 'http://localhost:4000/api/users.json';
  tableJSON = await getData(url);

  if (tableJSON) {
    document.getElementById('tableHead').innerHTML = formatTableHead();
    document.getElementById('tableBody').innerHTML = formatTableBody(tableJSON);
  } else {
    document.getElementById('error').style.display = 'block';
  }
};


// Call main function on page load
window.addEventListener('load', main);


// Allows functions to be imported into the index.spec file for unit testing
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    compareObjects,
    formatTableHead,
    formatTableBody,
    getData,
  };
}
