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
    for(let i=0; i<keywordStruct.length;i++){
        if(searchAlgorithm(keywordStruct[i].keywordList, searchWord)){
            keywordStruct[i].relevant = true;
            dropBoxTagList_relevanceUpdate(ingredientDropBox, ingredientTagList, keywordStruct[i].ingredientTags);
            dropBoxTagList_relevanceUpdate(deviceDropBox, deviceTagList, keywordStruct[i].deviceTags);
            dropBoxTagList_relevanceUpdate(ustensilDropBox, ustensilTagList, keywordStruct[i].ustensilTags);
        }
        else{
            keywordStruct[i].relevant = false;
            console.log("no match");
        }
    }

    tagList_relevanceUpdate();
}

function tagList_relevanceUpdate(keywordStruct, ingredientTagList, deviceTagList, ustensilTagList){
    for(let i=0; i<keywordStruct.length;i++){
        if(keywordStruct[i].relevant == true){
            for(let j=0; j<keywordStruct[i].ingredientTags.length; j++){
                let index = ingredientTagList.indexOf(keywordStruct[i].ingredientTags[j]);
                ingredientTagList[index].relevant = true;
            }
            for(let j=0; j<keywordStruct[i].ustensilTags.length; j++){
                let index = ustensilTagList.indexOf(keywordStruct[i].ustensilTags[j]);
                ustensilTagList[index].relevant = true;
            }
            let index = deviceTagList.indexOf(keywordStruct[i].deviceTags);
            deviceTagList[index].relevant = true;
        }
    }
}


function indexOf_test(tagList, tag){
    console.log(tagList);
    var test = tagList.map(function(e) { return e.name; }).indexOf(tag);
    //var test = tagList.name.indexOf(tag);
    console.log(test);
    console.log(tagList[test]);
}

function dropBoxTagList_relevanceUpdate(dropboxElement, tagList, tagToActivate){
    for(let i=0; i<tagToActivate.length; i++){
        const index = tagList.indexOf(tagToActivate);
        // CHECK THAT
        console.log(index);
        tagList[index].relevant = true;
    }
    dropBoxUpdate(dropboxElement.tagList, tagList);
}


function searchAlgorithm(keywordList, searchWord){
    return true;
}