var database ={
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
        };


if(localStorage.getItem("loginData") == null){
    localStorage.setItem("loginData", JSON.stringify(database));
}

