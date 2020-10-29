$(function() {
    getUserlist()
    $('#btnLogout').on('click', function() {
        layui.layer.confirm('确定退出么?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });

    })
})

// 获取用户信息
function getUserlist() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /* headers: {
            Authorization: localStorage.getItem('token')
        }, */
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //调用成功则渲染图片名字
            renderAvatar(res.data)
        }
    })
}
// 渲染图片名字
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎' + name)
    var text = name[0].toUpperCase()
    if (user.user_pic !== null) {
        // 有照片
        $('.text-avatar').hide()
        $('.layui-nav-img').show().attr('src', user.user_pic)
    } else {
        $('.text-avatar').show().html(text)
        $('.layui-nav-img').hide()
    }


}