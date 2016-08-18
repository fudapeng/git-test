/**
 * Created by cxn on 2015/3/31.
 */

//location begin with
var lcb = "/api/sr";
module.exports = {
    /*
     个人库
     */
    //列表
    'privateList': lcb + '/subjectrepo/private/list',
    //删除
    'privateDelete': lcb + '/subjectrepo/private/delete',
    //增加一道题
    'privateAdd': lcb + '/subjectrepo/private/add',
    //查询
    'privateQuery': lcb + '/subjectrepo/private/queryByIds',
    //更新
    'privateUpdate': lcb + '/subjectrepo/private/update',
    //word上传
    'uploadWord': lcb + '/subjectrepo/private/uploadWord',
    //组卷次数加1
    'privateAddChosenCount': lcb + '/subjectrepo/private/incChosenCount',
    //按id查询题目
    'privateByIds': lcb + '/subjectrepo/private/queryByIds',
    /*
     公共库
     */
    //查询
    'publicQuery': lcb + '/subjectrepo/public/queryByIds',
    //列表
    'publicList': lcb + '/subjectrepo/public/list',
    //随机选题
    'publicQueryRandom': lcb + '/subjectrepo/public/pickSubjectsRandomly',
    //组卷次数加1
    'publicAddChosenCount': lcb + '/subjectrepo/public/incChosenCount',
    //试卷选题，试卷列表
    '/listPaper/': lcb + '/paperrepo/listPaper',
    //在线出卷-返回临时试卷列表
    'listTempPaper': lcb + '/paperrepo/listTempPaper',
    //在线出卷-删除接口
    'deleTempPaper': lcb + '/paperrepo/deleteTempPaperrepo',
    //word上传功能 解析文件接口
    'savaTempPaper': lcb + '/paperrepo/saveTempPaper',
    //获得上传word的html 进入在线word编辑
    'wordHtml': lcb + '/paperrepo/getHtmlByPaperId',
    //在线出卷-获得word模板
    'wordTemplate': lcb + '/paperrepo/downloadWordTemplate',
    //试卷选题，由试卷id获得试题列表
    'getSubjectByPaperId': lcb + '/paperrepo/getSubjectByPaperId',
    //word在线编辑中确认预览
    'saveTempSubjectRepo': lcb + '/paperrepo/saveTempSubjectRepo',
    //临时试卷的试题集合
    'getTempSubjectByPaperId': lcb + '/paperrepo/getTempSubjectByPaperId',
    //在线出卷预览页面的发布按钮
    'copyToPrivatePaper': lcb + '/paperrepo/copyToPrivatePaper',
    //删除临时题库的试题
    'deleteTempSubectRepo': lcb + '/paperrepo/deleteTempSubectRepo',
    //按id查询题目
    'publicByIds': lcb + '/subjectrepo/public/queryByIds',
    /*
     一键组卷
     */
    //组卷
    'generatepaper': lcb + '/subjectrepo/public/oneKeyGeneratePaper',

    //下载单个试题
    '/favoritesubject/downloadSingleSubject': lcb + '/favoritesubject/downloadSingleSubject',

    //获取当前用户的收藏标签
    '/favoritesubject/getTags': lcb + '/favoritesubject/getTags',
    //取消收藏
    '/favoritesubject/removeFavoriteSubject': lcb + '/favoritesubject/removeFavoriteSubject',
    //加入收藏
    '/favoritesubject/addFavoriteSubject': lcb + '/favoritesubject/addFavoriteSubject',
    //返回收藏试题列表
    '/favoritesubject/listSubject': lcb + '/favoritesubject/listSubject',
    //单元测试—获得试卷列表
    '/paperrepo/listPaperByChapter': lcb + '/paperrepo/listPaperByChapter',
    //按ids查询临时题库
    '/subjectrepo/temp/queryByIds': lcb + '/subjectrepo/temp/queryByIds',
    //在线出卷-更新临时题库的试题—（属性补充，编辑）
    '/paperrepo/updateTempSubectRepo': lcb + '/paperrepo/updateTempSubectRepo',
    //标签列表--1.3优化更改
    '/favoritesubject/tagList': lcb + '/favoritesubject/tagList',
//        新建添加标签
    '/favoritesubject/addTag': lcb + '/favoritesubject/addTag',
    //编辑标签
    '/favoritesubject/editTag': lcb + '/favoritesubject/editTag',
    //删除标签
    '/favoritesubject/deleteTag': lcb + '/favoritesubject/deleteTag'
};
