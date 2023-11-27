function dragOnDrop() {
   const card = document.querySelectorAll(".Board__card-title");
   const list = document.querySelectorAll(".Board__list");

   card.forEach((item)=>{
    item.addEventListener("dragstart",(e)=>{
      e.target.style.background="gray";
      e.target.style.opacity="50";
    })
   })
}
 export default dragOnDrop;
 