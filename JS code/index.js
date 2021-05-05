window.company_t = {
    //popular company list
    "Microsoft":"MSFT",
    "Apple":"AAPL",
    "Google":"GOOGL",
    "Netflix":"NFLX",
    "Adobe":"ADBE",
    "Tesla":"TSLA",
    "Facebook":"FB",
    "Intel":"INTC",
    "Zoom video":"ZM",
    "Amd":"AMD",
    "Reliance":"RELI",
}

hide_overlay();
// hide_loading_animation();

window.company=company_t;
window.final_company=company_t;


const api_key="K8OUKTRAB4ZCGXV9";
const search_key="2Y7TYXX29G2ZODZS"
/*
Api keys
K8OUKTRAB4ZCGXV9
DLDFRT3OS2GC4CS9
IKA4T7MP6LW4SQQO
2Y7TYXX29G2ZODZS
RZK00R0YIOTNFTPY
QPOUSNBCLNPRRT4I
*/


let t = false;
$('.burger').click(function(){
    $('.nav-link').toggleClass('nav-active')
    $('.line1').toggleClass('l1')
    $('.line2').toggleClass('l2')
    $('.line3').toggleClass('l3')
    if(t == true){
        t = false
    }else{
        t = true
    }
    
})
$('main').click(function(){
    //when main is clicked remove burger menu
    if(t == true){
        $('.nav-link').toggleClass('nav-active')
        $('.line1').toggleClass('l1')
        $('.line2').toggleClass('l2')
        $('.line3').toggleClass('l3')
        t = false;
    }

    
})
 

$('#inp').focus(function(){
    //input focus
    res_size()
    $('#inp').css({
        backgroundColor:"white",
        color:"black",
        borderRadius: '10px 10px 0px 0px',
        color:"gray"
    })
    $('.res').css({
        display:'block',
        border: '1px solid grey',
    })
    $('.res-list').css({
        display:'block',
    })
})
$('#inp').focusout(function(){
    //input focusout
    setTimeout(function(){
        $('#inp').css({
            backgroundColor:"rgb(219, 123, 33)",
            color:"white",
            borderRadius: '10px',
            color:"whitesmoke"
            
        })
        $('.res').css({
            display:'none',
            border: 'none'
        })
        $('.res-list').css({
           display:'none',
        })
    },300)
    //the suggestion box will hide after 0.3s
    //of off focus on input
    
})

//https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo

