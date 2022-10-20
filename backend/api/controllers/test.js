/* eslint-disable max-len */
// create 10 years


function generateWeeks() {
    var weeks = [];

    for (var i = 1; i <= 52; i++) {
        let obj = {
            week: i,
            capacity_left: 40
        };

        weeks.push(obj);
    }
    return weeks;
}

function generateYears(weeks) {
    var min = new Date().getFullYear();
    var max = min + 10;
    var years = [];

    for (var i = min; i <= max; i++) {
        let obj = {
            year: i,
            weeks: weeks
        };

        years.push(obj);
    }
    return years;
}

let weeks = generateWeeks();
let years = generateYears(weeks);

console.log(years);
// console.log(weeks[44]);


// Object.entries(weeksArr).forEach(([key, val]) => {
//     console.log(key); // the name of the current key.
//     console.log(val); // the value of the current key.
//   });

// weeksArr.forEach(week => {
//     weekObj = {
//         week: week,
//         capacity_left: 40
//     };

//     weeks.push(weekObj);
// });

// yearsArr.forEach(year => {
//     console.log(year);
//     yearObj = {
//         year: year,
//         weeks: weeks
//     };

//     years.push(yearObj);
// });

// console.log(years[0].weeks[51].capacity_left);
// console.log(years);


// var randomColor = Math.floor(Math.random()*16777215).toString(16);

// console.log(weeks[44]);

// get all colors, if color already exists, generate new color





// exports.update_capacity_left = (req, res) => {
//     console.log("hello");
//     const id = req.params.userId;
//     const year = req.body.year;
//     const week = req.body.week;
//     const capacityLeft = req.body.capacity_left;

//     const updateOps = {
//         years: year
//     };

//     updateOps[year].weeks[week].capacity_left = capacityLeft;
//     // console.log(updateOps);
//     let update = `years[${year}].weeks[${week}].capacity_left`;

//     var updateUserArgs = {
//         update: 'Baz',
//         email: 'baz@bar.com',
//       };

//     User.findByIdAndUpdate(id, {"$set": {`years.${year}.weeks.${week}.capacity_left`: capacityLeft}}, function(err, doc) {
//         console.log(doc);
//     });
