$(document).ready(function() {
    //初始化
    var API = "http://127.0.0.1:1880/information"
    $.post(
        API, {
            Uid: window.uid
        },
        function(res) {
            var name = res.Name;
            var stdid = res.Student_ID;
            var password = res.Password;
            var phone = res.Phone;
            var email = res.Email;
            $("#name").text(name);
            $("#stdid").text(stdid);
            $("#password").text(password);
            $("#phone").text(phone);
            $("#email").text(email);
        }
    )

    //修改資料
    $("#modify").click(function() {
        check_signing_in();
        window.location.href = "http://127.0.0.1:1880/web/information/modify";
    })

    //登出
    $("#signout").click(function() {
        var API = "http://127.0.0.1:1880/delete_uid";
        $.get(API);
        window.location.href = "http://127.0.0.1:1880/web/signin"
    })
})

function check_signing_in() {
    var API = "http://127.0.0.1:1880/web/check_cookie";
    $.get(API);
}