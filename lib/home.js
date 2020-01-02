'use strict';

function renderHome(request, response) {
  response.render('home', { user: global.username });
}

module.exports = renderHome;