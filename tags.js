var ingredientsTags = new Array();
ingredientsTags.element = $("#tagSelect_ingredients");
ingredientsTags.btnOpen = $("#btnOpen_ingredients");
ingredientsTags.btnClose = $("#btnClose_ingredients");
ingredientsTags.searchBar = $("#searchBar_ingredients");
ingredientsTags.dropdown = $("#dropdown_ingredients");
ingredientsTags.tagList = $("#tagList_ingredients");

var devicesTags = new Array();
devicesTags.element = $("#tagSelect_devices");
devicesTags.btnOpen = $("#btnOpen_devices");
devicesTags.btnClose = $("#btnClose_devices");
devicesTags.searchBar = $("#searchBar_devices");
devicesTags.dropdown = $("#dropdown_devices");
devicesTags.tagList = $("#tagList_devices");

var ustensilsTags = new Array();
ustensilsTags.element = $("#tagSelect_ustensils");
ustensilsTags.btnOpen = $("#btnOpen_ustensils");
ustensilsTags.btnClose = $("#btnClose_ustensils");
ustensilsTags.searchBar = $("#searchBar_ustensils");
ustensilsTags.dropdown = $("#dropdown_ustensils");
ustensilsTags.tagList = $("#tagList_ustensils");

var elementDropBox_TagList = new Array();
elementDropBox_TagList.ingredients = ingredientsTags.tagList;
elementDropBox_TagList.devices = devicesTags.tagList;
elementDropBox_TagList.ustensils = ustensilsTags.tagList;

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



function generateDropBox_tagLists(listof_dropBox_tagList, listof_tagList){
    generateTagList(listof_dropBox_tagList.ingredients, listof_tagList[0].tags);
    generateTagList(listof_dropBox_tagList.devices, listof_tagList[1].tags);
    generateTagList(listof_dropBox_tagList.ustensils, listof_tagList[2].tags);
    
    dropBoxUpdate_global(listof_dropBox_tagList, listof_tagList);
}

function generateTagList(element, list){
    for(var i=0; i<list.length;i++){
        element.append(generateTag(list[i].name));
        element.children().eq(i).on('click', function(event){
        });
    }
}

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

// DropBox listed tags update based on 'active' 'show' and 'relevant' status of the tagLists
function dropBoxUpdate_global(listof_dropBox_tagList, listof_tagList){
    dropBoxUpdate(listof_dropBox_tagList.ingredients, listof_tagList[0].tags);
    dropBoxUpdate(listof_dropBox_tagList.devices, listof_tagList[1].tags);
    dropBoxUpdate(listof_dropBox_tagList.ustensils, listof_tagList[2].tags);
}

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
function generateActiveTags_tagLists(activeTagsListElement, listof_tagList){
    generateActiveTagsList(activeTagsListElement, listof_tagList[0]);
    generateActiveTagsList(activeTagsListElement, listof_tagList[1]);
    generateActiveTagsList(activeTagsListElement, listof_tagList[2]);
}

function generateActiveTagsList(activeTagsListElement, tagList){
    for(let i=0; i<tagList.tags.length; i++){
        activeTagsListElement.append(generateActiveTag(tagList.type, tagList.tags[i].name));
    }
}

