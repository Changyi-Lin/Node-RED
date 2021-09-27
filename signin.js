$(document).ready(function()
    {   
        $("#signin").click(function()
        {   
            var std_id = $("#std_id").val();
            var password = $("#password").val();
            var check=1;
            if(!std_id)
            {
                check=0;
                $("#std_id").attr("class","form_alart");
                $("#stdid_alarm").attr("class","alarm");
            }
            else 
            {
                $("#std_id").attr("class","form");
                $("#stdid_alarm").attr("class","nothing");
            }if(!password)
            {
                check=0;
                $("#password").attr("class","form_alart")
                $("#password_alarm").attr("class","alarm");
            }
            else 
            {
                $("#password").attr("class","form")
                $("#password_alarm").attr("class","nothing");
            }
            if(check==1)
            {
                var API = "http://127.0.0.1:1880/signin";
                $.post
                (
                    API,
                    {
                        Std_id:std_id,
                        Password:password
                    },
                    function(res)
                    {
                        const info=res.Info;
                        const status=res.Status;
                        const access=res.Access;
                        console.log(info);
                        if (info == 0)
                        {
                            window.alert("帳號或密碼錯誤。");
                        }
                        else
                        {
                            if(status == 1)
                            {
                                var API = "http://127.0.0.1:1880/web/signin/add_uid";
                                $.post
                                    (
                                        API,
                                        {
                                          Std_id:std_id  
                                        }
                                    );
                                window.location.href="http://127.0.0.1:1880/web/home";
                            }
                            else
                            {
                                window.alert("帳號尚未認證，請去信箱認證\n認證碼:"+access);
                            }
                        }
                    }
                );
            }              
        })
    }
)
