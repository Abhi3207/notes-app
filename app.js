const yargs = require('yargs');
const fs = require('fs');
const list = require("./list.json");
var chalk = require('chalk');

//console.log(yargs.argv);

/* --------  ADDING A NEW NOTE  -------- */

yargs.command({
    command: 'add',
    describe: "Adding a Note",
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {

        var flag = "false";

        list.forEach((sec) => {
            if (sec.title.toLowerCase() == argv.title.toLowerCase()) {
                flag = true;
            }
        })
        if (flag === "false") {
            list.push({
                "title": argv.title,
                "body": argv.body
            });
            fs.writeFile("list.json", JSON.stringify(list), () => {
                console.log(chalk.bgRed(chalk.black("New Note added.")));
            })
        }
        else {
            console.log(chalk.bgGreen(chalk.black("title not found.")));
        }


    }

});



yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },

    handler: function (argv) {

        var flag = "false";

        list.forEach((sec) => {
            if (sec.title.toLowerCase() == argv.title.toLowerCase()) {
                flag = true;
            }
        })

        if (flag === true) {
            var rl = list.filter((sec) => {
                return sec.title.toLowerCase() != argv.title.toLowerCase();
            });
            fs.writeFile('list.json', JSON.stringify(rl), () => {
                console.log(chalk.bgGreen(chalk.black('Note removed')));
            })
        }
        else {
            console.log(chalk.bgRed(chalk.black("This title doesn't exist")));
        }
    }
});



yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },

    handler: function (argv) {
        var flag = "false";


        list.forEach((sec, index) => {
            if (sec.title.toLowerCase() == argv.title.toLowerCase()) {
                console.log(chalk.bold.blue(sec.title + '   ') + chalk.bold.magenta(list[index].body));

                flag = "true";
            }

        });
        if (flag == 'false') {
            console.log(chalk.bgRed(chalk.black("This title doesn't exist")));

        }
    }
});



yargs.command({
    command: 'list',
    describe: 'Listing all notes',
    handler(argv) {
        if (list.length != 0) {

            list.forEach((sec) => {
                console.log(chalk.bold.blue(sec.title));
            });
        }
        else {
            console.log(chalk.bgRed(chalk.black('nothing to display.')));
        }
    }
});

yargs.parse();
