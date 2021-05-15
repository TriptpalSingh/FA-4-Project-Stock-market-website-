var searchItem_stockname;
var StocksNameList = ["Adobe", "Adobe Inc.", "Alibaba Group", "Amazon", "AMD", "American Tower Corporation", "Apple", "Bank of America", "Chevron Corporation", "Cisco Systems", "Coca-Cola Company", "Colgate-Palmolive Company", "Facebook", "Google", "HDFC Bank Limited", "Intel", "JP Morgan Chase", "Johnson & Johnson", "Mastercard Incorporated", "McDonald's Corporation", "Microsoft", "NVIDIA", "Netflix", "Nike", "Oracle Corporation", "PayPal Holdings", "PepsiCo", "Pfizer", "Reliance", "StarBucks Corporation", "Tesla", "Toyota Motors", "Unilever PLC", "United Parcel Service", "UnitedHealth Group Incorporated", "Visa", "Walmart Inc.", "Walt Disney", "Zoom video"];
var SearchInfo;
function getDate(num){
	var MonthList=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    var date = new Date();
    date.setDate(date.getDate()-num);

    var req_date = (date.getDate())+''+(MonthList[date.getMonth()]);
    
    return req_date;

}

var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
function openNew(){
    
    searchItem_stockname=document.getElementById("search-box").value;
    
    //if(searchItem_stockname=="" || searchItem_stockname=="Please enter valid stock name"){
    if(StocksNameList.includes(searchItem_stockname)){
        window.open("../HTML code/Page3(stock info and compare page).html");
        document.getElementById("search-box").classList.remove("mystyle");
        SearchInfo=searchItem_stockname;
        localStorage.setItem("stockSearch",SearchInfo);
    }
    else{
        document.getElementById("search-box").value="";
        document.getElementById("search-box").placeholder="Select Stock only from Dropdown..";
        document.getElementById("search-box").classList.add("mystyle");
        //document.getElementById("search-box").placeholder.style.color = red;
    }
    
      
}

            //Graph1
var ctx=document.getElementById("myChart1").getContext('2d');
var chart =new Chart(ctx,{
    type: 'line',

    data:{
        labels:[ '',getDate(6) , getDate(5), getDate(4), getDate(3), getDate(2), getDate(1), getDate(0)],
        datasets: [{
            label: 'NIFTY(NSE)',
            data: [14392.50,14496.50,14617.85,14724.80,14823.15,14942.35,14850.75,14696.50],
            borderColor: 'grey',
            //backgroundColor: '#5e6c75',
            backgroundColor: '#37E16D',
        }]
    },
    options : {}
});
            //Graph2

var ctx=document.getElementById("myChart3").getContext('2d');
var chart =new Chart(ctx,{
    type: 'line',

    data:{
        labels:[ '',getDate(6) , getDate(5), getDate(4), getDate(3), getDate(2), getDate(1), getDate(0)],
        datasets: [{
            label: 'TCS',
            data: [3.90,3.80,3.84,3.61,3.12,3.00,3.08,3.06],
            borderColor: 'grey',
            backgroundColor: '#37E16D',
        }]
    },
    options : {}
});

            //Graph3

var ctx=document.getElementById("myChart2").getContext('2d');
var chart =new Chart(ctx,{
    type: 'line',

    data:{
        labels:[ '',getDate(6) , getDate(5), getDate(4), getDate(3), getDate(2), getDate(1), getDate(0)],
        datasets: [{
            label: 'SENSEX(DSE)',
            data: [48718.52,48253.51,48677.55,48949.76,49206.47,49502.41,49161.81,48690.80],
            borderColor: 'grey',
            backgroundColor: '#37E16D'
        }]
    },
    options : {}
});

$("#Profile-logo").hover(function(){
    $("#user-name").toggle();
    $("#username").text(localStorage.getItem("username"));
})


