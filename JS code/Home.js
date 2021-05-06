var searchItem_stockname;
function openNew(){
    
    searchItem_stockname=document.getElementById("search-box").value;
    
    if(searchItem_stockname=="" || searchItem_stockname=="Please enter valid stock name"){
        document.getElementById("search-box").placeholder="Please enter valid stock name.....";
        document.getElementById("search-box").classList.add("mystyle");
        //document.getElementById("search-box").placeholder.style.color = red;
    }
    else{
        window.open("../HTML code/index.html");
        document.getElementById("search-box").classList.remove("mystyle");
    }
    
      
}