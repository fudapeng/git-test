/**
 * Created by fudapeng on 2015/6/9.
 */

//location begin with
var lcb = "/api/sp";
module.exports = {
    '/surveyPaper/save': lcb + '/surveyPaper/save',
    '/surveyNorm/getLevel1': lcb + '/surveyNorm/getLevel1',
    '/surveySample/createAllSamples': lcb + '/surveySample/createAllSamples',
    //查询所有已结束的问卷
    '/surveyPaper/listAllFinishedPapers': lcb + '/surveyPaper/listAllFinishedPapers',
    //按范围分层抽样
    '/surveySample/createSamplesByLimits': lcb + '/surveySample/createSamplesByLimits',
    //下载抽样名单
    '/surveySample/downloadRangeSamples': lcb + '/surveySample/downloadRangeSamples',
    //按数量分层抽样
    '/surveySample/createSamplesByAmount': lcb + '/surveySample/createSamplesByAmount',
    //按上传名单抽样
    '/surveySample/uploadSamples': lcb + '/surveySample/uploadSamples',
    //下载抽样名单模板文件
    '/surveyFile/downloadSampleTemplate': lcb + '/surveyFile/downloadSampleTemplate',
    //显示上传抽样名单
    '/surveySample/listUploadSamples': lcb + '/surveySample/listUploadSamples',
    //删除上传抽样名单
    '/surveySample/deleteUploadSamples': lcb + '/surveySample/deleteUploadSamples',
    //复制问卷
    '/surveyPaper/copyPaper': lcb + '/surveyPaper/copyPaper',
    //导入问卷
    '/surveyPaper/importPaper': lcb + '/surveyPaper/importPaper',
    //下载 导入问卷模板
    '/surveyFile/downloadTemplate': lcb + '/surveyFile/downloadTemplate',
    //删除导入问卷
    '/surveyPaper/deleteImportPaper': lcb + '/surveyPaper/deleteImportPaper',
    '/surveyPaper/list': lcb + '/surveyPaper/list',
    '/surveyPaper/release': lcb + '/surveyPaper/release',
    '/surveyPaper/finish': lcb + '/surveyPaper/finish',
    '/surveySubject/listPreSetsAndPages': lcb + '/surveySubject/listPreSetsAndPages',
    //删除问卷
    '/surveyPaper/delete': lcb + '/surveyPaper/delete',
    //根据问卷id获取问卷基本信息
    '/surveyPaper/getBaseInfo': lcb + '/surveyPaper/getBaseInfo',
    '/surveyPaper/getInfo': lcb + '/surveyPaper/getInfo',
    //保存一个空白页
    '/surveySubject/createAnEmptyPage': lcb + '/surveySubject/createAnEmptyPage',
    //保存或修改一页问卷题目
    '/surveySubject/create': lcb + '/surveySubject/create',
    //删除一页
    '/surveySubject/deletePage': lcb + '/surveySubject/deletePage',
    //获取调查问卷所有页和题目
    '/surveySubject/listAllPages': lcb + '/surveySubject/listAllPages',
    //添加问卷维度
    '/surveyDimension/listByPaperId': lcb + '/surveyDimension/listByPaperId',
    //根据维度id，删除维度
    '/surveyDimension/deleteById': lcb + "/surveyDimension/deleteById",
    //根据问卷id查找维度
    '/surveyDimension/saveList': lcb + '/surveyDimension/saveList',
    //完成问卷编辑
    '/surveyPaper/complete': lcb + '/surveyPaper/complete',
    //问卷-统计分析
    '/surveyAnalyze/statisticAnalyze': lcb + '/surveyAnalyze/statisticAnalyze',
    //相关分析
    '/surveyAnalyze/relatedAnalyze': lcb + '/surveyAnalyze/relatedAnalyze',
    //保存学生答案-多条
    '/surveyAnswer/saveOrUpdateAnswers': lcb + '/surveyAnswer/saveOrUpdateAnswers',
    //获取除去填空简答以外的题目
    '/surveySubject/listNoFillSubjects': lcb + '/surveySubject/listNoFillSubjects',
    //获取指标维度题目
    '/surveyDimension/listByPaperId': lcb + '/surveyDimension/listByPaperId',
    //交叉分析
    '/surveyAnalyze/crossAnalyze': lcb + '/surveyAnalyze/crossAnalyze',
    //获取题目选项
    '/surveySubject/queryOptions': lcb + '/surveySubject/queryOptions',
    //定制分析
    '/surveyAnalyze/customAnalyze': lcb + '/surveyAnalyze/customAnalyze',
    //样本详情
    '/surveyAnalyze/sampleInfo': lcb + '/surveyAnalyze/sampleInfo',
    //学校属性统计
    '/surveyAnalyze/schoolPropRecyleInfos': lcb + '/surveyAnalyze/schoolPropRecyleInfos',
    //回收情况
    '/surveyAnalyze/getRecycleInfos': lcb + '/surveyAnalyze/getRecycleInfos',
    //获取问卷基础信息（判断问卷是否结束）
    '/surveyPaper/getBaseInfo': lcb + '/surveyPaper/getBaseInfo',
    //显示定制分析文件列表
    '/surveyFile/listCustomAnalyzeFiles': lcb + '/surveyFile/listCustomAnalyzeFiles',
    //取消定制分析
    '/surveyFile/cancelCustomAnalyzeFile': lcb + '/surveyFile/cancelCustomAnalyzeFile',
    //统计问卷状态
    '/surveyPaper/statusCount': lcb + '/surveyPaper/statusCount',
    //问卷列表-学生列表
    '/surveyPaper/listForStudent': lcb + '/surveyPaper/listForStudent',
    //导出数据(待开发)
    '/surveyAnalyze/importSbjAnsInfos': lcb + '/surveyAnalyze/importSbjAnsInfos',
    //维度分析
    '/surveyAnalyze/dimensionAnalyze': lcb + '/surveyAnalyze/dimensionAnalyze',
    //预览问卷模板题
    '/surveyPaper/listPreSets': lcb + '/surveyPaper/listPreSets',
    //导出数据结果数量显示
    '/surveyPaper/fileCounts': lcb + '/surveyPaper/fileCounts',
    //修改问卷时间
    '/surveyPaper/updateEndTime': lcb + '/surveyPaper/updateEndTime',
    //一级指标列表
    '/surveyNorm/getLevel1': lcb + '/surveyNorm/getLevel1',
    //新增/修改指标
    '/surveyNorm/create': lcb + '/surveyNorm/create',
    //删除指标
    '/surveyNorm/delete': lcb + '/surveyNorm/delete',
    //上报已经结束的问卷
    '/surveyPaper/reportPapers': lcb + '/surveyPaper/reportPapers',
    //查询一级指标下所有数据
    '/surveyNorm/getLevel1DetailsById': lcb + '/surveyNorm/getLevel1DetailsById',
    //校级-各年级班级情况
    '/physicalHealth/schoolDetails': lcb + '/physicalHealth/schoolDetails',
    //校级-学期下拉菜单
    '/physicalHealth/historySchoolTerms': lcb + '/physicalHealth/historySchoolTerms',
    //区县-查询时间列表
    '/physicalHealth/historyDistrictYears': lcb + '/physicalHealth/historyDistrictYears',
    //区县-概况
    '/physicalHealth/districtProfile': lcb + '/physicalHealth/districtProfile',
    //区县-各类学校详情
    '/physicalHealth/queryDistrictSchoolDetails': lcb + '/physicalHealth/queryDistrictSchoolDetails',
    /**
     * 体质健康接口
     */
    '/physicalHealth/schoolDataQuery': lcb + '/physicalHealth/schoolDataQuery',
    //校级-是否已有上传数据
    '/physicalHealth/exitUploadData': lcb + '/physicalHealth/exitUploadData',
    //校级-报表上传
    '/physicalHealth/dataUpload': lcb + '/physicalHealth/dataUpload',
    //校级-上传数据年份
    '/physicalHealth/historySchoolYears': lcb + '/physicalHealth/historySchoolYears',
    //校级-全校概况
    '/physicalHealth/schoolProfile': lcb + '/physicalHealth/schoolProfile',
    //询问是否上报
    '/physicalHealth/queryReportStatus': lcb + '/physicalHealth/queryReportStatus',
    //下载体测数据
    '/physicalHealth/exportSchoolDatas': lcb + '/physicalHealth/exportSchoolDatas',
    //上报体测数据
    '/physicalHealth/dataReport': lcb + '/physicalHealth/dataReport',
    //下载-区县概况
    '/physicalHealth/exportDistrictDatas': lcb + '/physicalHealth/exportDistrictDatas',

    //校级-自定义查询
    '/physicalHealth/schoolDataQuery': lcb + '/physicalHealth/schoolDataQuery',
    //校级-获取自定义条件
    '/physicalHealth/schoolLevelConditions': lcb + '/physicalHealth/schoolLevelConditions',
    //区县-自定义查询所有条件
    '/physicalHealth/queryDistrictCondition': lcb + '/physicalHealth/queryDistrictCondition',
    //区县-自定义查询
    '/physicalHealth/queryDistrictDatas': lcb + '/physicalHealth/queryDistrictDatas',
    //校级-查询学校上传队列中的文件个数(新增)
    '/physicalHealth/queryWatingUploadFilesCnt': lcb + '/physicalHealth/queryWatingUploadFilesCnt',
    //区县-按年份查询学校
    '/physicalHealth/queryDistrictSchoolIdsByYears': lcb + '/physicalHealth/queryDistrictSchoolIdsByYears',
    //区县-自定义查询
    '/physicalHealth/exporSchoolDatasByParams': lcb + "/physicalHealth/exporSchoolDatasByParams",
    //下载-区县自定义查询
    '/physicalHealth/exportDistrictDatasByParams': lcb + "/physicalHealth/exportDistrictDatasByParams"


};




