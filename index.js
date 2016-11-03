const inquirer = require('inquirer');
const clear = require('clear-screen');
const ascii = require('figlet');

let  questions = [
    {
        type: 'input',
        name: 'Name',
        message: 'Application name :',
        validate: input => !!input || "You must give your application a name.",
    },
    {
        type: 'input',
        name: 'Comment',
        message: 'Application Description [optionnal] :',
    },
    {
        type: 'input',
        name: 'Exec',
        message: 'Application\'s executable path (must be absolute) :',
        validate: input => !!input && input.charAt(0) === '/' || "You must provide a valid file path to execute.",
    },
    {
        type: 'input',
        name: 'Icon',
        message: 'Application\'s icon path (must be absolute) [optionnal] :',
        validate: input => !input || input.charAt(0) === '/' || "You must provide a valid icon path.",
    },
    {
        type: 'list',
        name: 'Terminal',
        message: 'Show terminal ?',
        choices: ['Yes', 'No'],
        default: 1,
        filter: answer => answer === 'Yes',
    }
];

// clear the terminal window
clear();

// output some ascii art
console.log(
    ascii.textSync('Z-desktop', { horizontalLayout: 'full' })
);

// ask for information
inquirer.prompt(questions).then(function (answers) {

    // make use of the information provided
    console.log(answers);
});