//when refresh show notes
showNotes();



//important notes
const inputImp=document.getElementById("imp")
inputImp.addEventListener('click',(e)=>{
    e.preventDefault()   
    if(inputImp.classList.contains("impNote")){
        inputImp.classList.remove("impNote")
    }
    else{
        inputImp.classList.add("impNote")
    }
})


//take notes ans push in local storage
const addBtn = document.getElementById("add-note");
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let addTxt = document.getElementById("note-body");
  let addTitle = document.getElementById("note-title");
  const inputImp=document.getElementById("imp")

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //string to array
  }
  //this is the main logic i.e, making the aray of object in the myObj
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    imp:inputImp.classList.contains("impNote")

  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  inputImp.classList.remove("impNote")
  // console.log(notesObj)
  //to show the written note
document.getElementById("toggle-title").parentElement.parentElement.style.display="block"
 document.getElementById("input-toggle-it").style.display="none"


  showNotes();
});



//function to show the notes
function showNotes() {
  let notes = localStorage.getItem("notes"); //notes is the key
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //string to array
  }
  let x=""
  let html = "";
  notesObj.forEach((elements, index) => {
      
      if(elements.imp===true){
          x="actionsActive"  
      }
      else{
          x=""
      }

    html += `      <div class="card">
        <h1 class="title">${elements.title}</h1>
        <p class="body">${elements.text}
        </p>
        <hr>
        <div class="actions ${x}">
            <button class="delete" onclick="deleteNote(this.id)" id="${index}">
                <i class="fas fa-trash-alt"></i>
            </button>
            <button class="imp " onclick="impNote(this.id)" id="imp${index}">
                <i class="fas fa-star"></i>
            </button>
            <button class="edit " onclick="editNote(this.id)" id="${index}">
                <i class="fas fa-edit"></i>
            </button>
        </div>
    </div>`;
  });
  let notesElm = document.getElementById("output");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<h1 style="margin:10px auto">Nothing to show! Use upper section to add notes </h1>`;
  }
}


// function to delete a note 
function deleteNote(index){
    // console.log('i am deleting', index)
    let notes = localStorage.getItem('notes');//notes is the key
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);//string to array
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes()
    
}
//function to edit notes
function editNote(id){
    const model=document.getElementsByClassName("model")[0]
    console.log(model);
    if(model.style.display=="none"){
        model.style.display="block"
    }
    else{
        model.style.display="none"
    }
    
    let addTxt = document.getElementById("model-body");
  let addTitle = document.getElementById("model-title");
  let  inputImp=document.getElementById("model-imp")
  let editElem=document.getElementById(id)
  let editElemP=editElem.parentElement.parentElement
  console.log(editElemP.children[0].textContent)
  

  addTitle.innerText=editElemP.children[0].textContent
  addTxt.innerText=editElemP.children[1].textContent

  const addModelBtn = document.getElementById("add-model-note");
  addModelBtn.addEventListener('click',(e)=>{
      e.preventDefault()
        let notes = localStorage.getItem("notes");
        console.log(id);
        
      
        if (notes == null) {
          notesObj = [];
        } 
        else {
          notesObj = JSON.parse(notes);
        }
        let myObj = {
          title: addTitle.value,
          text: addTxt.value,
          imp:inputImp.classList.contains("impNote")
      
        };
        notesObj[id]=myObj;
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        addTitle.value = "";
        inputImp.classList.remove("impNote");
        showNotes();
        model.style.display="none";

  })


}


//search notes
let search =document.getElementById('search');
search.addEventListener('input',function(){
    let inputVal=search.value.toLowerCase();
    // console.log(inputVal)
    let noteCards= document.getElementsByClassName('card');
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let titleTxt=element.getElementsByTagName('h1')[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)||titleTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }

    })
})


//important
let x=0;
function impNote(element){
    x+=1;
    let impElem = document.getElementById(element)

    let impElemP= impElem.parentElement
    if(impElemP.classList.contains("actionsActive")){
        impElemP.classList.remove("actionsActive")
    }
    else{
        impElemP.classList.add("actionsActive")
    }

}

//toggle input
const toggleInput=document.getElementById("toggle-title").parentElement.parentElement
toggleInput.addEventListener("click",()=>{
    const elem=document.getElementById("input-toggle-it")
    if(elem.style.display=="none"){
      elem.style.display="block"
      toggleInput.style.display="none"
      
    }
    else{
      elem.style.display="none"
      toggleInput.style.display="block"
    }
  })

