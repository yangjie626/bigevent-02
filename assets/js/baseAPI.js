var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(option) {
    option.url = baseURL + option.url

    if (option.url.indexOf('/my/') !== -1) {
        // url含有my
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
})