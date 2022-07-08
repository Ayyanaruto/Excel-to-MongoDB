const input=document.querySelector("#file")
const fileName=document.querySelector(".description")
const button=document.querySelector(".button")
const about=document.querySelector(".about")

input.addEventListener("change",(e)=>{
    about.style.display="none"
    const name=e.target.files[0].name
    fileName.innerHTML=name
    button.style.display="block"
   
})