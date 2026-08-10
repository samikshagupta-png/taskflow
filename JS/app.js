let themeswitcher=document.querySelector("#themebtn");
const form = document.querySelector(".worklist");
let task=document.querySelector("#task");
let text =document.querySelector(".Text");
const recentTaskList = document.querySelector(".recenttask ul");

const gradients = [
    "linear-gradient(to right, #d0c2dc, #FFFFFF)", 
    "linear-gradient(to right, #6fb9f6, #e9b7b7)", 
    "linear-gradient(to right, #8d8a8a, #5555da)", 
    "linear-gradient(to right, #f3ecec, #b6b6be)"  
  ];

  let current = 0; 
  themeswitcher.addEventListener("click", function() {
    
    document.body.style.background = gradients[current];

    
    current = (current + 1) % gradients.length;
});

