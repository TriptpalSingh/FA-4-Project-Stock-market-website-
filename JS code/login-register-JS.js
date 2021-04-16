var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d')
var particalsArray = [];
var hue = 0; 

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var loginInfo = {
    email: "testmail@gmail.com",
    password: "1234test"
}


var mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("mousemove", coordinates);

class partical{
    constructor(){
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 9 +1;
        this.speedX = Math.random() * 3 -1.5;
        this.speedY = Math.random() * 3 -1.5;
        // this.color = "rgb("+Math.random()* 255+","+Math.random()* 255+","+Math.random()* 255+")";
        this.color = "rgb(18, 58, 58)"
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
    // for(var i=0; i<2;i++){
    //     particalsArray.push(new partical());
    // }
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
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fill();
    particalHandler();
    hue++;
    requestAnimationFrame(animate);
}
animate();


$("document").ready(function(){
    var login_btn = $("#l_b");
    var register_btn = $("#su_b");
    $(login_btn).click(function(){
        var register_div = document.getElementById("register_form");
        var login_div = document.getElementById("login_form");
        register_div.style.transform = "translate(0px, -400px)"
        login_div.style.transform = "translate(0px, -560px)"
    });
    $(register_btn).click(function(){
        var register_div = document.getElementById("register_form");
        var login_div = document.getElementById("login_form");
        register_div.style.transform = "translate(0px, 0px)"
        login_div.style.transform = "translate(0px, -100px)"
    });
});