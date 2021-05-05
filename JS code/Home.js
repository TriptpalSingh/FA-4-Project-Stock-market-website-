var searchItem;
function openNew(){
    
    searchItem=document.getElementById("search-box").value;
    
    if(searchItem=="" || searchItem=="Please enter valid stock name"){
        document.getElementById("search-box").value="Please enter valid stock name";
    }
    else{
        window.open("../HTML code/index.html");
    }
    
      
}
