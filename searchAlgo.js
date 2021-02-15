const globalSearchBar = $("#global_searchInput");
const noMatchMessage = $("#noMatchMessage");


function initGlobalSearchBar(gallery, searchBarElement, keywordStruct, listof_dropBox_tagList, listof_tagList){
    searchBarElement.on('keyup', function(e){
        const searchWord = e.target.value.toLowerCase();
        noMatchMessage.hide();
        
        if(searchWord.length >= 3){
            searchEngine(keywordStruct, searchWord);
        }
        else{
            cleanSearchRelevance(keywordStruct);
        }

        tag_relevanceUpdate(keywordStruct, listof_tagList);
        recipe_RelevanceUpdate(keywordStruct);
        recipeGalleryUpdate(gallery, keywordStruct);
        tagList_relevanceUpdate(keywordStruct, listof_tagList);
        dropBoxUpdate_global(listof_dropBox_tagList, listof_tagList);
    });
}



function searchEngine(keywordStruct, searchWord){
    var noMatch = true;
    for(let i=0; i<keywordStruct.length;i++){
        if(searchAlgorithm(keywordStruct[i].keywordList, searchWord)){
            keywordStruct[i].searchRelevant = true;
            noMatch = false;
        }
        else{
            keywordStruct[i].searchRelevant = false;
        }
    }

    if(noMatch){
        noMatchMessage.show();
    }
}

// When searched word is shorter than 3 characters, all recipes are relevant
function cleanSearchRelevance(keywordStruct){
    for(let i=0; i<keywordStruct.length;i++){
            keywordStruct[i].searchRelevant = true;
    }
}

// tagRelevant && searchRelevant = relevant
function recipe_RelevanceUpdate(keywordStruct){
    for(let i=0; i<keywordStruct.length;i++){
        if(keywordStruct[i].tagRelevant && keywordStruct[i].searchRelevant){
            keywordStruct[i].relevant = true;
        }
        else{
            keywordStruct[i].relevant = false;
        }
    }
}

// Update the recipe showed in the gallery based on their relevance
function recipeGalleryUpdate(gallery, keywordStruct){
    for(let i=0; i<keywordStruct.length;i++){
        if(keywordStruct[i].relevant){
            gallery.children().eq(i).show();
        }
        else{
            gallery.children().eq(i).hide();
        }
    }
}

// Update the relevance for the Tags in the dropbox
function tagList_relevanceUpdate(keywordStruct, listof_tagList){
    cleanTagListRelevance(listof_tagList);
    
    for(let i=0; i<keywordStruct.length;i++){
        if(keywordStruct[i].relevant)
        {
            for(let j=0; j<keywordStruct[i].ingredientTags.length; j++){
                let index = tagList_indexOfByName(listof_tagList[0].tags, keywordStruct[i].ingredientTags[j]);
                listof_tagList[0].tags[index].relevant = true;
            }
            for(let j=0; j<keywordStruct[i].ustensilTags.length; j++){
                let index = tagList_indexOfByName(listof_tagList[2].tags, keywordStruct[i].ustensilTags[j]);
                listof_tagList[2].tags[index].relevant = true;
            }
            let index = tagList_indexOfByName(listof_tagList[1].tags, keywordStruct[i].deviceTags)
            listof_tagList[1].tags[index].relevant = true;
        }
    }
}

// Update the relevance of the recipes based on the ActiveTags
function tag_relevanceUpdate(keywordStruct, listof_tagList){
    for(let i=0; i<keywordStruct.length;i++){
        keywordStruct[i].tagRelevant = true;
    }

    // Ingredient relevance
    for(let i=0; i<listof_tagList[0].tags.length; i++){
        if(listof_tagList[0].tags[i].active){
            for(let j=0; j<keywordStruct.length; j++){
                if(keywordStruct[j].tagRelevant){
                    for(let k=0; k<keywordStruct[j].ingredientTags.length; k++){
                        if(listof_tagList[0].tags[i].name == keywordStruct[j].ingredientTags[k]){
                            keywordStruct[j].tagRelevant = true;
                            break;
                        }
                        else{
                            keywordStruct[j].tagRelevant = false;
                        }
                    }
                }
            }
        }
    }

    // Device relevance
    for(let i=0; i<listof_tagList[1].tags.length; i++){
        if(listof_tagList[1].tags[i].active){
            for(let j=0; j<keywordStruct.length; j++){
                if(keywordStruct[j].tagRelevant){
                    if(listof_tagList[1].tags[i].name == keywordStruct[j].deviceTags){
                        keywordStruct[j].tagRelevant = true;
                        break;
                    }
                    else{
                        keywordStruct[j].tagRelevant = false;
                    }
                }
            }
        }
    }

    // Ustensil relevance
    for(let i=0; i<listof_tagList[2].tags.length; i++){
        if(listof_tagList[2].tags[i].active){
            for(let j=0; j<keywordStruct.length; j++){
                if(keywordStruct[j].tagRelevant){
                    for(let k=0; k<keywordStruct[j].ustensilTags.length; k++){
                        if(listof_tagList[2].tags[i].name == keywordStruct[j].ustensilTags[k]){
                            keywordStruct[j].tagRelevant = true;
                            break;
                        }
                        else{
                            keywordStruct[j].tagRelevant = false;
                        }
                    }
                }
            }
        }
    }
}

// Find the index of searched Tag and returns it
function tagList_indexOfByName(tagList, tag){
    return tagList.map(function(e) { return e.name; }).indexOf(tag);
}

// Put all relevance Tags to false
function cleanTagListRelevance(listof_tagList){
    for(let i=0; i<listof_tagList.length; i++){
        for(let j=0; j<listof_tagList[i].tags.length; j++){
            listof_tagList[i].tags[j].relevant = false;
        }
    }
}

function searchAlgorithm(keywordList, searchWord){
    // TO DO
    const test = Math.random() * 10;
    if(test < 5){
        return true;
    } 
    else
    {
        return false;
    }
}