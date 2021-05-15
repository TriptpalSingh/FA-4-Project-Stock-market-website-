var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var particalsArray = [];
var hue = 0;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var loginInfo = {
    "data":[
        {
            "email":"admin",
            "password":"admin"
        },
        {
            "email":"triptpalsingh@gmail.com",
            "password":"1234Tript@"
        }
    ]
}

var mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("mousemove", coordinates);

class partical{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 9 +1;
        this.speedX = Math.random() * 3 -1.5;
        this.speedY = Math.random() * 3 -1.5;
        this.color = "#05386B"
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        // if(this.size>0.2){
        //     this.size -= 0.1;
        // }
    }

    check(){
        if(this.x >= canvas.width || this.x <= 0){
            this.speedX = -this.speedX;
        }
        if(this.y >= canvas.height || this.y <= 0){
            this.speedY = -this.speedY;
        }
    }

    draw(){

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}


for(var i=0; i<100;i++){
    particalsArray[i] = new partical();
}

function coordinates(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
}

function particalHandler(){
    for(var i=0; i<particalsArray.length;i++){
        particalsArray[i].update();
        particalsArray[i].check();
        particalsArray[i].draw();

        for(var j=i;j<particalsArray.length;j++){
            const dx = particalsArray[i].x - particalsArray[j].x;
            const dy = particalsArray[i].y - particalsArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);

            if(distance<100){
                ctx.beginPath();
                ctx.strokeStyle = particalsArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particalsArray[i].x,particalsArray[i].y);
                ctx.lineTo(particalsArray[j].x,particalsArray[j].y);
                ctx.stroke();
            }
        }

        if(particalsArray[i].size<=0.2){
            particalsArray.splice(i,1);
            i--;
        }
    }
}

function animate(){
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fill();
    particalHandler();
    hue++;
    requestAnimationFrame(animate);
}
animate();

function submitIt(){
    var logindata = localStorage.getItem("loginData");
    var cred = JSON.parse(logindata);
    var em = document.getElementById("register_email").value;
    var pass = document.getElementById("register_pass").value;
    if(em == ""){
        return true;
    }
    for(var i=0;i<cred.data.length;i++){
        if(em == cred.data[i].email){
            alert("the email is already in use.");
            return false;
        }
    }
    cred.data.push({
        email:em,
        password:pass
    })
    localStorage.setItem("loginData",JSON.stringify(cred));
    return true;
}


