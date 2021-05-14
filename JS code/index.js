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
    "AMD":"AMD",
    "Reliance":"RELI",
    "Amazon":"AMZN",
    "Alibaba Group":"BABA",
    "Visa":"V",
    "JP Morgan Chase":"JPM",
    "Johnson & Johnson":"JNJ",
    "Walmart Inc.":"WMT",
    "UnitedHealth Group Incorporated":"UNH",
    "Mastercard Incorporated":"MA",
    "Bank of America":"BAC",
    "NVIDIA":"NVDA",
    "Walt Disney":"DIS",
    "PayPal Holdings":"PYPL",
    "Coca-Cola Company":"KO",
    "Adobe Inc.":"ADBE",
    "Oracle Corporation":"ORCL",
    "Cisco Systems":"CSCO",
    "Pfizer":"PFE",
    "Nike":"NKE",
    "Toyota Motors":"TM",
    "Chevron Corporation":"CVX",
    "PepsiCo":"PEP",
    "United Parcel Service":"UPS",
    "McDonald's Corporation":"MCD",
    "Unilever PLC":"UL",
    "StarBucks Corporation":"SBUX",
    "HDFC Bank Limited":"HDB",
    "American Tower Corporation":"AMT",
    "Colgate-Palmolive Company":"CL",
    "fuck":"bahi"

}

// hide_overlay();


function preloadFunc()
{   

    hide_overlay();
    hide_loading_animation();
    $('.c-button').hide();
    // $('#alert-box').hide();
    $('#buy-box').hide()
    $('#payment').hide()
    $('#payment-complete').hide()

    window.company=company_t;
    window.final_company=company_t;

    $('#overlay').css({
        visibility:"visible",
    })


    
}
window.onpaint = preloadFunc();

const api_key="IKA4T7MP6LW4SQQO";
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

$(document).ready(function(){

    

    window.stockSearch = localStorage.getItem("stockSearch");

    // $('#inp').val(stockSearch);
    document.getElementById("inp").value=stockSearch;
    time_range="TIME_SERIES_WEEKLY";
    loop=5;
    time_type="Weekly Time Series";

    $('#s1').click();
    // $('#inp').focus();
    // $('#inp').focusout();

    $('#inp').css({
        color:"white"
    })

})



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
            backgroundColor:"transparent",
            color:"white",
            borderRadius: '0px',
            
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



