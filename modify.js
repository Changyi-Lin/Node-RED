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
                $("#name").attr("value",name);
                $("#stdid").attr("value",window.uid);
                $("#password").attr("value",password);
                $("#phone").attr("value",phone);
                $("#email").attr("value",email);
            }
        )
        
        //確認修改
        $("#yes").click(function()
        {   
            var name = $("#name").val();
            var stdid = $("#stdid").val();
            var password = $("#password").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            var check = 1;
            var list = [name,stdid,password,phone,email];
            var list_obj = ["#name","#stdid","#password","#phone","#email"];
            var list_alarm = ["#name_alarm","#stdid_alarm","#password_alarm","#phone_alarm","#email_alarm"]
            for(i=0;i<5;i++)
            {
                if(!list[i])
                {
                    check = 0;
                    $(list_obj[i]).attr("class","form_alart");
                    $(list_alarm[i]).attr("class","alarm");
                }
                else 
                {
                    $(list_obj[i]).attr("class","form");
                    $(list_alarm[i]).attr("class","nothing");
                }
            }
            if(check==1)
            {
                if(confirm("確定變更個人資料?"))
                {
                    var API = "http://140.125.217.135:1880/modify";
                    console.log(stdid);
                    $.post
                    (
                    API,
                    {
                        Name:name,
                        Stdid:stdid,
                        Password:password,
                        Phone:phone,
                        Email:email
                    },function(res) 
                    {
                        var inf = res.Inf;
                        if(inf==1)
                        {
                            alert("成功修改個人資料!");
                            window.location.href="http://140.125.217.135:1880/web/information";
                        }    
                    })
                }
            }
        })

        //取消修改
        $("#no").click(function()
        {
            window.location.href="http://140.125.217.135:1880/web/information";
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