var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(option) {
    option.url = baseURL + option.url

    if (option.url.indexOf('/my/') !== -1) {
        // url含有my
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    option.complete = function(res) {
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})