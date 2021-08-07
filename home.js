$(document).ready(function()
    {
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