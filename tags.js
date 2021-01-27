var ingredientsTags = new Array;
ingredientsTags.element = $("#tagSelect_ingredients");
ingredientsTags.btnOpen = $("#btnOpen_ingredients");
ingredientsTags.btnClose = $("#btnClose_ingredients");
ingredientsTags.searchBar = $("#searchBar_ingredients");
ingredientsTags.dropdown = $("#dropdown_ingredients");
ingredientsTags.tagList = $("#tagList_ingredients");

var devicesTags = new Array;
devicesTags.element = $("#tagSelect_devices");
devicesTags.btnOpen = $("#btnOpen_devices");
devicesTags.btnClose = $("#btnClose_devices");
devicesTags.searchBar = $("#searchBar_devices");
devicesTags.dropdown = $("#dropdown_devices");
devicesTags.tagList = $("#tagList_devices");

var ustensilsTags = new Array;
ustensilsTags.element = $("#tagSelect_ustensils");
ustensilsTags.btnOpen = $("#btnOpen_ustensils");
ustensilsTags.btnClose = $("#btnClose_ustensils");
ustensilsTags.searchBar = $("#searchBar_ustensils");
ustensilsTags.dropdown = $("#dropdown_ustensils");
ustensilsTags.tagList = $("#tagList_ustensils");

// Page initialisation
function initTags(object){
    object["searchBar"].hide();
    object["btnClose"].hide();
    object["dropdown"].hide();
}
initTags(ingredientsTags);
initTags(devicesTags);
initTags(ustensilsTags);


// Opening and closing of tags search
function tags_toggleOn(object){
    object["element"].removeClass('col-2');
    object["element"].removeClass('heightControl');
    object["element"].addClass('col-6');

    object["btnOpen"].hide();
    object["searchBar"].show();
    object["btnClose"].show();
    object["dropdown"].show();
    object["searchBar"].focus();
}

function tags_toggleOff(object){
    object["element"].removeClass('col-6');
    object["element"].addClass('col-2');
    object["element"].addClass('heightControl');

    object["btnOpen"].show();
    object["searchBar"].hide();
    object["btnClose"].hide();
    object["dropdown"].hide();
}

ingredientsTags["btnOpen"].on('click', function(event) {
    tags_toggleOn(ingredientsTags);
    tags_toggleOff(ustensilsTags);
    tags_toggleOff(devicesTags);
});

ingredientsTags["btnClose"].on('click', function(event) {
    tags_toggleOff(ingredientsTags);
});

devicesTags["btnOpen"].on('click', function(event) {
    tags_toggleOn(devicesTags);
    tags_toggleOff(ingredientsTags);
    tags_toggleOff(ustensilsTags);
});

devicesTags["btnClose"].on('click', function(event) {
    tags_toggleOff(devicesTags);
});

ustensilsTags["btnOpen"].on('click', function(event) {
    tags_toggleOn(ustensilsTags);
    tags_toggleOff(ingredientsTags);
    tags_toggleOff(devicesTags);
});

ustensilsTags["btnClose"].on('click', function(event) {
    tags_toggleOff(ustensilsTags);
});


function generateTag(newTag){
    var tag = $("<li> </li>");
    tag.addClass("list-inline-item");
    tag.addClass("w-25");
    tag.addClass("mb-2");
    //tag.attr('id', 'test');

    var link = $("<a>" + newTag + "</a>");
    link.addClass("tagList_tag");

    tag.append(link);

    return tag;
}

function generateTagList(element, list){
    for(var i=0; i<list.length;i++){
        element.append(generateTag(list[i]));
    }

    tagQuantityControl(element);
}

function tagQuantityControl(element){
    if(element.children().length > 30)
    {
        for(var i=30; i<element.children().length; i++)
        {
            element.children().eq(i).hide();
        }
    }
}

///////// HTML code for a tag in the dropbox
/*  <li class="list-inline-item w-25 mb-2"> 
        <a class="tagList_tag"> 
            Coconut milk 
        </a> 
    </li>
*/