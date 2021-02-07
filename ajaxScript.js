async function getAsync() 
{
  let response = await fetch(`https://hugolainen.github.io/Les-petits-plats/recipes.json`);
  let data = await response.json()
  return data;
}

getAsync().then((data) => 
{
    const recipeStructure = data.recipes;
    const ingredientsList = generateList("ingredients", recipeStructure);
    const devicesList = generateList("devices", recipeStructure);
    const ustensilsList = generateList("ustensils", recipeStructure);
    index_activeTagList_devices = ingredientsList.length;
    index_activeTagList_ustensils = index_activeTagList_devices + devicesList.length;
    const keywordStruct = generateKeywordStruct(recipeStructure);

    // Generation of the tags in the dropBox menus
    generateTagList(ingredientsTags.tagList, ingredientsList);
    generateTagList(devicesTags.tagList, devicesList);
    generateTagList(ustensilsTags.tagList, ustensilsList);

    generateActiveTagsList(activeTagList, ingredientsList, "ingredient");
    generateActiveTagsList(activeTagList, devicesList, "device");
    generateActiveTagsList(activeTagList, ustensilsList, "ustensil");

    addEvent_onClick_dropboxTags(ingredientsTags.tagList, ingredientsList, activeTagList, "ingredients", recipeGallery);
    addEvent_onClick_dropboxTags(devicesTags.tagList, devicesList, activeTagList, "devices", recipeGallery);
    addEvent_onClick_dropboxTags(ustensilsTags.tagList, ustensilsList, activeTagList, "ustensils", recipeGallery);

    addEvent_onClick_activeTags(ingredientsTags.tagList, ingredientsList, activeTagList, "ingredients", recipeGallery);
    addEvent_onClick_activeTags(devicesTags.tagList, devicesList, activeTagList, "devices", recipeGallery);
    addEvent_onClick_activeTags(ustensilsTags.tagList, ustensilsList, activeTagList, "ustensils", recipeGallery);

    generateRecipeCardGallery(recipeGallery, recipeStructure);

    initSearchTagElement_event(ingredientsTags, ingredientsList);
    initSearchTagElement_event(devicesTags, devicesList);
    initSearchTagElement_event(ustensilsTags, ustensilsList);




 });

// Extract, standarize and initialize the list for each tag type
function generateList(type, data){
  var tagList = new Array();
  var uniqueTags = new Array();
  var purgedTagList = new Array();

  for(var i=0; i<data.length; i++)
  {
    if(type==="ingredients")
    {
      tagList = getIngredientsList(data[i].ingredients, tagList);
    }
    else if(type==="devices"){
      tagList = getDevicesList(data[i].appliance, tagList);
    }
    else if(type==="ustensils"){
      tagList = getUstensilsList(data[i].ustensils, tagList);
    }
    else{
      console.log("Error: unknown type");
      return 0;
    }
  }

  for(var i=0; i<tagList.length; i++)
  {
    if(jQuery.inArray(tagList[i].name, uniqueTags) == -1){
      uniqueTags.push(tagList[i].name);
      purgedTagList.push(tagList[i]);
    }
  }

  return purgedTagList;
}

function getIngredientsList(ingredientsData, tagList){
  for(var i=0; i<ingredientsData.length; i++){
    let tag = new Array();
    tag.name = ingredientsData[i].ingredient;
    tag.active = false;
    tag.show = true;
    tag.relevant = true;
    tagList.push(tag);
  }
  return tagList;
}

function getDevicesList(devicesData, tagList){
  let tag = new Array();
  tag.name = devicesData;
  tag.active = false;
  tag.show = true;
  tag.relevant = true;
  tagList.push(tag);
  return tagList;
}

function getUstensilsList(ustensilsData, tagList){
  for(var i=0; i<ustensilsData.length; i++){
    let tag = new Array();
    tag.name = ustensilsData[i];
    tag.active = false;
    tag.show = true;
    tag.relevant = true;
    tagList.push(tag);
  }

  return tagList;
}


// Generate the keyword lists needed for the search engine
function generateKeywordStruct(recipe){
  var keywordStructList = new Array();
  for(let i=0; i<recipe.length; i++){
    keywordStructList[i] = getKeywordStruct(recipe[i]);
  }

  return keywordStructList;
}


function getKeywordStruct(recipe){
  var keywordStruct = new Array();
  keywordStruct.keywordList = recipe.name + " " + recipe.description + " ";
  keywordStruct.ingredientTags = "";
  keywordStruct.deviceTags = recipe.appliance;
  keywordStruct.ustensilTags = "";

  for(let i=0; i<recipe.ingredients.length; i++){
    keywordStruct.keywordList += recipe.ingredients[i].ingredient + " ";
    keywordStruct.ingredientTags += recipe.ingredients[i].ingredient + " ";
  }
  
  for(let i=0; i<recipe.ustensils.length; i++){
    keywordStruct.ustensilTags += recipe.ustensils[i] + " ";
  }

  // TO DO
  // Change tag from string to array (if needed)
  // Order the keyword list


  return keywordStruct;
}