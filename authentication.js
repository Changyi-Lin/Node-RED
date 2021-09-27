$(
    function()
    {
        $("#check").click(function()
        {   
            var authentication= $("#authentication").val();  
            var API = "http://127.0.0.1:1880/authentication";
            console.log(authentication);
            if(authentication)
            {
                $("#authentication").attr("class","form");
                $("#auth_alarm").attr("class","nothing");
                $.post
                (
                    API,
                    {
                        Authentication:authentication
                    },
                    function(res)
                    {
                        const check=res.Check;
                        if (check == 1)
                        {
                            window.alert("認證成功!");
    
                        }
                        else
                        {
                            window.alert("認證失敗，無此認證碼。");
                        }
                    }
                );   
            }
            else
            {
                $("#authentication").attr("class","form_alart");
                $("#auth_alarm").attr("class","alarm");
            }
        })
    }
)