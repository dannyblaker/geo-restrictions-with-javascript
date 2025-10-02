import { getCountry } from './country_timezones.js'; 

// wait for jquery to load
async function waitingForJquery(window) {
  while (!window["jQuery"]) {
    console.log("Waiting for Jquery")
  }
  return "Jquery loaded";
}

//get country & set cookie
async function existing_cookie(name) {
  var match = document.cookie.match(RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  return match ? match[1] : null;
}

async function set_cookie(timezone) {
  document.cookie = `my_country=${timezone}; max-age=604800`;
  return "cookie set!";
}

async function geo_restrictions(my_country) {

  // init vars
  var australia_class_name = "aus_region";
  var international_class_name = "int_region";
  var geo_restricted_menu_class_name = "menu-item-4258";

  var aus_elems = document.getElementsByClassName(australia_class_name);
  var int_elems = document.getElementsByClassName(international_class_name);
  var geo_restricted_menu = document.getElementsByClassName(geo_restricted_menu_class_name);


  if (my_country === "Australia") {
    console.log("applying Australian geo settings");

    // show geo restricted menu
    for (var i = 0; i < geo_restricted_menu.length; i++) {
      geo_restricted_menu[i].style.visibility = "visible";
    }

    // remove all elements that have "int_region" class
    for (var i = 0; i < int_elems.length; i++) {
      int_elems[i].remove();
    }

  } else {
    // country is not Australia
    console.log("applying international geo settings");

    // remove geo restricted menu
    for (var i = 0; i < geo_restricted_menu.length; i++) {
      geo_restricted_menu[i].remove();
    }

    // remove all elements that have "aus_region" class
    for (var i = 0; i < aus_elems.length; i++) {
      aus_elems[i].remove();
    }
  }
  return "geo restrictions applied";
}

(async function main() {
  let ready = await waitingForJquery(window);
  console.log(ready);

  let cookie_exists = await existing_cookie('my_country');

  if (cookie_exists) {
    console.log("EXISTING COOKIE: ", cookie_exists);
    let done = await geo_restrictions(cookie_exists);
    console.log("STATUS:", done);
  } else {
    let timezone = await getCountry();
    console.log(timezone);
    let setting_cookie = await set_cookie(timezone);
    console.log(setting_cookie);
    let done = await geo_restrictions(timezone);
    console.log("STATUS:", done);
  }
})();