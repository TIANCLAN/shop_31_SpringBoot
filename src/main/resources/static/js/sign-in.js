// function SignInAccount(){
//     let _csrf = $.cookie('XSRF-TOKEN');
//     inputData = {"username" : $("#username").val(),"password" : $("#password").val(),
//         "_csrf" : _csrf}
//     console.log(inputData)
//     $.ajax({
//         url:"/doLogin",
//         dataType:"json",
//         type:"POST",
//         async:false,
//         data: JSON.stringify(inputData),
//         success:function (data) {
//             console.log(data)
//         } ,
//         error:function (data) {
//             alert("login failed");
//         }
//     });
//     return false;
// }
$("#loginBtn").click(function () {
    let _csrf = $.cookie('XSRF-TOKEN');
    $.post('/doLogin',{username:$("#username").val(),password:$("#password").val(),_csrf:_csrf},function (data) {
        location.assign("http://127.0.0.1:8080/")
    })
})