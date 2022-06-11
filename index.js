const form = document.getElementById("form");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("confirm password");

function showerror(input,message){
    const formcontrol = input.parentElement.parentElement;
    formcontrol.classList.remove("success");
    formcontrol.classList.add("input","error");
    const p = formcontrol.querySelector("p");
    p.innerText = message;
}
function showsuccess(input){
    const formcontrol = input.parentElement.parentElement;
    const p = formcontrol.querySelector("p");
    formcontrol.classList.add("success");
    formcontrol.classList.remove("input","error");
    p.innerText = "";
}
//Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input) {
        if(input.value.trim()===""){
            showerror(input,`${getFieldName(input)} is required`);
        } else {
            showsuccess(input);


        }
    });
}
//get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

//check input length
function checkLength(input,min,max){
    if(input.value.length<min && input.value.length>=0 ){
        showerror(
            input,`${getFieldName(input)} must be at least ${min} characters`
        );
    } else if(input.value.length>max){
        showerror(input,`${getFieldName(input)} must be less than ${max}`);
    } else {
        showsuccess(input);

    }
}
//check email validation
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(input.value.trim())){
        showsuccess(input);
    } else {
        showerror(input,"Email is not valid");
    }
}
//check password match
function checkPassword(input1,input2){
    if(input1.value.length>=8){
        if(input1.value!==input2.value){
            showerror(input2,"Passwords did not match");
        } 
    }
 
    else {
        showerror(input2,"");
    }
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    checkRequired([fullname,email,password,cpassword]);
    checkLength(fullname,2,20);
    checkLength(password,8,25);
    checkEmail(email);
    checkPassword(password,cpassword);
})
