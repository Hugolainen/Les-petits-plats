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
            dropBoxTagList_relevanceUpdate(ingredientDropBox, ingredientTagList, keywordStruct[i].ingredientTags);
            dropBoxTagList_relevanceUpdate(deviceDropBox, deviceTagList, keywordStruct[i].deviceTags);
            dropBoxTagList_relevanceUpdate(ustensilDropBox, ustensilTagList, keywordStruct[i].ustensilTags);
        }
        else{
            // TO-DO : show message -> nothing matchs
            console.log("no match");
        }
    }
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