$("document").ready(function(){
    var namereg = /[^A-Za-z]/;
    var emailreg = /^\w+\@+([*a-z])+\.+([a-z]{3})$/;
    var passreg = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%\^\&\*])(?=.{8,})/;


    var login_btn = $("#l_b");
    var register_btn = $("#su_b");
    var signupbtn = document.getElementById("signupbtn");
    var loginbtn = document.getElementById("loginbtn");
    var firstName = document.getElementById("f_name");
    var lastName = document.getElementById("l_name");
    var registerEmail = document.getElementById("register_email");
    var registerPass = document.getElementById("register_pass");
    var confirmPass = document.getElementById("confirm_pass");  
    var login_email = document.getElementById("login_email");
    var login_pass = document.getElementById("login_pass");

    if(localStorage.getItem("loginData") == null){
        alert("please uncomment the last script tag for one run of the code for making the local storage, otherwise this page will not function properly.")
    }


    // hint toggle
    {
        $(firstName).focus(function(){
            $("#f_name_hint").slideDown(300);
        })
        $(firstName).focusout(function(){
            $("#f_name_hint").slideUp(300);
        })

        $(lastName).focus(function(){
            $("#l_name_hint").slideDown(300);
        })
        $(lastName).focusout(function(){
            $("#l_name_hint").slideUp(300);
        })

        $(registerEmail).focus(function(){
            $("#email_hint").slideDown(300);
        })
        $(registerEmail).focusout(function(){
            $("#email_hint").slideUp(300);
        })

        $(registerPass).focus(function(){
            $("#pass_hint").slideDown(300);
            $("#confirm_pass").css("margin-top","0px"); 
        })
        $(registerPass).focusout(function(){
            $("#pass_hint").slideUp(300);
            $("#confirm_pass").css("margin-top","30px"); 
        })

        $(confirmPass).focus(function(){
            $("#confirm_pass_hint").slideDown(300);
               
        })
        $(confirmPass).focusout(function(){
            $("#confirm_pass_hint").slideUp(300);
        })





    }
    





    function check_signup_credentials(){
        let f_name_flag = false;
        let l_name_flag = false;
        let register_email_flag = false;
        let register_pass_flag = false;
        let confirm_pass_flag = false;

        let f_name_val = firstName.value;
        let l_name_val = lastName.value;
        let register_email_val = registerEmail.value;
        let register_pass_val = registerPass.value;
        let confirm_pass_val = confirmPass.value;
        
        if(!namereg.test(f_name_val)){
                f_name_flag = true;
                // alert(" fname success!!");
            }
        if(f_name_val !== ""){
            
        }
        if(l_name_val !== ""){
            if(!namereg.test(l_name_val)){
                l_name_flag = true;
                // alert("lname success!!");
            }
        }
        if(emailreg.test(register_email_val)){
            register_email_flag = true;
            // alert("email success!!");
        }
        if(passreg.test(register_pass_val)){
            register_pass_flag = true;
            // alert("pass success!!");
        }
        if(register_pass_val !== ""){
            if(confirm_pass_val == register_pass_val){
                confirm_pass_flag = true;
                // alert("confirm pass success!")
            }
        }

        if(f_name_flag && l_name_flag && register_email_flag && register_pass_flag && confirm_pass_flag){
            signupbtn.disabled = false;
            // alert("sucees");
        }else{
            signupbtn.disabled = true;
        }
        
        
    }

    function check_login_credentials(){
        var login_email_flag = false;
        var login_pass_flag = false;

        var login_email_val = login_email.value;
        var login_pass_val = login_pass.value;

        var logindata = localStorage.getItem("loginData");
        var cred = JSON.parse(logindata);

        for(var i=0; i<cred.data.length;i++){
            var check_email = cred.data[i].email;
            var check_pass = cred.data[i].password;
            if(login_email_val == check_email){
                login_email_flag = true;
            }
            if(login_pass_val == check_pass){
                login_pass_flag = true;
            }
        }
        if(login_email_flag && login_pass_flag){
            loginbtn.disabled = false;
        }
        if(!(login_email_flag && login_pass_flag)){
            loginbtn.disabled = true;
        }
    }

    var signup_function;
    var login_function;
    signup_function = setInterval(check_signup_credentials,500);
    
    $(login_btn).click(function(){
        clearInterval(signup_function);
        login_function = setInterval(check_login_credentials,500);


        var register_div = document.getElementById("register_form");
        var login_div = document.getElementById("login_form");
        register_div.style.transform = "translate(0px, -430px)"
        login_div.style.transform = "translate(0px, -720px)"
        // button.value="LOGIN";
        signupbtn.style.transform= "translate(0px,-60px)";
        loginbtn.style.transform= "translate(0px,-70px)";
        document.getElementById("l_b").style.backgroundImage="linear-gradient(to right,#557A95,#05386B)"
        document.getElementById("su_b").style.backgroundImage="linear-gradient(to right,#05386B,#05386B)";
    });
    $(register_btn).click(function(){
        clearInterval(login_function)
        signup_function = setInterval(check_signup_credentials,500);


        var register_div = document.getElementById("register_form");
        var login_div = document.getElementById("login_form");
        register_div.style.transform = "translate(0px, 0px)"
        login_div.style.transform = "translate(0px, -250px)"
        // button.value="SIGNUP";
        signupbtn.style.transform= "translate(0px,0px)";
        loginbtn.style.transform= "translate(0px, 40px)";
        document.getElementById("l_b").style.backgroundImage="linear-gradient(to right,#05386B,#05386B)";
        document.getElementById("su_b").style.backgroundImage="linear-gradient(to left,#557A95,#05386B)";

        
        
        
    });
    
});


