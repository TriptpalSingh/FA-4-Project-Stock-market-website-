var database ={
            "data":[
                {
                    "email":"admin",
                    "password":"admin",
                    "f_name":"admin",
                    "l_name":"",
                },
                {
                    "email":"triptpalsingh@gmail.com",
                    "password":"1234Tript@",
                    "f_name":"Triptpal",
                    "l_name":"Singh"
                }
            ]
        };



if(localStorage.getItem("loginData") == null){
    localStorage.setItem("loginData", JSON.stringify(database));
}

