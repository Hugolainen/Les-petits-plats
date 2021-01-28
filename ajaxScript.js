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

    // Generation of the tags in the dropBox menus
    generateTagList(ingredientsTags.tagList, ingredientsList);
    generateTagList(devicesTags.tagList, devicesList);
    generateTagList(ustensilsTags.tagList, ustensilsList);

    generateActiveTagsList(activeTagList, ingredientsList, "ingredient");
    generateActiveTagsList(activeTagList, devicesList, "device");
    generateActiveTagsList(activeTagList, ustensilsList, "ustensil");

    addEvent_onClick_dropboxTags(ingredientsTags.tagList, ingredientsList, activeTagList, "ingredients");
    addEvent_onClick_dropboxTags(devicesTags.tagList, devicesList, activeTagList, "devices");
    addEvent_onClick_dropboxTags(ustensilsTags.tagList, ustensilsList, activeTagList, "ustensils");

    addEvent_onClick_activeTags(ingredientsTags.tagList, ingredientsList, activeTagList, "ingredients");
    addEvent_onClick_activeTags(devicesTags.tagList, devicesList, activeTagList, "devices");
    addEvent_onClick_activeTags(ustensilsTags.tagList, ustensilsList, activeTagList, "ustensils");

    generateRecipeCardGallery(recipeGallery, recipeStructure);
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
    tag.name = (ingredientsData[i].ingredient).substring(0, 1).toUpperCase() + (ingredientsData[i].ingredient).substring(1).toLowerCase();
    tag.active = false;
    tagList.push(tag);
  }
  return tagList;
}

function getDevicesList(devicesData, tagList){
  let tag = new Array();
  tag.name = (devicesData).substring(0, 1).toUpperCase() + (devicesData).substring(1).toLowerCase();
  tag.active = false;
  tagList.push(tag);
  return tagList;
}

function getUstensilsList(ustensilsData, tagList){
  for(var i=0; i<ustensilsData.length; i++){
    let tag = new Array();
    tag.name = (ustensilsData[i]).substring(0, 1).toUpperCase() + (ustensilsData[i]).substring(1).toLowerCase();
    tag.active = false;
    tagList.push(tag);
  }

  return tagList;
}