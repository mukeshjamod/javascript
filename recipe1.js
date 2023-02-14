var selectedRow = null;

//show Alerts
function showAlert(message,classname){
  const div = document.createElement("div");
  div.className = `alert alert-${classname}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout (() => document.querySelector(".alert").remove(),3000);
}

//clear All fields
function clearField()
{
  document.getElementById("recipe-name").value="";
       document.getElementById("recipe-Type").value = "";
       document.getElementById("recipe-Discription").value ="";
}

// Define an array to store recipes
 const recipes = [];

// Get the form element and add a submit event listener
const form = document.querySelector("#Add");
form.addEventListener("click", (e) => {
e.preventDefault(); // Prevent the form from submitting

  // Get the recipe data from the form
  //  const id = recipes.length + 1 ;
  const recipeName = document.getElementById("recipe-name").value;
  const recipeType = document.getElementById("recipe-Type").value;
  const recipeDescription = document.getElementById("recipe-Discription").value;

  if(recipeName == "" || recipeType == "" || recipeDescription == "")
  {
    showAlert("please fill in all field","danger");
  }
  else{
    if(selectedRow == null) {
      const list = document.querySelector("#recipe-table");
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${recipeName}</td>
      <td>${recipeType}</td>
      <td>${recipeDescription}</td>
      <td><a href="#" class="btn btn-warning btn-sm edit">Edit</a>  
      <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
     </td>` ;
       list.appendChild(row);
       selectedRow = null;
       showAlert("recipe Added","success")

    }
    else{
      selectedRow.children[1].textcontent = recipeName;
      selectedRow.children[2].textcontent = recipeType;
      selectedRow.children[3].textcontent = recipeDescription;
       selectedRow = null;
      
      showAlert("recipe Info Edited", "Info");
    }
  clearField();
}

  // Create a recipe object and add it to the recipes array
  const display = {
    // Number : id,
    Name: recipeName,
    Type:recipeType ,
    Discription: recipeDescription
  };
recipes.push(display);
console.log(recipes);
});


//Edit Data
document.querySelector("#recipe-table").addEventListener("click", (e) =>
{target = e.target;
  if(target.classList.contains("edit"))
  {
    selectedRow = target.parentElement.parentElement;
       document.getElementById("recipe-name").value = selectedRow.children[1].textcontent;
       document.getElementById("recipe-Type").value = selectedRow.children[2].textcontent ;
       document.getElementById("recipe-Discription").value =  selectedRow.children[3].textcontent;
       
  }

})

// Delete Data
document.querySelector("#recipe-table").addEventListener("click", (e)=> {
  target = e.target;
  if(target.classList.contains("delete")){
    target.parentElement.parentElement.remove();
    showAlert("recipe data deleted","danger");
  }
});