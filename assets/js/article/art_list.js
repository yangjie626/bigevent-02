$(function() {
    // 加0
    function padZero(n) {
        return n < 10 ? "0" + n : n
    }
    // 定义美化时间的过滤器(定义到最顶端)
    template.defaults.imports.dateFormat = function(datsStr) {
        var dt = new Date(datsStr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var h = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var s = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s
    }

    // 定义查询对象
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的Id
        state: '' //文章的状态,可选值:已发布,草稿
    }

    initTable()
    initCate()
        // 获取文章列表
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // 渲染页面数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                    // 渲染分页
                renderPage(res.total)
            }
        })
    }

    // 渲染文章类别
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    layui.layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }

    // 为筛选按钮绑定表单提交事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // 赋值
        q.cate_id = cate_id
        q.state = state
        initTable()
    })


    // 渲染文章分页
    function renderPage(total) {
        layui.laypage.render({
            elem: 'pageBox', //这里是id,不加#
            count: total, //数据总数,从服务器得到
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //起始页
            // 分页模块设置,显示哪些子模块
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [1, 3, 5, 7, 9], //每页显示多少条数据
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 删除
    var len = $('.btn-delete').length
    $('body').on('click', '.btn-delete', function() {
        var Id = $(this).attr('data-id')
        layui.layer.confirm('确认删除么?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/delete/' + Id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg(res.message)
                    if (len === 1 && q.pagenum > 1) {
                        q.pagenum--
                    }
                    initTable()
                }
            })
            layer.close(index);
        })
    })

})