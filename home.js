$(document).ready(function()
    {
        //登出
        $("#signout").click(function()
        {   
            var API = "http://127.0.0.1:1880/delete_uid";
            $.get
                (API);
            window.location.href="http://127.0.0.1:1880/web/signin"
        })

        $("#ToSwitchButton").click(function()
        {   
            var API = "http://127.0.0.1:1880/check_uid";
            $.get
                (API);
            window.location.href="http://127.0.0.1:1880/web/switch"
        })
        ToSwitchButton
    }
)