const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
var pdf = require('html-pdf');
const open = require('open');
const generateHtml = require("./generateHTML");

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your GitHub Username?",
    },
    {
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: ["green", "blue", "pink", "red"]
    }
]).then(function ({ username, color }) {


    const queryUrl = `https://api.github.com/users/${username}`;
    const queryUrlStarred = `https://api.github.com/users/${username}/starred`


    axios.get(queryUrl).then(function ({ data }) {

        const params = {
            color: color,
            username: username,
            avatar_url: data.avatar_url,
            name: data.name,
            location: data.location,
            bio: data.bio,
            publicrepo: data.public_repos,
            followers: data.followers,
            following: data.following,
            github: data.login
        }

        pdf.create(generateHtml(params)).toFile('./devportfolio.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res);

        })


    })


})
