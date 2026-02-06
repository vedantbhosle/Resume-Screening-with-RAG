
const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('/Users/vedantprashantbhosale/Desktop/Resume_screnning/Assessment_1.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error){
    console.error("Error reading PDF:", error);
});
