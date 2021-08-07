$(document).ready(function()
    {
        //初始化
        var API="http://140.125.217.135:1880/information"
        $.post
        (
            API,
            {
                Uid:window.uid
            },
            function(res)
            {
                var name = res.Name;
                var password = res.Password;
                var phone = res.Phone;
                var email = res.Email;
                $("#name").text(name);
                $("#stdid").text(window.uid);
                $("#password").text(password);
                $("#phone").text(phone);
                $("#email").text(email);
            }
        )
        
        //修改資料
        $("#modify").click(function()
        {   
            var API = "http://140.125.217.135:1880/web/check_uid"
            $.get
            (
                API
            );
            window.location.href="http://140.125.217.135:1880/web/information/modify";
        })

        //登出
        $("#signout").click(function()
        {   
            var API = "http://140.125.217.135:1880/delete_uid";
            $.get
                (API);
            window.location.href="http://140.125.217.135:1880/web/signin"
        })
    }
)