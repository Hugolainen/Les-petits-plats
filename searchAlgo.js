const globalSearchBar = $("#global_searchInput");



function initGlobalSearchBar(searchBarElement, keywordStruct, ingredientTagList, deviceTagList, ustensilTagList, ingredientDropBox, deviceDropBox, ustensilDropBox){
    searchBarElement.on('keyup', function(e){
        const searchWord = e.target.value.toLowerCase();

        if(searchWord.length >= 3){
            searchEngine(keywordStruct, searchWord, ingredientTagList, deviceTagList, ustensilTagList, ingredientDropBox, deviceDropBox, ustensilDropBox);
        }
    });
}



function searchEngine(keywordStruct, searchWord, ingredientTagList, deviceTagList, ustensilTagList, ingredientDropBox, deviceDropBox, ustensilDropBox){
    var noMatch = true;
    for(let i=0; i<keywordStruct.length;i++){
        if(searchAlgorithm(keywordStruct[i].keywordList, searchWord)){
            keywordStruct[i].relevant = true;
            noMatch = false;
        }
        else{
            keywordStruct[i].relevant = false;
            
        }
    }

    if(noMatch){
        console.log("no match");
    }

    tagList_relevanceUpdate(keywordStruct, ingredientTagList, deviceTagList, ustensilTagList);
    dropBoxUpdate(ingredientDropBox, ingredientTagList);
    dropBoxUpdate(deviceDropBox, deviceTagList);
    dropBoxUpdate(ustensilDropBox, ustensilTagList);
}

function tagList_relevanceUpdate(keywordStruct, ingredientTagList, deviceTagList, ustensilTagList){
    cleanTagListRelevance(ingredientTagList);
    cleanTagListRelevance(deviceTagList);
    cleanTagListRelevance(ustensilTagList);
    
    for(let i=0; i<keywordStruct.length;i++){
        if(keywordStruct[i].relevant == true){
            for(let j=0; j<keywordStruct[i].ingredientTags.length; j++){
                let index = tagList_indexOfByName(ingredientTagList, keywordStruct[i].ingredientTags[j]);
                ingredientTagList[index].relevant = true;
            }
            for(let j=0; j<keywordStruct[i].ustensilTags.length; j++){
                let index = tagList_indexOfByName(ustensilTagList, keywordStruct[i].ustensilTags[j]);
                ustensilTagList[index].relevant = true;
            }
            let index = tagList_indexOfByName(deviceTagList, keywordStruct[i].deviceTags)
            deviceTagList[index].relevant = true;
        }
    }
}

function tag_relevanceUpdate(keywordStruct, ingredientTagList, deviceTagList, ustensilTagList){
    for(let i=0; i<keywordStruct.length;i++){
        keywordStruct[i].tagRelevant = true;
    }

    // Device relevance
    for(let i=0; i<deviceTagList.length; i++){
        if(deviceTagList[i].active){
            for(let j=0; j<keywordStruct.length; j++){
                if(keywordStruct[j].tagRelevant){
                    if(deviceTagList[i].name == keywordStruct[j].deviceTags){
                        keywordStruct[j].tagRelevant = true;
                        break;
                    }
                    else{
                        keywordStruct[j].tagRelevant = false;
                    }
                }
            }
        }
        deviceTagList[i].relevant = false;
    }

    // Ustensil relevance
    for(let i=0; i<ustensilTagList.length; i++){
        if(ustensilTagList[i].active){
            for(let j=0; j<keywordStruct.length; j++){
                if(keywordStruct[j].tagRelevant){
                    for(let k=0; k<keywordStruct[j].ustensilTags.length; k++){
                        if(ustensilTagList[i].name == keywordStruct[j].ustensilTags[k]){
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
        ustensilTagList[i].relevant = false;
    }

    // Ingredient relevance
    for(let i=0; i<ingredientTagList.length; i++){
        if(ingredientTagList[i].active){
            for(let j=0; j<keywordStruct.length; j++){
                if(keywordStruct[j].tagRelevant){
                    for(let k=0; k<keywordStruct[j].ingredientTags.length; k++){
                        if(ingredientTagList[i].name == keywordStruct[j].ingredientTags[k]){
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
        ingredientTagList[i].relevant = false;
    }

    for(let i=0; i<keywordStruct.length;i++){
        if(keywordStruct[i].tagRelevant == true){
            for(let j=0; j<keywordStruct[i].ingredientTags.length; j++){
                let index = tagList_indexOfByName(ingredientTagList, keywordStruct[i].ingredientTags[j]);
                ingredientTagList[index].relevant = true;
            }

            for(let j=0; j<keywordStruct[i].ustensilTags.length; j++){
                let index = tagList_indexOfByName(ustensilTagList, keywordStruct[i].ustensilTags[j]);
                ustensilTagList[index].relevant = true;
            }

            let index = tagList_indexOfByName(deviceTagList, keywordStruct[i].deviceTags);
            deviceTagList[index].relevant = true;
        }
    }
}

// Find the index of searched Tag and returns it
function tagList_indexOfByName(tagList, tag){
    return tagList.map(function(e) { return e.name; }).indexOf(tag);
}

// Put all relevance Tags to false
function cleanTagListRelevance(tagList){
    for(let i=0; i<tagList.length; i++){
        tagList[i].relevant = false;
    }
}

function searchAlgorithm(keywordList, searchWord){
    const test = Math.random() * 10;
    if(test < 1){
        return true;
    }
    else{
        return false;
    }
}