function generateActiveTag(type, name){
    //let capsName = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    var activeTag = $("<li>" + name + "<i class=\"ml-2 far fa-times-circle\"></i> </li>");
    activeTag.addClass("list-inline-item");
    activeTag.addClass("mb-1");
    activeTag.addClass("btn");
    
    if(type=="ingredients")
    {
        activeTag.addClass("btn-primary");
    }
    else if(type=="devices"){
        activeTag.addClass("btn-success");
        activeTag.addClass("text-white");
    }
    else if(type=="ustensils"){
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
function addEvent_onClick(listof_dropBox_tagList, listof_tagList, activeTag_tagList, gallery, keywordStruct)
{
    for(let i=0; i<listof_tagList.length; i++){
        addEvent_onClick_dropboxTags(listof_dropBox_tagList, listof_tagList, activeTag_tagList, gallery, keywordStruct, i);
        addEvent_onClick_activeTags(listof_dropBox_tagList, listof_tagList, activeTag_tagList, gallery, keywordStruct, i);
    }
}

function addEvent_onClick_dropboxTags(listof_dropBox_tagList, listof_tagList, activeTag_tagList, gallery, keywordStruct, index)
{
    let activeTagList_offset;
    let dropboxElement;
    switch(listof_tagList[index].type) {
        case "ingredients":
            dropboxElement = listof_dropBox_tagList.ingredients;
            activeTagList_offset = 0;
          break;

        case "devices":
            dropboxElement = listof_dropBox_tagList.devices;
            activeTagList_offset = listof_tagList[0].tags.length;
          break;

        case "ustensils":
            dropboxElement = listof_dropBox_tagList.ustensils;
            activeTagList_offset = listof_tagList[0].tags.length + listof_tagList[1].tags.length;
        break;
        
        default:
            console.log("Error: can't find dropBox");
            return 0;
    }

    for(let i=0; i<listof_tagList[index].tags.length; i++){
        dropboxElement.children().eq(i).on('click', function(){
            dropboxElement.children().eq(i).hide();
            listof_tagList[index].tags[i].active = true;

            // tag_relevanceUpdate(keywordStruct, ingredientTagList, deviceTagList, ustensilTagList);
            dropBoxUpdate_global(listof_dropBox_tagList, listof_tagList);
            
            var activatedTag;
            activatedTag = activeTag_tagList.children().eq(i + activeTagList_offset);
            activatedTag.show();

            const newOffset = 335 + activeTag_tagList.height();
            gallery.css("top", newOffset + "px");

            tag_relevanceUpdate(keywordStruct, listof_tagList);
            recipe_RelevanceUpdate(keywordStruct);
            recipeGalleryUpdate(gallery, keywordStruct);
            tagList_relevanceUpdate(keywordStruct, listof_tagList);
            dropBoxUpdate_global(listof_dropBox_tagList, listof_tagList);
        });
    }
}

function addEvent_onClick_activeTags(listof_dropBox_tagList, listof_tagList, activeTag_tagList, gallery, keywordStruct, index)
{
    let activeTagList_offset;
    let dropboxElement;
    switch(listof_tagList[index].type) {
        case "ingredients":
            dropboxElement = listof_dropBox_tagList.ingredients;
            activeTagList_offset = 0;
          break;

        case "devices":
            dropboxElement = listof_dropBox_tagList.devices;
            activeTagList_offset = listof_tagList[0].tags.length;
          break;

        case "ustensils":
            dropboxElement = listof_dropBox_tagList.ustensils;
            activeTagList_offset = listof_tagList[0].tags.length + listof_tagList[1].tags.length;
        break;
        
        default:
            console.log("Error: can't find dropBox");
            return 0;
    }

    for(let i=activeTagList_offset; i<activeTagList_offset + dropboxElement.children().length; i++){
        activeTag_tagList.children().eq(i).on('click', function(){
            activeTag_tagList.children().eq(i).hide();
            listof_tagList[index].tags[i-activeTagList_offset].active = false;
            
            //tag_relevanceUpdate(keywordStruct, ingredientTagList, deviceTagList, ustensilTagList);
            dropBoxUpdate_global(listof_dropBox_tagList, listof_tagList);

            dropboxElement.children().eq(i-activeTagList_offset).show();
        
            const newOffset = 335 + activeTag_tagList.height();
            gallery.css("top", newOffset + "px");

            tag_relevanceUpdate(keywordStruct, listof_tagList);
            recipe_RelevanceUpdate(keywordStruct);
            recipeGalleryUpdate(gallery, keywordStruct);
            tagList_relevanceUpdate(keywordStruct, listof_tagList);
            dropBoxUpdate_global(listof_dropBox_tagList, listof_tagList);
        });
    }
}


// Dropbox search bar
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