function changedonor(value) {
    console.log(value);
    if (value === "1") {
        console.log(value);
        document.getElementById("donor").style.display = "block";
    }
    else if(value === "2" || value === "3") {
        document.getElementById("donor").style.display = "none";
    }
}
    var setCookie=function (cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    var getCookie=function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
function checksignup() {
    document.getElementById("errors").innerHTML = "";
    var selector = document.getElementById("selector").value;
    Number(selector);
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var location = document.getElementById("pac-input").value;
    var address = document.getElementById("address").value;
    var pass = document.getElementById("pass").value;
    var cpass = document.getElementById("cpass").value;
    if (selector === "1") {
        var age = document.getElementById("age").value;
        var weight = document.getElementById("weight").value;
        var bg = document.getElementById("bg").value;
        var pf = document.getElementById("pf").value;
        var gender = document.getElementById("gender").value;
        if (name.length < 2) {
            document.getElementById("errors").innerHTML = "*Invalid Name";
        }
        else if (email.length < 6) {
            document.getElementById("errors").innerHTML = "*Invalid Email";
        }
        else if (phone.length !== 10) {
            document.getElementById("errors").innerHTML = "*Invalid Mobile number";
        }
        else if (pass.length < 8) {
            document.getElementById("errors").innerHTML = "*Password should be atleast 8 characters long";
        }
        else if (pass !== cpass) {
            document.getElementById("errors").innerHTML = "*Passwords mismatch";
        }
        else if (location.length < 2) {
            document.getElementById("errors").innerHTML = "*Invalid Location";
        }
        else if (address.length < 2) {
            document.getElementById("errors").innerHTML = "*Invalid Location";
        }
        else if (age < 18) {
            document.getElementById("errors").innerHTML = "*Age should be greater than 18";
        }
        else if (weight < 50) {
            document.getElementById("errors").innerHTML = "*Weight should be greater than 50";
        }
        else if (bg === "") {
            document.getElementById("errors").innerHTML = "*Select Blood group";
        }
        else if (pf === "") {
            document.getElementById("errors").innerHTML = "*Select Preference";
        }
        else if (gender === "") {
            document.getElementById("errors").innerHTML = "*Select Gender";
        }
        else
            submitsignup();
    }
    else {
        if (name.length < 2) {
            document.getElementById("errors").innerHTML = "*Invalid Name";
        }
        else if (email.length < 6) {
            document.getElementById("errors").innerHTML = "*Invalid Email";
        }
        else if (phone.length !== 10) {
            document.getElementById("errors").innerHTML = "*Invalid Mobile number";
        }
        else if (pass.length < 8) {
            document.getElementById("errors").innerHTML = "*Password should be atleast 8 characters long";
        }
        else if (pass !== cpass) {
            document.getElementById("errors").innerHTML = "*Passwords mismatch";
        }
        else if (location.length < 2) {
            document.getElementById("errors").innerHTML = "*Invalid Location";
        }
        else if (address.length < 2) {
            document.getElementById("errors").innerHTML = "*Invalid Location";
        }
        else {
            submitsignup();
        }
    }
}
function submitsignup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var location = document.getElementById("pac-input").value;
    var pass = document.getElementById("pass").value;
    var address = document.getElementById("address").value;
    var donor = {};
    donor.name = name;
    donor.email = email;
    donor.phone = phone;
    donor.location = location;
    donor.password = pass;
    donor.address = address;
    var selector = Number(document.getElementById("selector").value);
    if(selector===1){
        var age = document.getElementById("age").value;
        var weight = document.getElementById("weight").value;
        var bg = Number(document.getElementById("bg").value);
        var pf = Number(document.getElementById("pf").value);
        var gender = Number(document.getElementById("gender").value);
        donor.age = age;
        donor.weight = weight;
        donor.bloodgroup = bg;
        donor.period = pf;
        donor.gender = gender;
    }
    var json = {};
    json.donor = donor;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.responseType='json';
    xmlhttp.open("POST", "http://192.168.137.230:1111/user/donor/register", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onload = function() {
        var status = this.status;
        console.log(status);
        console.log(this.response);
        if (status === 200) {
            document.getElementById("card").innerHTML = "<div class='text-center' style='margin-top:30px '><p>Sign Up success</p><a class=\"btn btn-default waves-effect waves-light\" >LogIn</a></div>";
        }
            else {
                document.getElementById("errors").innerHTML = "*Please try again.";
            }
        }
    console.log(json);
    xmlhttp.send(JSON.stringify(json));
}
function submitotp() {
    document.getElementById("resen").innerHTML ="";
    document.getElementById("errors").innerHTML = "";
    var otp = document.getElementById("otp").value;
    if(otp.length === 0){
        document.getElementById("errors").innerHTML = "*Please enter otp";
    }
    else{
        var json = {};
        json.otp = otp;
        json.email = getCookie('email');
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.responseType='json';
        xmlhttp.open("POST", "http://192.168.137.230:1111/user/donor/verify", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function() {
            var status = this.status;
            console.log(status);
            if (status === 200) {
               document.getElementById("card").innerHTML = "<div class='text-center'><p>Sign Up success</p><a class=\"btn btn-default waves-effect waves-light\" >LogIn</a></div>";
            }
            else {
                document.getElementById("errors").innerHTML = "*Please try again.";
            }
        }
        console.log(json);
        xmlhttp.send(JSON.stringify(json));
    }
}
function resend() {
    document.getElementById("resen").innerHTML ="";
    document.getElementById("errors").innerHTML = "";
    var json = {};
    json.email = getCookie('email');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.responseType='json';
    xmlhttp.open("POST", "http://192.168.137.230:1111/user/donor/resend", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onload = function() {
        var status = this.status;
        console.log(status);
        if (status === 200) {
            document.getElementById("resen").innerHTML = "Otp sent to registered email";
        }
        else {
            document.getElementById("errors").innerHTML = "*Please try again.";
        }
    }
    console.log(json);
    xmlhttp.send(JSON.stringify(json));
}
function submitlogin() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    if (email.length < 1 || pass.length < 1) {
        document.getElementById("errors").innerHTML = "*Enter all fields";
    }
    else {
        var json = {};
        json.email = email;
        json.password = pass;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.responseType = 'json';
        xmlhttp.open("POST", "http://192.168.137.230:1111/user/login", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function () {
            var status = this.status;
            console.log(status);
            console.log(this.response);
            if (status === 200) {
                var sevaganid = this.response.response.sevaganId;
                var type = this.response.response.type;
                setCookie('sevaganid', sevaganid, 1);
                setCookie('email',email,1);
                setCookie('type', type, 1);
                window.location.href = "index.html";
            }
            else {
                document.getElementById("errors").innerHTML = "*Please try again.";
            }
        }
        console.log(json);
        xmlhttp.send(JSON.stringify(json));
    }
}
function  checktype() {
    var type = Number(getCookie('type'));
    if(getCookie('email')===""||getCookie('email')==="NULL"||getCookie('email')===undefined) {
        document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
    }
    else{
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
    }
    if(type===3){
        document.getElementById("donate").style.display = "none";
    }else{
        document.getElementById("donate").style.display = "block";
    }
    enterdetail();
}
function submitrequest() {
    var bg = Number(document.getElementById("bg").value);
    var name = document.getElementById("name").value;
    var units = document.getElementById("units").value;
    var casetype =  Number(document.getElementById("case").value);
    var location = document.getElementById("pac-input").value;
    var phone = document.getElementById("phone").value;
    if(bg.length === 0){
        document.getElementById("errors").innerHTML = "*Select blood group";
    }else{
        var request = {};
        var json = {};
        json.phone = phone;
       request.bloodgroup = bg;
       request.patientname = name;
       request.unitrequired = units;
       request.casetype = casetype;
       request.location = location;
       request.sevaganId = getCookie('sevaganid');
       request.longitude = getCookie('lon');
        request.latitude = getCookie('lat');
        json.request = request;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.responseType = 'json';
        xmlhttp.open("POST", "http://192.168.137.230:1111/user/donor/request", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function () {
            var status = this.status;
            console.log(status);
            console.log(this.response);
            if (status === 200) {
               document.getElementById("success").innerHTML = "Request submitted successfully";
            }
            else {
                document.getElementById("errors").innerHTML = "*Please try again.";
            }
        }
        console.log(json);
        xmlhttp.send(JSON.stringify(json));
    };
}
function logout() {
            setCookie('email', "", 0);
            setCookie('sevaganid', "", 0);
            setCookie('type', "", 0);
            window.location.reload();
}
function enterdetail() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.responseType = 'json';
    xmlhttp.open("GET", "http://192.168.137.230:1111/user/get/request", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onload = function () {
        var status = this.status;
        console.log(status);
        console.log(this.response);
        var details = this.response.response;
        if (status === 200) {
            var data ="";
            for(x in details){
            data +="<div class='col-md-4'><div class='card' style='height: 200px;'><p class='text-center' style='font-size: 16px'>Patient Name : "+details[x].patientname+"<br><br>Units Required : "+details[x].unitrequired+"<br><br>Blood group : "+details[x].group+"<br><br>Location : "+details[x].location+"</p></div></div>";
            }
            document.getElementById("row").innerHTML = data;
        }
        else {
            document.getElementById("row").innerHTML = "<p class='text-center'>No requests found</p>";
        }
    }
    xmlhttp.send();
}
function  checkfood() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.responseType = 'json';
    xmlhttp.open("GET", "http://192.168.137.230:1111/user/get/food", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onload = function () {
        var status = this.status;
        console.log(status);
        console.log(this.response);
        var details = this.response.response;
        if (status === 200) {
            var data ="";
            for( x in details){
                data +="<div class='col-md-4'><div class='card' style='height: 200px;'><p class='text-center' style='font-size: 16px'>Place : "+details[x].name+"<br><br>Parcels : "+details[x].parcel+"<br><br>Phone : "+details[x].phone+"<br><br>Location : "+details[x].location+"</p></div></div>";
            }
            document.getElementById("row").innerHTML = data;
        }
        else {
            document.getElementById("row").innerHTML = "<p class='text-center'>No requests found</p>";
        }
    }
    xmlhttp.send();
}