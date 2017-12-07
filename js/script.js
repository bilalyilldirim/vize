$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});

(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";
var allCategoriesUrl = "json/categories.json";
  
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";

		
  
var menuItemsTitleHtml = "snippets/menu-items-title.html";

var personalUrl="json/ogretim_gorevli.json";
var personalHtml="snippets/personal-snippet.html";
var personalCategoryUrl ="json/personalCategories.json";
var personalCategoryHtml ="snippets/categorypersonal-snippet.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};
dc.loadMenupersonalCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    personalCategoryUrl,
    buildAndShowpersonalCategoriesHTML);
};
dc.loadpersonal = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    personalUrl,
    buildAndShowPersonalHTML);
};


// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});


// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});

// Load the menu categories view
dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};


// Load the menu items view
// 'categoryShort' is a short_name for a category

// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive();

          var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTitleHtml,
                                    categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}
function buildAndShowpersonalCategoriesHTML (percategories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        personalCategoryHtml,
        function (personalCategoryHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive();

          var categoriesViewHtml =
            buildpersonalCategoriesViewHtml(percategories,
                                    categoriesTitleHtml,
                                    personalCategoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}
function buildpersonalCategoriesViewHtml(percategories,
                                 categoriesTitleHtml,
                                 personalCategoryHtml) {

  var finalHtml = "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < percategories.length; i++) {
    // Insert category values
    var html = personalCategoryHtml;
    var name = "" + percategories[i].name;
    var short_name = percategories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}
function buildAndShowPersonalHTML (kisiler) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        personalHtml,
        function (personalHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive();

          var categoriesViewHtml =
            buildPersonalViewHtml(kisiler,
                                    categoriesTitleHtml,
                                    personalHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}
function buildPersonalViewHtml(kisiler,
                                menuItemsTitleHtml,
                                personalHtml) {

  var finalHtml = "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < kisiler.length; i++) {
    // Insert category values
    var html = personalHtml;
    var name = "" + kisiler[i].name;
    var short_name = kisiler[i].short_name;
	var pozisyon =kisiler[i].pozisyon;
	var posta =kisiler[i].posta;
   	var special_instructions =kisiler[i].special_instructions;

	html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    html =
      insertProperty(html,
                      "pozisyon",
                      pozisyon);
	html =
      insertProperty(html,
                     "posta",
                     posta);
    html =
      insertProperty(html,
                     "special_instructions",
                     special_instructions);

    // Add clearfix after every second menu item
    if (i % 2 != 0) {
      html +=
        "<div class='clearfix visible-lg-block visible-md-block'></div>";
    }
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}


// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}



global.$dc = dc;

})(window);
