/**
 * Created by cxn on 2015/3/31.
 */


//location begin with
var lcb = "/api/pa/";
module.exports = {
    //保存试卷接口 初次生成试卷
    'save': lcb + 'paper/private/add',
    //获得试卷试题信息
    'getPaperMessage': lcb + 'paper/private/get',
    //返回试卷列表
    'paperList': lcb + 'paper/private/query',
    //更新试卷
    'updatePaper': lcb + 'paper/private/update',
    //删除试卷
    'deletePaper': lcb + 'paper/private/delete',
    //返回试卷状态
    'paperStatus': lcb + 'paper/private/getStatus',
    //1.我的试卷列表
    "myPaperList": lcb + 'paper/private/list',
    "list": lcb + 'paper/private/listMyPaper',
    "saveAgain": lcb + 'paper/private/saveWordAgain',
    //双向细目表
    "getExcelData": lcb + 'paper/private/getExcelData',
    //下载双向细目表
    'paper/private/downloadExcel': lcb + 'paper/private/downloadExcel',
};