function get_keyword_search_result(){
    
    console.log($('#inp').val())
    $.getJSON("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+$('#inp').val()+"&apikey="+search_key)
    .done(function(data){

        console.log("Searched")

        obj = data.bestMatches
        // console.log(obj)
        // console.log(obj["2. name"])

        if (obj == undefined) return;
        if (obj == {}) return;

        company={};

        
        //return function if obj length is == 0

        let k = (Object.keys(obj).length < 8 ) ? Object.keys(obj).length : 8;
        //setting searh list to 10 if search list is greater than 10

        for(let i=0; i< k ; i++){
            // console.log(obj[i]["2. name"]+" = "+obj[i]["1. symbol"])
            if(obj[i]["2. name"].length > 20) continue;
            company[obj[i]["2. name"]] = obj[i]["1. symbol"]
        }

        

    })
    .fail(function(textStatus, error){
        alert(textStatus+" "+error+"\nReload the page");
    })

    return company;
}



$('#inp').keyup(function(){
    //every time a key is up in search box
    //this functio will update suggestion list
    $('.res-list').empty();


    window.final_company = company;
    // company = get_keyword_search_result()

    company={}


    for(i in company_t){
        //here searching in company_t and appending in company
        if(i.search($(this).val().charAt(0).toUpperCase()+$(this).val().slice(1)) >= 0){
            company[i] = company_t[i]
        }
    }
    
    // console.log(company)
    
    let temp = Object.keys(company)

    for(let i=0; i<temp.length; i++){
        li = document.createElement('LI')
        li.innerText=temp[i];
        $(li).appendTo('.res-list')
    }

    res_size();
    
    
    
})

$(document).on("click",'.res-list li',function(){
    //This function will listen to click li element in result
    //and extract its text and put in search field
    console.log(this.innerText)
    console.log(final_company)
    $('#inp').val(this.innerText)

})

function res_size(){
    //this function is to update the height
    //of res box and the res-list change
    let temp = $('.res-list').children();
    $('.res').css({
        "min-height":45*temp.length+'px',
        //here 45 is height of one res element (li)
    })
}


$('.time-range li').click(function(){
    //this event will listen to which time-range user want to see graph

    for(let i=0; i<5; i++){
        //this loop is to change color of box which contain time range
        //those time-range that are not selected
        $('.time-range').children()[i].style.backgroundColor="white";
        $('.time-range').children()[i].style.color="black";
    }

    let inp = this.innerText;//getting time-range that user is clicked

    this.style.backgroundColor="rgb(219, 123, 33)" //changing color to clicked time-range
    this.style.color="white"

    window.time_range = "";//declaring some global function that will be used in get data function
    window.loop=0;
    window.time_type="";

    //setting time-range accoring to user have clicked 
    //that will be passed in url to get relevant data(json)
    if(inp == '1D'){
        time_range="TIME_SERIES_INTRADAY";
        loop = 10;
        time_type="Time Series (5min)";
        
    }
    else if(inp == '1W'){
        time_range="TIME_SERIES_DAILY";
        loop=7;
        time_type="Time Series (Daily)";
    }
    else if(inp == '1M'){
        time_range="TIME_SERIES_WEEKLY";
        loop=5;
        time_type="Weekly Time Series";
    }
    else if(inp == '1Y'){
        time_range="TIME_SERIES_MONTHLY";
        loop=12;
        time_type="Monthly Time Series";
    }
    else{
        time_range="TIME_SERIES_MONTHLY";
        loop=60;
        time_type="Monthly Time Series";
    }



})

// $(document).ready(function(){
//     slide();
//     // get_data();
// });







function get_data(){
    
    let c = $(inp).val().trim();

    if(final_company[c] == undefined){
        //if user have not searched any company just return
        console.log(final_company)
        console.log(final_company[c])
        $('#overlay div p').text("Please enter a valid company name")
        show_overlay();
        return;
    }

    if(window.time_range == undefined){
        //if time range no selected alert user
        $('#overlay div p').text("Please choose a time range")
        show_overlay();
        return;
    }

    


    //this function will be used to get company infomation
    $.getJSON("https://www.alphavantage.co/query?function=OVERVIEW&symbol="+final_company[c]+"&apikey="+api_key)
    .done(function(data){

        
        if(data["Note"] != undefined || data["Information"] != undefined){
            console.log(data)
            $('#overlay div p').text("The key is used maximum time \nplease change the key")
            show_overlay();
            return;
        }

        show_loading_animation();

        //removing previous company info
        $('.chart-info').remove();
        let div = document.createElement('div');//creating new div for new company info
        $(div).attr("class","chart-info boxShadow");

        //and putting all data of new company in div
        $("<h2>"+data["Name"]+"</h2><hr><br>").appendTo(div);
        $("<h3>"+data["Symbol"]+"</h3><br>").appendTo(div);
        $("<h3>Asset Type</h3>"+data["AssetType"]+"<br><br>").appendTo(div);
        $("<h3>Exchange</h3>"+data["Exchange"]+"<br><br>").appendTo(div);
        $("<h3>Currency</h3>"+data["Currency"]+"<br><br>").appendTo(div);
        $("<h3>Country</h3>"+data["Country"]+"<br><br>").appendTo(div);
        $("<h3>Sector</h3>"+data["Sector"]+"<br><br>").appendTo(div);
        $("<h3>Industry</h3>"+data["Industry"]+"<br><br>").appendTo(div);
        $("<h3>Address</h3>"+data["Address"]+"<br><br>").appendTo(div);
        $("<h3>Description</h3><p>"+data["Description"]+"</p><br>").appendTo(div);


        $(div).prependTo($('#main'))//prepending div to main

        // console.log($('chart-info').children())
  

    })
    .fail(function(textStatus, error){
        alert(textStatus+" "+error+"\nReload the page");
    })


    let l=[],d=[];
    //l containt labels, and d contain data points 
    let url="";

    //changing url according to time range has been selected 
    if(time_range == "TIME_SERIES_INTRADAY"){
        //intraday have slightly differnt url so we have to change url according to that
        url="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+final_company[c]+"&interval=5min&apikey="+api_key;
    }
    else{
        //rest time range work through same url
        url="https://www.alphavantage.co/query?function="+time_range+"&symbol="+final_company[c]+"&outputsize=full&apikey="+api_key;
    }

    $.getJSON(url)
    .done(function(data){
        //this funciton will fetch data and label that will be shown on graph
        console.log(data)
        let c_data = data[time_type];
        

        let k=0;
        for(i in c_data){
            if(k==loop){ //only getting loop amount of data 
                break;
            }
            l.push(i)//here pushing label-data in lable
            for(j in c_data[i]){
                d.push(c_data[i][j]);//here putting open price of that day
                break;
            }
            k+=1;
        }
        l.reverse();
        console.log(l)
        d.reverse();

        if(time_range == "TIME_SERIES_INTRADAY"){
            //if time-range is intraday we have to trim label 
            //because lable are too long

            for(let i=0; i<l.length; i++){
                temp = l[i].split(" ")[1].split(":");
                l[i] = temp[0]+":"+temp[1];
            }
  
        }
        else if(time_range == "TIME_SERIES_MONTHLY" && l.length==60){

            for(let i=0; i<l.length; i++){
                l[i] =  l[i].split("-")[0]
                
            }
        }

        console.log(l)

        if(data["Note"] != undefined || data["Information"] != undefined){
            $('#overlay div p').text("The key is used maximum time \nplease change the key")
            show_overlay();
            return;

        }

        let name = data["Meta Data"]["2. Symbol"];//getting name of stock

        console.log(data)
        


        if(window.ctx == undefined){
            //if ctx is not defined put the graph 
            put_chart(l,d,name);
        }
        else{
            //else update the graph
            update_chart(l,d,name);
        }
        

    })
    .fail(function(textStatus, error){
        alert(textStatus+" "+error+"\nReload the page");
    })

}


function put_chart(l,d,name){
    //this function will put chart
    hide_loading_animation();

    ctx = document.getElementById('myChart').getContext('2d');
    
    window.chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            
            labels: l,
            datasets: [{
                label: name,
                backgroundColor: 'rgb(40, 148, 58)',
                borderColor: 'orange',
                data: d,
                
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Stock price In $'
                    }
                    
                }],
                xAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    ticks: {
                        autoSkip:true,
                        maxTicksLimit:4,
                        major: {
                            fontStyle: 'bold',
                            fontColor: 'black'
                        }
                    }
                }]
            }
        },

        
    });

    


}


function update_chart(l,d,name){
    //this function will be used to update data on chart
    hide_loading_animation();
    chart.data.labels = l;
    chart.data.datasets[0].data= d;
    chart.data.datasets[0].label=name;
    chart.data.datasets[0].borderColor='rgba('+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")";
    chart.data.datasets[0].backgroundColor='rgba('+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")";

    chart.update();

}



//------------------------------------------------------------------
//overlay functions
function hide_overlay(){
    $('#overlay').hide();
    $('body').css({
        'overflow':'scroll',
    })
}

function show_loading_animation(){
    $('#chart-overlay').show()
}

function hide_loading_animation(){
    $('#chart-overlay').hide()
}

function show_overlay(){
    $(window).scrollTop(0);
    $('#overlay').show()
    stop_scroll();
}

function stop_scroll(){
    $('body').css({
        'overflow':'hidden',
    });
}