'use strict';


const client = require('./client');

function handleLogin(request, response) {
    console.log(request.body.userName)

    global.username = request.body.userName
    let sql = "SELECT * FROM users WHERE user_name=$1;";
    let safeVals = [request.body.userName]

    client.query(sql, safeVals)
      .then(results => {
        let users = results.rows;
        if (users.length > 0) {
            console.log("Welcome Back!", users[0])
        } else {
            console.log("NEW USER INSERTED")
            //INSERT USERS INTO DATABASE
            let sql = "INSERT INTO users (user_name) VALUES ($1);";
            let safeValues = [request.body.userName];
            client.query(sql, safeValues);
            //INSERTS BASIC LIST ATTACHED TO USER
            let sql2 = "INSERT INTO cocktail_lists (list_name, summary, user_id) VALUES ($1, $2, $3)"
            let safeValues2 = ["Basic Cabinet", "The Basic List", request.body.userName]
            client.query(sql2, safeValues2);
        }
    })
    

    response.redirect('/home')
}

module.exports = handleLogin;