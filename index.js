
const inquirer = require('inquirer');

const fs = require('fs');
const { default: Choices } = require('inquirer/lib/objects/choices');


function init() {
    // show a welcomE message
    console.log(`
        -------------------------------
        Welcome to the README Generator
        -------------------------------
        `);
}

init();

inquirer.prompt([
    {
        type: 'input',
        message: 'Enter README file title: ',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Provide a short description explaining the what, why, and how of your project: ',
        name: 'description'
    },
    {
        type: 'input',
        message: 'What are the steps required to install your project? Provide a step- by - step description of how to get the development environment running: ',
        name: 'installation'
    },
    {
        name: 'license',
        type: 'list',
        message: 'Choose a license: ',
        choices: [
            'MIT', 'GPL-2.0', 'Apache-2.0', 'AFL-3.0'
        ]
    },
    {
        type: 'input',
        message: 'Enter the file path or URL of the screenshot:',
        name: 'screenshot'
    },
    {
        type: 'input',
        message: 'Did anyone else help with this project? if so enter their name here.  if not just hit enter.',
        name: 'credits'
    },
    {
        type: 'input',
        message: 'Enter their github profile link here: ',
        name: 'collabLinks'
    },
    {
        type: 'input',
        message: 'Provide your GitHub username: ',
        name: 'github'
    },
    {
        type: 'input',
        message: 'Provide your email: ',
        name: 'email'
    },


]).then((answers) => {

    fs.writeFile('./README.md', createReadme(answers), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('README file successfully created!');
        }
    });
});
'', '', ''

function badgeGenerator(license) {
    switch (license) {
        case 'MIT':
            return 'MIT';
        case 'GPL-2.0':
            return 'GNU';
        case 'Apache-2.0':
            return 'Apache';
        case 'AFL-3.0':
            return 'AFL';
    }
}

function createReadme(data) {
    return `# ${data.title}

## Description \n
${data.description}

## Table of Contents:
${data.installation ? '- [Installation](#installation)' : ''}
${data.screenshot ? '- [Usage](#usage)' : ''}
${data.credits ? '- [Credits](#credits)' : ''}
${data.license ? '- [License](#license)' : ''}

## Installation
${data.installation}

## Usage

![Screenshot](${data.screenshot})

## Credits

${data.credits} \n
${data.collabLinks}

## License

${data.license} \n
https://opensource.org/license/${data.license}

## Badges

![License: ${data.license}](https://img.shields.io/badge/License-${badgeGenerator(data.license)}-yellow.svg)

## How to Contribute

Reporting Issues:

Before submitting a new issue, please search existing issues to avoid duplicates.
Clearly describe the issue, including steps to reproduce if it's a bug.

Feature Requests:

Feel free to suggest new features or improvements.
Provide detailed descriptions and use cases for better understanding.

Communication:

Engage respectfully with other contributors and maintainers.
Use our communication channels for project-related discussions.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here.

## Questions
GitHub username: ${data.github} \n
https://github.com/${data.github}

For any further questions, contact me at: \n
email: ${data.email}

`;

}
