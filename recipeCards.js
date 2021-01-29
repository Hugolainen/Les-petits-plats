var recipeGallery = $("#recipeGallery");

// RecipeCard gallery element generation
function generateRecipeCardGallery(galleryElement, recipeList){
    for(let i=0; i<recipeList.length;i++){
        galleryElement.append(generateCard(recipeList[i]));
    }
}

function generateCard(recipe){
    var element = $("<div> </div>");
    element.addClass("col-12 col-lg-4 px-3 pb-4");
    
    var card = $("<div> </div>");
    card.addClass("card border-light shadow-sm bg-light");

    // Placeholder image
    var image=$("<img src=\"https://via.placeholder.com/380x180.png\" class=\"bd-placeholder-img card-img-top\" alt=\"Placeholder image\" height=\"180\">");

    // Card-body
    var cardBody =  $("<div> </div>");
    cardBody.addClass("card-body pb-0");

    // -- row1
    var row1=$("<div> </div>");
    row1.addClass("row")

    // -- -- title
    var col11=$("<div> </div>");
    col11.addClass("col")
    var header = $("<h2></h2>").text(recipe.name);
    col11.append(header);

    // -- -- time
    var col12=$("<div> </div>");
    col12.addClass("col")
    var time = $("<span> </span>").html("<i class=\"far fa-clock\"></i> " + recipe.time + " min");
    time.addClass("font-weight-bold d-block text-right");
    col12.append(time);

    row1.append(col11);
    row1.append(col12);
    cardBody.append(row1);

    // -- row2
    var row2=$("<div> </div>");
    row2.addClass("row")

    // -- -- Ingredients
    var col21=$("<ul> </ul>");
    col21.addClass("col list-unstyled cardFontSize");
    for(let i=0; i<recipe.ingredients.length; i++){
        let newIngredient = $("<li> </li>");

        if(recipe.ingredients[i].quantity == undefined && recipe.ingredients[i].unit == undefined){
            newIngredient.html("<strong>" + recipe.ingredients[i].ingredient + "</strong>");
        }
        else if(recipe.ingredients[i].unit == undefined){
            newIngredient.html("<strong>" + recipe.ingredients[i].ingredient + ": </strong>" + recipe.ingredients[i].quantity);
        }
        else{
            newIngredient.html("<strong>" + recipe.ingredients[i].ingredient + ": </strong>" + recipe.ingredients[i].quantity + recipe.ingredients[i].unit);
        }
        
        col21.append(newIngredient);
    }

    // -- -- Description
    var col22=$("<div> </div>");
    col22.addClass("col")
    var desc = $("<p> </p>").text(recipe.description);
    desc.addClass("robotoFont cardFontSize");
    col22.append(desc);

    row2.append(col21);
    row2.append(col22);
    cardBody.append(row2);

    card.append(image);
    card.append(cardBody);

    element.append(card);

    return element;
}




///////// HTML code for a recipeCard in the gallery
/*
    <div class="col-12 col-lg-4 p-0 card border-light shadow-sm bg-light">
        <img src="https://via.placeholder.com/380x180.png" class="bd-placeholder-img card-img-top" alt="Placeholder image" height="180">
        <div class="card-body pb-0">
            <div class="row">
                <div class="col">
                    <h2> Coco Lemonade </h2>
                </div>

                <div class="col">
                    <span class="font-weight-bold d-block text-right"> <i class="far fa-clock"></i> 10 min </span>
                </div>
            </div>

            <div class="row">
                <ul class="col list-unstyled cardFontSize">
                    <li> <strong> Coconut milk: </strong> 400ml </li>
                    <li> <strong> Lemon juice: </strong> 2 </li>
                    <li> <strong> Coconut cream: </strong> 4 cuillères </li>
                    <li> <strong> Sugar: </strong> 20g </li>
                    <li> <strong> Ice cubes: </strong> 2 </li>
                </ul>

                <div class="col">
                    <p class="robotoFont cardFontSize"> Put the ice cubes in the blender, add the milk, coconut cream, the juice of 2 lemons and the sugar. Blend until you get the desired texture. </p>
                </div>
            </div>
        </div>       
    </div>
*/