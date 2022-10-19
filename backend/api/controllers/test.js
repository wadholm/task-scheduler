// create 10 years
function generateArrayOfYears() {
    var min = new Date().getFullYear();
    var max = min + 10;
    var years = [];

    for (var i = min; i <= max; i++) {
        years.push(i);
    }
    return years;
}

function generateArrayOfWeeks() {
    var weeks = [];

    for (var i = 1; i <= 52; i++) {
        weeks.push(i);
    }
    return weeks;
}

let yearsArr = generateArrayOfYears();
let weeksArr = generateArrayOfWeeks();
let years = [];
let weeks = [];
let yearObj;
let weekObj;

weeksArr.forEach(week => {
    weekObj = {
        week: week,
        capacity_left: 40
    };

    weeks.push(weekObj);
});

yearsArr.forEach(year => {
    console.log(year);
    yearObj = {
        year: year,
        weeks: weeks
    };

    years.push(yearObj);
});

// console.log(years[0].weeks[51].capacity_left);
// console.log(years);

var randomColor = Math.floor(Math.random()*16777215).toString(16);

console.log(randomColor);

// get all colors, if color already exists, generate new color