$('#inp, #inp2').keyup(function(e){
    //every time a key is up in search box
    //this functio will update suggestion list
    console.log(e)
    var w = e["target"]["id"] == "inp" ? 0 : 1;
    
    if(w){
        $('.res-list1').empty();
    }
    else{
        $('.res-list').empty();
    }
    


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

    if(w){
        for(let i=0; i<temp.length; i++){
            li = document.createElement('LI')
            li.innerText=temp[i];
            $(li).appendTo('.res-list1')
            res_size1();
        }
    }
    else{
        for(let i=0; i<temp.length; i++){
            li = document.createElement('LI')
            li.innerText=temp[i];
            $(li).appendTo('.res-list')
            res_size();
        }
    }
    

    
    
    
    
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
        "min-height":"250px",
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

    this.style.backgroundColor="#0b4279" //changing color to clicked time-range
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







function get_data(e){
    console.log(e["id"])

    //this will be used to close nav
    $('.nav-link').toggleClass('nav-active')
    $('.line1').toggleClass('l1')
    $('.line2').toggleClass('l2')
    $('.line3').toggleClass('l3')
    if(t == true){
        t = false
    }else{
        t = true
    }


    let w = e["id"] == "s1" ? 1 : 0; 

    let c;
    
    if(w){
        c = $('#inp').val().trim();
        console.log(c)
    }
    else{
        c = $('#inp2').val().trim();
        console.log(c)
    }

    if(final_company[c] == undefined){
        //if user have not searched any company just return
        console.log(final_company)
        console.log(final_company[c])
        $('#alert-box p').text("Please enter a valid company name")
        show_overlay();
        return;
    }

    if(window.time_range == undefined){
        //if time range no selected alert user
        $('#alert-box p').text("Please choose a time range")
        show_overlay();
        return;
    }

    


    //this function will be used to get company infomation
    $.getJSON("https://www.alphavantage.co/query?function=OVERVIEW&symbol="+final_company[c]+"&apikey="+"DLDFRT3OS2GC4CS9")
    .done(function(data){

        
        if(data["Note"] != undefined || data["Information"] != undefined){
            console.log(data)
            $('#overlay div p').text("The key is used maximum time \nplease change the key")
            show_overlay();
            return;
        }

        show_loading_animation();

        console.log(w)

        if(w){
            //removing previous company info
            $('.info:nth-child(1)').remove()
            let div = document.createElement('div');//creating new div for new company info
            $(div).attr("class","info");

            //and putting all data of new company in div
            $("<h2>"+data["Name"]+"</h2><br>").appendTo(div);
            $("<h3>"+data["Symbol"]+"</h3><br>").appendTo(div);
            $("<h3>Asset Type</h3>"+data["AssetType"]+"<br><br>").appendTo(div);
            $("<h3>Exchange</h3>"+data["Exchange"]+"<br><br>").appendTo(div);
            $("<h3>Currency</h3>"+data["Currency"]+"<br><br>").appendTo(div);
            $("<h3>Country</h3>"+data["Country"]+"<br><br>").appendTo(div);
            $("<h3>Sector</h3>"+data["Sector"]+"<br><br>").appendTo(div);
            $("<h3>Industry</h3>"+data["Industry"]+"<br><br>").appendTo(div);
            $("<h3>Address</h3>"+data["Address"]+"<br><br>").appendTo(div);
            $("<h3>Description</h3><p>"+data["Description"]+"</p><br>").appendTo(div);
            $(div).prependTo($('#info-box'))
            //prepending div to info-box
        }
        else{

            $('.info:nth-child(2)').remove();//removing the second child element from info box
            let div2 = document.createElement('div');
            $(div2).attr("class","info")
            $("<h2>"+data["Name"]+"</h2><br>").appendTo(div2);
            $("<h3>"+data["Symbol"]+"</h3><br>").appendTo(div2);
            $("<h3>Asset Type</h3>"+data["AssetType"]+"<br><br>").appendTo(div2);
            $("<h3>Exchange</h3>"+data["Exchange"]+"<br><br>").appendTo(div2);
            $("<h3>Currency</h3>"+data["Currency"]+"<br><br>").appendTo(div2);
            $("<h3>Country</h3>"+data["Country"]+"<br><br>").appendTo(div2);
            $("<h3>Sector</h3>"+data["Sector"]+"<br><br>").appendTo(div2);
            $("<h3>Industry</h3>"+data["Industry"]+"<br><br>").appendTo(div2);
            $("<h3>Address</h3>"+data["Address"]+"<br><br>").appendTo(div2);
            $("<h3>Description</h3><p>"+data["Description"]+"</p><br>").appendTo(div2);
            $(div2).appendTo($('#info-box'))
        }

  

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

        open_high=[]

        // console.log(c_data)
        
        for(i in c_data){
            if(k == 0){
                open_high.push(c_data[i]["2. high"])
                open_high.push(c_data[i]["3. low"])
                open_high.push(c_data[i]["1. open"])
                open_high.push(c_data[i]["4. close"])
                open_high.push(c_data[i]["5. volume"])
            }
            if(k==loop){ //only getting loop amount of data 
                break;
            }

            l.push(i)//here pushing label-data in lable
            d.push(c_data[i]["4. close"]);

            k+=1;
        }

        set_open_high(open_high,w);
        
        l.reverse();
        // console.log(l)
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
        

        hide_loading_animation();
        if(window.ctx == undefined){
            //if ctx is not defined put the graph 
            put_chart(l,d,name);
        }
        else{
            //else update the graph
            if(w){
                update_chart(l,d,name,w);
                $('#info-box').animate({scrollLeft:0}, 300);
                $('.c-button').text('›');
                $('.c-button').css({
                    color:"white",
                })
            }
            else{

                update_chart(l,d,name,w);
                $('#info-box').animate({scrollLeft:$('#info-box').width()+5}, 300);
                $('.com-2').animate({scrollLeft:$('.com-2').width()}, 350);
                $('.c-button').show()
                $('.c-button').text('‹');
                $('.c-button').css({
                    color:"#0b4279",
                })


            }
            
        }
        

    })
    .fail(function(textStatus, error){
        alert(textStatus+" "+error+"\nReload the page");
    })

}


function put_chart(l,d,name1){
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
                label: name1,
                backgroundColor: '#517BE2',
                borderColor: '#5cdb95',
                data:d,
                
            },{
                label:"",
                borderColor:'red',
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

// put_chart();


function update_chart(l,d,name,w){
    //this function will be used to update data on chart
    

    if(w){
        chart.data.labels = l;
        chart.data.datasets[0].data= d;
        chart.data.datasets[0].label=name;
        
    }
    else{
        chart.data.labels = l;
        chart.data.datasets[1].data= d;
        chart.data.datasets[1].label=name;
        chart.data.datasets[0].backgroundColor="rgba(0,0,0,0.3)";
        chart.data.datasets[0].borderColor="green";
    }
    

    // chart.data.datasets[0].borderColor='rgba('+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")";
    // chart.data.datasets[0].backgroundColor='rgba('+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")";

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
    
}


//compare stock functions
function set_open_high(arr,w){
    //This function is setting data_points(open/high..) is card
    // console.log($('#t1 .data_point').children());
    // console.log($('#t2 .data_point').children());
    // console.log($('.data_point').children());
    let x;
    if(w){
        x = $('#t1 .data_point').children()["prevObject"];
        $('.com-1 h2').text($('#inp').val())
    }
    else{
        x = $('#t2 .data_point').children()["prevObject"];
        $('.com-22 h2').text($('#inp2').val())
    }

    for(let i=0; i<5; i++){
        x[i]["innerHTML"]="<b>$"+arr[i]+"</b>";
    }

    

    
}

// set_open_high()


$('#inp2').focus(function(){
    //input focus
    res_size1()
    $('.res1').css({
        display:'block',
        border: '1px solid grey',
    })
    $('.res-list1').css({
        display:'block',
    })
})
$('#inp2').focusout(function(){
    //input focusout
    setTimeout(function(){
        $('.res1').css({
            display:'none',
            border: 'none'
        })
        $('.res-list1').css({
           display:'none',
        })
    },300)
    //the suggestion box will hide after 0.3s
    //of off focus on input
    
})

//This function will set size of small box with search 
//suggestion in compare stock
function res_size1(){
    //this function is to update the height
    //of res box and the res-list change
    $('.res1').css({
        "min-height":'200px',
        //here 45 is height of one res element (li)
    })
}
$(document).on("click",'.res-list1 li',function(){
    //This function will listen to click li element in result
    //and extract its text and put in search field
    $('#inp2').val(this.innerText)

})

//Function to control scroll on button click
$('.c-button').click(function(){
    console.log(this)
    console.log($(this).parent()[0]["id"]);

    let which = $(this).parent()[0]["id"] == "scroll-div1" ? 1 : 0;
    let pwidth = $(this).parent().width()+1;
    
    if(which){
        if($(this).text() == '›'){
            $('#info-box').animate({scrollLeft:pwidth}, 300 );
            $(this).css({
                color: "#0b4279",
            });
            $(this).text('‹')
        }
        else{
            $('#info-box').animate({scrollLeft:0}, 300);
            $(this).css({
                color: "white",
            });
            $(this).text('›')
        }
    }
    else{
        if($(this).text() == '›'){
            $('.com-2').animate({scrollLeft:pwidth}, 350);
            $(this).css({
                color: "#0b4279",
            });
            $(this).text('‹')
        }
        else{
            $('.com-2').animate({scrollLeft:0}, 350);
            $(this).css({
                color: "white",
            });
            $(this).text('›')
        }
    }  
});


//Buy section 
$('#buy').click(function(){
    $('#alert-box').hide();
    $('#buy-box').show();
    $('#payment').hide();

    $($('#c-list').children()[0]).text($($('.info:nth-child(1)').children()[0]).text());

    if($($('.info:nth-child(2)').children()[0]).text() == ""){
        $($('#c-list').children()[1]).hide();
    }
    else{
        $($('#c-list').children()[1]).show();
        $($('#c-list').children()[1]).text($($('.info:nth-child(2)').children()[0]).text());
    }
    

    show_overlay();
    
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

$('#c-list div').click(function(){
    $('#payment h3').text($(this).text())
    $('#buy-box').hide();
    $('#payment').show();
})
$('#share').change(function(){
    let a = $(this).val();
    console.log(a);

    if(!a==""){
        let l = $('#payment h3').text().length;
        let t_amount = (a*(13.33+l)).toFixed(2);
        $('#amt b i').text("$"+t_amount);
    }
    else{
        $('#amt b i').text("$0.00");
    }
})
$('#share').keyup(function(){
    let a = $(this).val();
    console.log(a);

    if(!a==""){
        let l = $('#payment h3').text().length;
        let t_amount = (a*(13.33+l)).toFixed(2);
        $('#amt b i').text("$"+t_amount);
    }
    else{
        $('#amt b i').text("$0.00");
    }
})

$('#payment-form button').click(function(){
    $('#buy-box').hide();
    $('#payment').hide();
    $('#payment-complete').show()

})
$('#payment-complete button').click(function(){
    $('#overlay').hide()
    $('#payment-complete').hide()
    $('#alert-box').show()
})
