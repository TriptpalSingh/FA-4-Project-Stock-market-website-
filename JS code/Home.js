var searchItem_stockname;
var StocksNameList = ["Adobe", "Adobe Inc.", "Alibaba Group", "Amazon", "AMD", "American Tower Corporation", "Apple", "Bank of America", "Chevron Corporation", "Cisco Systems", "Coca-Cola Company", "Colgate-Palmolive Company", "Facebook", "Google", "HDFC Bank Limited", "Intel", "JP Morgan Chase", "Johnson & Johnson", "Mastercard Incorporated", "McDonald's Corporation", "Microsoft", "NVIDIA", "Netflix", "Nike", "Oracle Corporation", "PayPal Holdings", "PepsiCo", "Pfizer", "Reliance", "StarBucks Corporation", "Tesla", "Toyota Motors", "Unilever PLC", "United Parcel Service", "UnitedHealth Group Incorporated", "Visa", "Walmart Inc.", "Walt Disney", "Zoom video"];
var SearchInfo;
function openNew(){
    
    searchItem_stockname=document.getElementById("search-box").value;
    
    //if(searchItem_stockname=="" || searchItem_stockname=="Please enter valid stock name"){
    if(StocksNameList.includes(searchItem_stockname)){
        window.open("../HTML code/index.html");
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
        labels:['Day1','Day2','Day3','Day4','Day5'],
        datasets: [{
            label: 'NIFTY(NSE)',
            data: [10,15,5,8,18],
            borderColor: 'grey',
            //backgroundColor: '#5e6c75',
            backgroundColor: '#00ff00',
        }]
    },
    options : {}
});
            //Graph2

var ctx=document.getElementById("myChart2").getContext('2d');
var chart =new Chart(ctx,{
    type: 'line',

    data:{
        labels:['Day1','Day2','Day3','Day4','Day5'],
        datasets: [{
            label: 'SENSEX(DSE)',
            data: [28,20,15,22,18],
            borderColor: 'grey',
            backgroundColor: '#00e600'
        }]
    },
    options : {}
});

            //Graph3

            var ctx=document.getElementById("myChart3").getContext('2d');
            var chart =new Chart(ctx,{
                type: 'line',
            
                data:{
                    labels:['Day1','Day2','Day3','Day4','Day5'],
                    datasets: [{
                        label: 'TCS',
                        data: [18,9,15,22,24],
                        borderColor: 'grey',
                        backgroundColor: '#00cc00'
                    }]
                },
                options : {}
            });

