$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        // 校验规则
    var form = layui.form
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $('.reg-box input[name=password]').val()
                if (pwd !== value) {
                    return '密码输入不一致,请重新输入'
                }
            }
        })
        // 注册信息提交后台
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    console.log(123);
                    return alert(res.message)
                }
                alert(res.message)
                console.log(345);
            }

        })
    })

})