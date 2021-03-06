/**
 * Created by 111 on 2017/04/05.
 */
var LogisticsManagerPage = function () {
    var columnsArr = [
{
    field: 'opera', title: '操作', width: '150', align: 'center',
    formatter: function (value, row, index) {
        var val='';
        if(value==1){
            val='总计：';
        }else{
            /*<a  class="btn detail-btn0719 marRig10" href="' + rootPath + 'v1/lLogisticsManagerController/editLlogisticsManagerPage?detailId=' + row.id + '">编辑</a><a class="btn detail-btn0719 marRig10" href="javascript:;" onclick="LogisticsManagerSearch.copyLogisticsWindow(' + row.id + ',\'total\')">拷贝</a>*/
            val = '<a class="btn detail-btn0719 marRig10" href="' + rootPath + 'v1/lLogisticsManagerController/swLlogisticsManagerPage?id=' + row.id + '">查看</a>';
            if(userName=='15201596856'){
                val = val+'<a class="btn detail-btn0719" href="javascript:;" onclick="LogisticsManagerSearch.delLogistics(' + row.id + ',\'' + Common.getLocalDateBy(row.orderDate) + '\',\'' + row.systemManageOrder + '\')">删除</a>';
            }

        }
        return val;
    }
},
        {field: 'systemManageOrder', title: '系统管理订单号', align: 'center'},
        {field: 'systemOrder', title: '系统订单号',  align: 'center'},
        {field: 'platformOrder', title: '平台订单编号',  align: 'center'},
        {
            field: 'orderDate', title: '订单日期', align: 'center',
            formatter: function (value) {
                var val = '';
                if (null == value || 'null' == value || '' == value) {
                    val = '';
                } else {
                    val = Common.getLocalDateBy(value)
                }
                return val;
            }
        },
        {field: 'consigneeName1', title: '收货人姓名（一）', align: 'center'},
        {field: 'consigneephone1', title: '收货人电话（一）',  align: 'center'},
        {field: 'producutName', title: '产品名称', align: 'center'},
        {field: 'sendGoodsNum', title: '发货数量',  align: 'center'},
        {field: 'orderStatus', title: '订单状态',  align: 'center'},
        {field: 'orderType', title: '订单类型', align: 'center'},
        {field: 'ynPaymentReceived', title: '是否代收货款', align: 'center'},
        {field: 'ynPayment', title: '是否回款',  align: 'center'},
        {field: 'exp39', title: '部门',  align: 'center'},
        {field: 'exp40', title: '业务员',  align: 'center'}
    ];


    
    /*根据检索条件导出文件*/
    var exportFileByForm=function () {
        $('#formBtn0424').click(function () {
           $(this).attr('href','javascript:;');
           $(this).attr('href',rootPath+'v1/exportLLogis/exportLLogisAll?'+$('#searchForm').serialize());
        });

    };
    /*到处表格*/
    var exportExcle = function () {
        $("#excelBtn0407").click(function () {
            var selRows = $("#order").datagrid("getSelections");
            if (selRows.length == 0) {
                Common.showMessage("请选择需要导出的数据！", 'warn');
            } else {
                $('#exportExcelWin').dialog('open');
                var arr = [];
                for (var i = 0; i < selRows.length; i++) {
                    arr.push(selRows[i].id);
                }
                $('#num0410').text(arr.length);
                $('#exportExcelWin').dialog({
                    closed: false,
                    buttons: [{
                        text: '取消',
                        width: '80px',
                        handler: function () {
                            $('#exportExcelWin').dialog('close');
                            /*$('#order').datagrid('uncheckAll');*/
                        }
                    }, {
                        text: '确定导出',
                        width: '80px',
                        handler: function () {
                            $(this).attr('href', rootPath + 'v1/exportLLogis/exportLLogis?ids=' + arr);
                            $('#exportExcelWin').dialog('close');
                            $('#order').datagrid('uncheckAll');
                        }
                    }]
                });


            }
            return false;
        });
    };
    /*选择显示列*/
    var openHeaderWin=function () {
        $(".table-requirement-btn").click(function(){
            $('#table-show-condition-window').window({
                width:640,
                height:810,
                minimizable:false,
                maximizable:false,
                collapsible:false,
                modal:true
            });
            if(Common.getCookie('condition_header')!=null){
                var orderLen=Common.getCookie('condition_order');
                var wuliuLen=Common.getCookie('condition_wuliu'),moneyLen=Common.getCookie('condition_money'),addressLen=Common.getCookie('condition_address'),definedLen=Common.getCookie('condition_defined');
                if(orderLen==$('#orderCkUl li').length){
                    $('#orderCk').prop('checked',true);
                }
                if(wuliuLen==$('#wuLiuCkUl li').length){
                    $('#wuLiuCk').prop('checked',true);
                }
                if(moneyLen==$('#moneyCkUl li').length){
                    $('#moneyCk').prop('checked',true);
                }
                if(addressLen==$('#addressCkUl li').length){
                    $('#addressCk').prop('checked',true);
                }
                if(definedLen==$('#definedCkUl li').length){
                    $('#definedCk').prop('checked',true);
                }
                $('input[name="order0407"]').val(orderLen);
                $('input[name="wuLiu0407"]').val(wuliuLen);
                $('input[name="money0407"]').val(moneyLen);
                $('input[name="address0407"]').val(addressLen);
                $('input[name="defined0407"]').val(definedLen);
                var headerArr=Common.getCookie('condition_header').split('_');
                for (var i=0;i<headerArr.length;i++){
                    $('#'+headerArr[i]+'').prop('checked',true);
                }
            }

        });
    }
    return {
        init: function () {
            if(userName=='15321792627' || userName == 'dingdanzhuanyuan'){
                $('#opera0710').css({"display":"none"});
                $('#formBtn0424').css({"display":"none"});
            }
            LogisticsManagerSearch.init();
            openHeaderWin();//打开表头
            exportFileByForm();//根据选择文件导出
            LogisticsManagerPage.getCookieFun();
            LogisticsManagerSearch.getTableData(columnsArr);
            /*if(Common.getCookie("condition_header")==null){
                LogisticsManagerSearch.getTableData(columnsArr);/!*获取表格数据*!/
             }else{
             var getCookie = Common.getCookie("condition_header").split("_");
                $('input[name="order0407"]').val(Common.getCookie('condition_order'));
                $('input[name="wuLiu0407"]').val(Common.getCookie('condition_wuliu'));
                $('input[name="money0407"]').val(Common.getCookie('condition_money'));
                $('input[name="address0407"]').val(Common.getCookie('condition_address'));
                $('input[name="defined0407"]').val(Common.getCookie('condition_defined'));
             var newArr = [];
                var selColumnsArr = [];
                selColumnsArr.push(columnsArr[0]);
             for(var i = 0;i<getCookie.length;i++){
                 for(var k=0;k<columnsJSON.length;k++){
                     if (getCookie[i]==columnsJSON[k].field){
                         newArr.push(columnsJSON[k]);
                     }
                 }
             }
             LogisticsManagerSearch.getTableData(newArr);
             }*/
            /*显示选择日期 */
            LogisticsManagerSearch.searchDataByForm(columnsArr);
            /*查询数据*/
            exportExcle();
            $(".openSearche_btn").click(function(){
            	LogisticsManagerSearch.getDetailData();
            	$('#search_condition').window({
                    width:1200,
                    height:810,
                    minimizable:false,
                    maximizable:false,
                    collapsible:false,
                    modal:true
                });
            });
        },
        /*订单号搜索*/
        searchDataBySystemManageOrder:function(){
        	var sfarr = $("#searchForm").serializeArray();
        	var newp = {};
        	$.each( sfarr, function(key, val){
    		  newp[val.name] = "";
    		});
        	newp["systemManageOrder"] = $('#smo').textbox('getValue')
        	LogisticsManagerSearch.setDetailData(newp);
        	LogisticsManagerSearch.getTableData(columnsArr, newp);
        },
        getCookieFun:function () {
            if(Common.getCookie("condition_header")!=null){
                var getCookie = Common.getCookie("condition_header").split("_");
                $('input[name="order0407"]').val(Common.getCookie('condition_order'));
                $('input[name="wuLiu0407"]').val(Common.getCookie('condition_wuliu'));
                $('input[name="money0407"]').val(Common.getCookie('condition_money'));
                $('input[name="address0407"]').val(Common.getCookie('condition_address'));
                $('input[name="defined0407"]').val(Common.getCookie('condition_defined'));
                var selColumnsArr = [];
                selColumnsArr.push(columnsArr[0]);
                for(var i = 0;i<getCookie.length;i++){
                    for(var k=0;k<columnsJSON.length;k++){
                        if (getCookie[i]==columnsJSON[k].field){
                            selColumnsArr.push(columnsJSON[k]);
                        }
                    }
                }
                columnsArr=selColumnsArr;
            }
            return columnsArr;
        },
        /*
         * 上传文件
         * */
        importExcel: function (obj) {
            Common.loading_mask();
            $.ajaxFileUpload({
                url: rootPath + 'v1/exportLLogis/importLLogistManaExcel?'+ Math.random(),
                secureuri: false,
                fileElementId: 'file',
                dataType: 'string',
                success: function (res) {
                    $('#load').remove();
                    $('#file').val('');
                    if (res.resultCode == 'FAIL') {
                        $.messager.alert('提示信息', res.msg, 'error');
                    } else {
                        var html = [];
                        html.push('<h2 >文件上传成功</h2>');
                        html.push('<h3>成功导入' + res.succNum + '条</h3>');
                        if (res.illegalList.length != 0) {
                            html.push('<p style="line-height: 22px;font-size:14px; color: red;">非法订单' + res.illegalNum + '条数：<a href="javascript:;" class="easyui-linkbutton0410" onclick="LogisticsManagerPage.searchIllegalOrder(\'' + res.illegalListOrder.join(',') + '\')">查看非法订单</a></p>');
                            html.push('<ol>');
                            for (var i = 0; i < res.illegalList.length; i++) {
                                html.push('<li>' + res.illegalList[i] + '</li>')
                            }
                            html.push('</ol>');
                        }
                        if (res.failList.length != 0) {
                            html.push('<p style="line-height: 22px;font-size:14px; color: red;">原因：</p>');
                            html.push('<ol>');
                            for (var i = 0; i < res.failList.length; i++) {
                                html.push('<li>' + res.failList[i] + '</li>')
                            }
                            html.push('</ol>');
                        }
                        $('#html0410').html(html.join(''));
                        $('#importExcelWin').dialog('open');
                        $('#importExcelWin').dialog({
                            closed: false,
                            buttons: [{
                                text: '确定',
                                width: '80px',
                                handler: function () {
                                    $('#importExcelWin').dialog('close');
                                    LogisticsManagerSearch.getTableData(columnsArr);
                                }
                            }],
                            onClose: function () {
                                LogisticsManagerSearch.getTableData(columnsArr);
                            }
                        });
                    }
                }

            });
        },
        /*
         *非法订单id
         **/
        searchIllegalOrder: function (orderList) {
            $('#importExcelWin').dialog('close');
            LogisticsManagerSearch.getTableData(columnsArr, {"systemManageOrders": orderList});

        },
        /*清空选择的表头*/
        clearSelTabHeader: function () {
            $('input[type="checkbox"]').prop('checked', false);
            $('#table-show-condition-window').window('close');
        },
        submitTableHeader: function () {
            var items = $('.check');
            var selColumnsArr = [];
            selColumnsArr.push(columnsArr[0]);
            var headerArr=[];
            for (var i = 0; i < items.length; i++) {
                if (items.eq(i).prop("checked")) {
                    for (var k = 0; k < columnsJSON.length; k++) {
                        if (items.eq(i).attr("value") == columnsJSON[k].field) {
                            headerArr.push(columnsJSON[k].field);
                            selColumnsArr.push(columnsJSON[k]);
                        }
                    }
                }
            }
            $(".check").prop("checked", false);
            $('#table-show-condition-window').window('close');
            Common.setCookie('condition_header',headerArr.join('_'));
            Common.setCookie('condition_order',$('input[name="order0407"]').val());
            Common.setCookie('condition_wuliu',$('input[name="wuLiu0407"]').val());
            Common.setCookie('condition_money',$('input[name="money0407"]').val());
            Common.setCookie('condition_address',$('input[name="address0407"]').val());
            Common.setCookie('condition_defined',$('input[name="defined0407"]').val());
            LogisticsManagerSearch.getTableData(selColumnsArr);
        },
        
    }
}();