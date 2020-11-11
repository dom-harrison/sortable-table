# Vrbo | Developer Coding Challenge

## Overview

This exercise will have the candidate build a sortable data table

Here are the guidelines for this exercise, please follow closely:

- No javascript frameworks or libraries unless you have written it yourself (e.g. jQuery, Angular, React)
- What we are looking at is your coding style and how well your overall solution works, it should be elegant as well as scalable
- Any notes/information you wish to share please include in a file called: NOTES.md
- Chrome compliance is all that's required, all functions and features available in current Chrome are in play
- Return the finished exercise files as a ZIP (YourName_VrboExercise.zip), alternatively create a private repository and share the URL via email

Feel free to get in touch with us at any time throughout this task to answer any questions you might have. We realise and appreciate that you're taking personal time out to complete this task so we are happy to help. Also, please don't spend too much time on this. We would rather see what you are capable of doing in a couple of hours than a whole day.

## Api

Api url: `http://localhost:4000/api/users.json`

## Getting Started

### Requirements

- <a href="https://docs.npmjs.com/getting-started/installing-node">Node.js and npm</a>

### Install the exercise

```
git clone ***
cd directory
npm i && npm start
```

### Project Structure

## Files and folders

- logo - `assets/logo.svg` to be included in your html
- `public/` place your finished file here

## Brief

- Demonstrate your approach to using an API `http://localhost:4000/api/users.json` to retrieve data and populate a table
- Create a html table (divs can be used) to represent the retrived data
- Column headings should be `Number, Date, Full Name, Email, City, Country`
- Write a script that will sort the rows by whichever header has been clicked
- Ensure that the table is responsive across 480, 678 and 1200 break points
- Feel free to style the page as you like but ensure the VRBO logo is used

## How it should work

- Clicking on a row header will sort the data accordingly
- Further clicking will reverse the sorting order

Nice to haves (things that we look for):

- Performance optimisations
- Tests
