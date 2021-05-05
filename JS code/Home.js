var searchItem;
function openNew(){
    
    searchItem=document.getElementById("search-box").value;
    
    if(searchItem=="" || searchItem=="Please enter valid stock name"){
        document.getElementById("search-box").placeholder="Please enter valid stock name.....";
        document.getElementById("search-box").classList.add("mystyle");
        //document.getElementById("search-box").placeholder.style.color = red;
    }
    else{
        window.open("../HTML code/index.html");
        document.getElementById("search-box").classList.remove("mystyle");
    }
    
      
}
