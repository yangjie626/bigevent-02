$(function() {
    //初始化列表
    initArtList()

    function initArtList() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                var str = template('tpl-table', res)
                $('tbody').html(str)
            }
        })
    }

    // 添加类别add
    var indexAdd = null
    $('.btnAddCate').on('click', function() {
        indexAdd = layui.layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px'],
            content: $('#tpl-add').html()
        });
    })


    // add
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                initArtList()
                layui.layer.msg(res.message)
                layui.layer.close(indexAdd)
            }
        })
    })

    // edit 弹窗
    var indexEdit = null
    $('body').on('click', '.btnEdit', function() {
        indexEdit = layui.layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            content: $('#tpl-edit').html()
        });
        // 内容渲染到表单中
        var Id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.form.val('form-edit', res.data)
            }
        })
    })

    // edit表单提交
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                initArtList()
                layui.layer.msg(res.message)
                layui.layer.close(indexEdit)
            }
        })
    })

    // delete 弹窗

    $('body').on('click', '.btnDelete', function() {
        var Id = $(this).attr('data-id')
        layui.layer.confirm('确认删么?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    initArtList()
                    layer.close(index);
                    layui.layer.msg(res.message)
                }
            })


        });
    })






})