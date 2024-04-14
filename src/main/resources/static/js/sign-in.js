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
    let rememberme = 'off'
    if($('#flexCheckDefault').is(':checked'))
        rememberme = 'on'
    // $.post('/doLogin',{
    //     username:$("#username").val(),
    //     password:$("#password").val(),
    //     _csrf:_csrf
    // },function (data) {
    //     console.log(data)
    // })
    //     let _csrf = $.cookie('XSRF-TOKEN');
    $.ajax({
        url:"/doLogin",
        dataType:"json",
        type:"POST",
        async:false,
        data: {
                username:$("#username").val(),
                password:$("#password").val(),
                _csrf:_csrf,
                'remember-me': rememberme
            },
        success:function (data) {
            username = data.username
            location.assign("/index.html?username="+username)
        } ,
        error:function (data) {
            alert("login failed");
        }
    });
})