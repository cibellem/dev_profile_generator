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

        axios.get(queryUrlStarred)
            .then(function (res) {

                //here I use the map array method to loop through the object array and to retur me the elements in the stargazers_count 
                const starCount = res.data.map(element => {
                    return element.stargazers_count


                })
                const stars = starCount.length


                const params = {
                    color: color,
                    username: username,
                    avatar_url: data.avatar_url,
                    name: data.name,
                    location: data.location,
                    bio: data.bio,
                    public_repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                    github: data.login,
                    stars: stars,// why is coming back as undefined? 
                }

                pdf.create(generateHtml(params)).toFile('./devportfolio.pdf', function (err, res) {
                    if (err) return console.log(err);
                    console.log(res);

                })


            })


    })
})