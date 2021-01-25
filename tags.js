const ingredientOpenButton = $("#btnOpen_ingredients");
const ingredientCloseButton = $("#btnClose_ingredients");
const ingredientSearch = $("#searchBar_ingredients");
ingredientSearch.hide();
ingredientCloseButton.hide();
const x = ingredientSearch.position().right;
const y = ingredientSearch.position().top;
ingredientCloseButton.css({left:x,top:y});

var test=$(tagSelect_ingredients);

ingredientOpenButton.on('click', function(event) {
    test.removeClass('col-2');
    test.addClass('col-6');

    ingredientOpenButton.toggle();
    ingredientSearch.toggle();
    ingredientCloseButton.toggle();
    ingredientSearch.focus();
});

$("#searchBar_ingredients").on('blur', function(event) {
    test.removeClass('col-6');
    test.addClass('col-2');
    ingredientSearch.toggle();
    ingredientCloseButton.toggle();
    ingredientOpenButton.toggle();
});