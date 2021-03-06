$(document).ready(function() {
    $("#btnsend").click(function() {
        regist();
    })
})

function regist() {
    var name = $("#name").val();
    var std_id = $("#stdid").val();
    var password = $("#password").val();
    var check = $("#check").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var key = $("#key").val();
    var inf = [name, std_id, password, check, phone, email, key];
    var inf_id = ["#name", "#stdid", "#password", "#check", "#phone", "#email", "#key"];
    var inf_alarm = ["#name_alarm", "#stdid_alarm", "#password_alarm", "#check_alarm", "#phone_alarm", "#email_alarm", "#key_alarm"];
    var input_check = 1;
    $("#stdid").attr("class", "form");
    $("#repeat").attr("class", "unrepeated");
    for (var i = 0; i < 7; i++) {
        if (!inf[i]) {
            input_check = 0;
            $(inf_id[i]).attr("class", "form_alart");
            $(inf_alarm[i]).attr("class", "alarm");
        } else {
            $(inf_id[i]).attr("class", "form");
            $(inf_alarm[i]).attr("class", "nothing");
        }
    }
    if (input_check == 1) {
        if (password.length >= 6) {
            if (password == check) {
                var API = "http://127.0.0.1:1880/register";
                $.post(
                    API, {
                        Name: name,
                        Std_id: std_id,
                        Password: password,
                        Phone: phone,
                        Email: email,
                        Key: key
                    },
                    function(res) {
                        const info = res.Info;
                        if (info == 0) {
                            window.alert("註冊金鑰錯誤。");
                        } else if (info == 2) {
                            $("#stdid").attr("class", "form_repeated");
                            $("#repeat").attr("class", "repeated");
                        } else {
                            const access = res.Access;
                            alert("註冊成功，認證碼:" + access + "\n請去信箱認證。");
                            window.location.href = "http://127.0.0.1:1880/web/signin";
                        }
                    }
                );
            } else {
                alert("確認密碼與密碼不合 !");
            }
        } else alert("密碼必須大於6個字元 !");

    }
}

function IsEnterKeyPress() {
    var lKeyCode = (navigator.appname == "Netscape") ? event.which : window.event.keyCode;
    if (lKeyCode == 13) {
        regist();;
    }
}