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

    const tagListStruct = generatelistStruct(recipeStructure);

    index_activeTagList_devices = ingredientsList.length;
    index_activeTagList_ustensils = index_activeTagList_devices + devicesList.length;
    const keywordStruct = generateKeywordStruct(recipeStructure);

    // Generation of the content and initialisation of the events
    generateDropBox_tagLists(elementDropBox_TagList, tagListStruct);
    generateActiveTags_tagLists(activeTagList, tagListStruct);
    addEvent_onClick(elementDropBox_TagList, tagListStruct, activeTagList, recipeGallery, keywordStruct);
    generateRecipeCardGallery(recipeGallery, recipeStructure);
    initSearchTagElement_event(ingredientsTags, tagListStruct[0].tags);
    initSearchTagElement_event(devicesTags, tagListStruct[1].tags);
    initSearchTagElement_event(ustensilsTags, tagListStruct[2].tags);

    initGlobalSearchBar(recipeGallery, globalSearchBar, keywordStruct, elementDropBox_TagList, tagListStruct);
 
  });

// Extract, standarize and initialize the list for each tag type
function generatelistStruct(data){
  var struct = new Array();

  var ingredientList = new Array();
  ingredientList.type = "ingredients";
  ingredientList.tags = generateList("ingredients", data);
  struct[0] = ingredientList;

  var deviceList = new Array();
  deviceList.type = "devices";
  deviceList.tags = generateList("devices", data);
  struct[1] = deviceList;

  var ustensilList = new Array();
  ustensilList.type = "ustensils";
  ustensilList.tags = generateList("ustensils", data);
  struct[2] = ustensilList;

  return struct;
}

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
  keywordStruct.keywordList = new Array();
  keywordStruct.ingredientTags = new Array();
  keywordStruct.deviceTags = recipe.appliance;
  keywordStruct.ustensilTags = new Array();

  keywordStruct.tagRelevant = true;
  keywordStruct.searchRelevant = true;
  keywordStruct.relevant = true;

  var keywordBuffer = recipe.name + " " + recipe.description;

  for(let i=0; i<recipe.ingredients.length; i++){
    keywordBuffer += " " + recipe.ingredients[i].ingredient;
    keywordStruct.ingredientTags.push(recipe.ingredients[i].ingredient);
  }
  
  for(let i=0; i<recipe.ustensils.length; i++){
    keywordStruct.ustensilTags.push(recipe.ustensils[i]);
  }

  // Lower case
  keywordBuffer= keywordBuffer.toLowerCase();

  // Delete ponctuation
  keywordBuffer= keywordBuffer.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

  // Transform array from the string
  keywordBuffer = keywordBuffer.trim().split(" ");

  // Filter words shorter than 3 char
  keywordBuffer = keywordBuffer.filter( function( element ) {
    return element.length >= 3;
  });

  // Filter duplicates
  keywordBuffer = [...new Set(keywordBuffer)];

  // Old way to filter duplicates
  //keywordStruct.keywordList = keywordBuffer.filter((v, i, a) => a.indexOf(v) === i);

  // Sort array Alphabeticaly
  keywordBuffer = keywordBuffer.sort();

  keywordStruct.keywordList = keywordBuffer;

  return keywordStruct;
}