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

var activeTagList = $("#activeTags_list");
var index_activeTagList_devices;
var index_activeTagList_ustensils;

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


// Dropbox tagList elements generation
function generateTag(newTag){
    var tag = $("<li> </li>");
    tag.addClass("list-inline-item");
    tag.addClass("w-25");
    tag.addClass("mb-2");

    var link = $("<a>" + newTag + "</a>");
    link.addClass("tagList_tag");

    tag.append(link);

    return tag;
}

function generateTagList(element, list){
    for(var i=0; i<list.length;i++){
        element.append(generateTag(list[i].name));
        element.children().eq(i).on('click', function(event){
        });
    }
    dropBoxUpdate(element, list);
}

// DropBox listed tags update based on 'active' 'show' and 'relevant' status of the tagLists
function dropBoxUpdate(element, tagList){
    let nbTag = 0;

    for(let i=0; i<tagList.length; i++){
        element.children().eq(i).hide();
        if(nbTag < 30){
            if(!tagList[i].active && tagList[i].show && tagList[i].relevant){
                element.children().eq(i).show();
                nbTag++;
            }
        }
    }
}

// Active tagList elements generation
function generateActiveTagsList(activeTagsListElement, tagList, type){
    for(let i=0; i<tagList.length; i++){
        activeTagsListElement.append(generateActiveTag(type, tagList[i].name));
    }
}

function generateActiveTag(type, name){
    //let capsName = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    var activeTag = $("<li>" + name + "<i class=\"ml-2 far fa-times-circle\"></i> </li>");
    activeTag.addClass("list-inline-item");
    activeTag.addClass("mb-1");
    activeTag.addClass("btn");
    
    if(type=="ingredient")
    {
        activeTag.addClass("btn-primary");
    }
    else if(type=="device"){
        activeTag.addClass("btn-success");
        activeTag.addClass("text-white");
    }
    else if(type=="ustensil"){
        activeTag.addClass("btn-danger");
    }
    else{
        console.log("Error: activeTag generation -> unknow type");
        return 0;
    }
    
    activeTag.hide();
    return activeTag;
}

// Events on dropBox/active tagList elements to toggle tags and 'active' parameter in tagList
function addEvent_onClick_dropboxTags(dropboxElement, tagList, activeTagsElement, tagsType, gallery, keywordStruct, ingredientTagList, deviceTagList, ustensilTagList, ingredientDropBox, deviceDropbox, ustensilDropbox)
{
    for(let i=0; i<dropboxElement.children().length; i++){
        dropboxElement.children().eq(i).on('click', function(){
            dropboxElement.children().eq(i).hide();
            tagList[i].active = true;
            tag_relevanceUpdate(keywordStruct, ingredientTagList, deviceTagList, ustensilTagList);
            dropBoxUpdate(ingredientDropBox, ingredientTagList);
            dropBoxUpdate(deviceDropbox, deviceTagList);
            dropBoxUpdate(ustensilDropbox, ustensilTagList);
            
            var typeElement;
            switch(tagsType) {
                case "ingredients":
                    typeElement = activeTagsElement.children().eq(i);
                  break;

                case "devices":
                    typeElement = activeTagsElement.children().eq(i + index_activeTagList_devices);
                  break;

                case "ustensils":
                    typeElement = activeTagsElement.children().eq(i + index_activeTagList_ustensils);
                break;
                
                default:
                    console.log("Error: addEvent_onClick_dropboxTags -> unknwown type");
                    return 0;
            }

            typeElement.show();

            const newOffset = 335 + activeTagsElement.height();
            gallery.css("top", newOffset + "px");
        });
    }
}

function addEvent_onClick_activeTags(dropboxElement, tagList, activeTagsElement, tagsType, gallery, keywordStruct, ingredientTagList, deviceTagList, ustensilTagList, ingredientDropBox, deviceDropbox, ustensilDropbox)
{
    var activeTagList_indexOffset;
    switch(tagsType) {
        case "ingredients":
            activeTagList_indexOffset = 0;
            break;

        case "devices":
            activeTagList_indexOffset = index_activeTagList_devices;
            break;

        case "ustensils":
            activeTagList_indexOffset = index_activeTagList_ustensils;
            break;
        
        default:
          console.log("Error: addEvent_onClick_dropboxTags -> unknwown type");
          return 0;
    }

    for(let i=activeTagList_indexOffset; i<activeTagList_indexOffset + dropboxElement.children().length; i++){
        activeTagsElement.children().eq(i).on('click', function(){
            activeTagsElement.children().eq(i).hide();
            tagList[i-activeTagList_indexOffset].active = false;
            tag_relevanceUpdate(keywordStruct, ingredientTagList, deviceTagList, ustensilTagList);
            dropBoxUpdate(ingredientDropBox, ingredientTagList);
            dropBoxUpdate(deviceDropbox, deviceTagList);
            dropBoxUpdate(ustensilDropbox, ustensilTagList);

            dropboxElement.children().eq(i-activeTagList_indexOffset).show();
        
            const newOffset = 335 + activeTagsElement.height();
            gallery.css("top", newOffset + "px");
        });
    }
}

function initSearchTagElement_event(element, tagList){
    element.searchBar.on('keyup', function(e){
        const searchTag = e.target.value.toLowerCase();
        for(let i=0; i<tagList.length;i++){
            if((tagList[i].name.toLowerCase()).includes(searchTag)){
                tagList[i].show = true;
            }
            else{
                tagList[i].show = false;
            }
        }

        dropBoxUpdate(element.tagList, tagList);
    });
}



///////// HTML code for a tag in the dropbox
/*  
    <li class="list-inline-item w-25 mb-2"> 
        <a class="tagList_tag"> 
            Coconut milk 
        </a> 
    </li>
*/

///////// HTML code for a tag in the dropbox
/*  
    <li class="list-inline-item mb-1"> 
        <button type="button" class="btn btn-primary"> 
            Coco 
            <i class="ml-1 far fa-times-circle"></i>
        </button> 
    </li>
    /!\ btn-success text-white
    /!\ btn-danger
*/