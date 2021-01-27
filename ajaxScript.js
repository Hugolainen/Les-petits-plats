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

    // Generation of the tags in the dropBox menus
    generateTagList(ingredientsTags.tagList, ingredientsList);
    generateTagList(devicesTags.tagList, devicesList);
    generateTagList(ustensilsTags.tagList, ustensilsList);
});

// Extract and standarize the list for each tag type
function generateList(type, data){
  var tagList = new Array();
  var uniqueTags = new Array();
  
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

  $.each(tagList, function(i, el){
    if($.inArray(el, uniqueTags) === -1) uniqueTags.push(el);
  });
  return uniqueTags;
}

function getIngredientsList(ingredientsData, tagList){
  for(var i=0; i<ingredientsData.length; i++){
    const tag = (ingredientsData[i].ingredient).substring(0, 1).toUpperCase() + (ingredientsData[i].ingredient).substring(1).toLowerCase();
    tagList.push(tag);
  }

  return tagList;
}

function getDevicesList(devicesData, tagList){
  const tag = (devicesData).substring(0, 1).toUpperCase() + (devicesData).substring(1).toLowerCase();
  tagList.push(tag);
  return tagList;
}

function getUstensilsList(ustensilsData, tagList){
  for(var i=0; i<ustensilsData.length; i++){
    const tag = (ustensilsData[i]).substring(0, 1).toUpperCase() + (ustensilsData[i]).substring(1).toLowerCase();
    tagList.push(tag);
  }

  return tagList;
}