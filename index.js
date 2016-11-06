#!/usr/bin/env node

"use strict";

// deps
const inquirer =        require('inquirer');
const clear =           require('clear-screen');
const ascii =           require('figlet');
const color =           require('chalk');
const write =           require('output-file');
const path =            require('path');
const upperCamelCase =  require('uppercamelcase');
const isValidPath =     require('is-valid-path');



// Utils
const HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

let  questions = [
    {
        type: 'input',
        name: 'Name',
        message: 'Application name' + color.yellow('*'),
        validate: input => !!input || "You must give a name to your application.",
    },
    {
        type: 'input',
        name: 'Comment',
        message: 'Application Description',
    },
    {
        type: 'input',
        name: 'Exec',
        message: 'Application\'s executable path (must be absolute)' + color.yellow('*'),
        validate: input =>  {
            if(!input) {
                return "You must provide a file path to execute."
            }
            else if(input.charAt(0) !== '/') {
                return "You must provide an absolute file path to execute."
            }
            else if(!isValidPath(input)) {
                return "You must provide a valid file path to execute."
            }
            else return true;
        },
    },
    {
        type: 'input',
        name: 'Icon',
        message: 'Application\'s icon path (must be absolute)',
        validate: input => {
            if(!input) {
                return true; // it is optional
            }
            else if(input.charAt(0) !== '/') {
                return "You must provide an absolute icon path."
            }
            else if(!isValidPath(input)) {
                return "You must provide a valid icon path."
            }
            else return true;
        },
    },
    {
        type: 'list',
        name: 'Terminal',
        message: 'Show terminal ?' + color.yellow('*'),
        choices: ['Yes', 'No'],
        default: 1,
        filter: answer => answer === 'Yes',
    }
];

// clear the terminal window
clear();

// output some ascii art
console.log(
    color.cyan(
        ascii.textSync('Z-desktop', { horizontalLayout: 'full' })
    )
);

if(process.platform !== "linux") {
    console.log(
        color.bold.red('You must be on a linux platform to use this tool!')
    )
    process.exit(1)
}


// ask for information
inquirer.prompt(questions).then(function (answers) {

    // make use of the information provided
    // console.log(answers);

    /** 
     * Template
     * 
     * [Desktop Entry]
     * Type=Application
     * Encoding=UTF-8
     * Name=Sample Application Name
     * Comment=A sample application
     * Exec=application
     * Icon=application.png
     * Terminal=false
     */

    // minimal data
    let data = [
        "[Desktop Entry]",
        "Type=Application",
        "Encoding=UTF-8",
        "Name=" + answers.Name,
        "Exec=" + answers.Exec,
        "Terminal="+answers.Terminal,
    ];

    // optional data
    if(!!answers.Comment) data.push("Comment="+answers.Comment)
    if(!!answers.Icon) data.push("Icon="+answers.Icon)

    const toWrite = data.join('\n');
    const target =  path.join(HOME, ".local/share/applications", upperCamelCase(answers.Name) + ".desktop");

    write(target, toWrite, {fileMode: '0774'}, function (err, dir) {
        if(!err) {
            console.log( "\n"
                + color.green('The file has been created with success \n -> ') 
                + color.bold.green(target + '\n') 
                + "Its content is : \n\n"
                + color.bold(toWrite)
            );
        }
        else {
            console.log( color.bold.red('An error occured : \n') + err );
        }
    });

});