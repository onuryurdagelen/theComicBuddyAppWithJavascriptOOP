//The Superhero Entry Class
class SuperHeroEntry {
    constructor(superheroName,superheroUniverse,superheroPower) {
        this.superheroName = superheroName;
        this.superheroUniverse = superheroUniverse;
        this.superheroPower = superheroPower;
    }
}

//The Superhero List Class
class SuperheroList {
  addSuperhero(entry) {
      const listData = document.querySelector('.table-body');

      const listDiv = document.createElement('tr');
      listDiv.setAttribute('id','table-row');

      listDiv.innerHTML += `<td>${entry.superheroName}</td>
      <td>${entry.superheroUniverse}</td>
      <td>${entry.superheroPower}</td> 
      <td><a href="#"><i class="fas fa-trash"></i></a></td>`;
      listData.appendChild(listDiv);
  }
  //Clear Superhero Inputs Fields
  clearSuperHeroInputs() {
     [
        document.querySelector('.input-name').value,
        document.querySelector('.input-universe').value,
        document.querySelector('.input-power').value

    ] = ["","",""]
  }
  //validation Error Function
  validationError() {
      document.querySelector('.validation-error').classList.add('show-validation');

      setTimeout(()=>{
        document.querySelector('.validation-error').classList.remove('show-validation');
      },1500);
  }
  //validation success Function
  validationSuccess(){
      document.querySelector('.validation-success').classList.add('show-validation');

      setTimeout(()=>{
        document.querySelector('.validation-success').classList.remove('show-validation');
      },1500);
  }
  //Validation info Function()
  validationInfo() {
      document.querySelector('.validation-info').classList.add('show-validation');

      setTimeout(()=>{
        document.querySelector('.validation-info').classList.remove('show-validation');
      },1500);
  }

}
//StoreSuperHero Class
class StoreSuperHero {
    //Get Superhero from Local Storage
    static GetSuperHeroFromLS() {
        let superheros;
        if(localStorage.getItem('superheros') == null) {
            superheros = [];
        }else {
            superheros = JSON.parse(localStorage.getItem('superheros'));
    }
        return superheros;
    }
    static AddSuperHeroToLocalStorage(entry) {
            const superHeroList = StoreSuperHero.GetSuperHeroFromLS();
            superHeroList.push(entry);
            localStorage.setItem('superheros',JSON.stringify(superHeroList))

    }
    //Delete aall of super heros from localStorage
    static deleteSuperHerosFromLocalStorage(){
        localStorage.clear();
    }
    //Delete a the super hero from local storage
    static removeSuperHero(clickedSuperHero) {
        const superHeroList = StoreSuperHero.GetSuperHeroFromLS();

        superHeroList.forEach((superhero,index) =>{
            if(superhero.superheroName === clickedSuperHero ) {
                superHeroList.splice(index,1);
            }
        })
        localStorage.setItem('superheros',JSON.stringify(superHeroList));
    } 
    //Display SuperHeroes from Local Storage
    static displaySuperHeroes() {
        const superheros = StoreSuperHero.GetSuperHeroFromLS();
        
        superheros.forEach((superhero) => {
            const list = new SuperheroList;
            list.addSuperhero(superhero);
        })
    }
}
//-----------------------------Events----------------------------------
//Adding hero to display
const addHero = document.querySelector('.add-hero');
addHero.addEventListener('click',addHeroToDisplay)

//Add hero function
function addHeroToDisplay() {
    let [superheroName,superheroUniverse,superheroPower] = [document.querySelector('.input-name').value,document.querySelector('.input-universe').value,document.querySelector('.input-power').value];
    //Instantiating the SuperheroEntry Class
    const entry = new SuperHeroEntry(superheroName,superheroUniverse,superheroPower);

    //Instantiating the SuperheroEntry Class
    const list = new SuperheroList();
    if(superheroName === "" ||superheroUniverse  ==="" ||superheroPower === "") {
        list.validationError();
    }else {
        list.addSuperhero(entry);
        StoreSuperHero.AddSuperHeroToLocalStorage(entry);
        list.validationSuccess();
    }
    list.clearSuperHeroInputs();

    if(list) {
    //Remove an item from display
    document.querySelector('.table-body').addEventListener('click',removeAnITem);
    function removeAnITem(e){
    if(e.target.className === 'fas fa-trash'){
        const trashIcon = e.target;
        const clickedHero = trashIcon.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        StoreSuperHero.removeSuperHero(clickedHero);
        trashIcon.parentElement.parentElement.parentElement.remove();
    }else {
        return;
        }
    }
}
}
//Displaying SuperHeros From Local Storage
document.addEventListener('DOMContentLoaded',StoreSuperHero.displaySuperHeroes);

//Remove all list item from display
document.querySelector('.clear-list').addEventListener('click',removeAllItem);

function removeAllItem() {
    const tableBody = document.querySelector('.table-body');
    //Instantiating the SuperheroEntry Class
    const list = new SuperheroList();
    if(tableBody.hasChildNodes()) {
        tableBody.remove();
        list.validationInfo();
        StoreSuperHero.deleteSuperHerosFromLocalStorage();
        
    }else{
        return;
    }
    
    }
