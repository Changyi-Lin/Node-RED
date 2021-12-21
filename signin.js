$(document).ready(function() {
    $("#signin").click(function() {
        signin(check_input());
    })
})

function check_input() {
    window.std_id = $("#std_id").val();
    window.password = $("#password").val();
    var check = 1;
    if (!std_id) {
        check = 0;
        $("#std_id").attr("class", "form_alart");
        $("#stdid_alarm").attr("class", "alarm");
    } else {
        $("#std_id").attr("class", "form");
        $("#stdid_alarm").attr("class", "nothing");
    }
    if (!password) {
        check = 0;
        $("#password").attr("class", "form_alart")
        $("#password_alarm").attr("class", "alarm");
    } else {
        $("#password").attr("class", "form")
        $("#password_alarm").attr("class", "nothing");
    }
    return check;
}

function signin(check) {
    if (check == 1) {
        var API = "http://127.0.0.1:1880/signin";
        $.post(
            API, {
                Std_id: window.std_id,
                Password: window.password
            },
            function(res) {
                var info = res.Info;
                var status = res.Status;
                var access = res.Access;
                var level = res.Level;
                var uid = res.Uid;
                if (info == 0) {
                    window.alert("帳號或密碼錯誤。");
                } else {
                    if (status == 1 && level == 'student') {
                        var API = "http://127.0.0.1:1880/web/signin/add_cookie";
                        $.post(
                            API, {
                                Uid: uid
                            }
                        );
                        window.location.href = "http://127.0.0.1:1880/web/home";
                    } else if (status == 1 && level == 'admin') {
                        var API = "http://127.0.0.1:1880/admin/add_cookie";
                        $.post(
                            API, {
                                Uid: uid
                            }
                        );
                        window.location.href = "http://127.0.0.1:1880/admin/lend";
                    } else {
                        window.alert("帳號尚未認證，請去信箱認證\n認證碼:" + access);
                    }
                }
            }
        );
    }
}

function IsEnterKeyPress() {
    var lKeyCode = (navigator.appname == "Netscape") ? event.which : window.event.keyCode;
    if (lKeyCode == 13) {
        signin(check_input());
    }
}