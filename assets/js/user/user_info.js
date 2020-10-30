$(function() {
    layui.form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "请输入 1-6位字符"
            }
        }
    })

    initUserInfo()
        // 获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 渲染信息
                layui.form.val('formUserInfo', res.data);
            }

        })
    }
    // 重置按钮
    $('#btnReset').on('click', function(e) {
            e.preventDefault();
            initUserInfo()
        })
        // 表单修改提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                window.parent.getUserlist()
            }
        })
    })
})