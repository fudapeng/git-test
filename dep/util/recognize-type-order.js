/**
 * fudapeng
 */

var RecogIndexName = require('./recognize-index-name');

	function recognizeTypeOrder(schoolStageId, courseId, isShowUnknow) {
        var recognizeList;
        switch (schoolStageId) {
            case 1 :
            {
                //初中
                switch (courseId) {
                    case 1:
                    {//语文

                        recognizeList = [RecogIndexName.CH_SINGLE_OPTION,//单选题
                            RecogIndexName.CH_MODERN_ARTICLE_READING,//现代文阅读
                            RecogIndexName.CH_CLASSICAL_READING,//文言文阅读
                            RecogIndexName.CH_POETRY_APPRECIATE,//诗歌鉴赏
                            RecogIndexName.CH_LANGUAGE_EXPRESS,//语言表达
                            RecogIndexName.CH_FAMOUS_READING,//名著导读
                            RecogIndexName.CH_COMPRE_QUESTION,//综合题
                            RecogIndexName.CH_DICTION,  //默写
                            RecogIndexName.CH_WRITING,//书写
                            RecogIndexName.CH_COMPOSITION//作文
                        ];
                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.CH_UNKNOW);
                        }


                        return recognizeList;
                    }
                    case 2:
                    {//数学
                        recognizeList = [
                            RecogIndexName.MATH_SINGLE_OPTION,//单选题
                            RecogIndexName.MATH_JUDGEMENT,//判断题
                            RecogIndexName.MATH_FILLING_BANK,//填空题
                            RecogIndexName.MATH_ANSWER_QUES//解答题
                        ];
                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.MATH_UNKNOW);
                        }
                        return recognizeList;
                    }
                    case 3:
                    {//英语
                        recognizeList = [RecogIndexName.ENG_SINGLE_OPTION,//单选题
                            RecogIndexName.ENG_CLOZE,//完形填空
                            RecogIndexName.ENG_READING_UNDERSTAND,//阅读理解
                            RecogIndexName.ENG_SENTENCE_CONVERSION, //句型转换
                            RecogIndexName.ENG_WORD_SPELLING,//单词拼写
                            RecogIndexName.ENG_SUPPLEMENT_SENTENCE,//补充句子
                            RecogIndexName.ENG_TRANSLATE,//翻译
                            RecogIndexName.ENG_CORRECTION,//改错
                            RecogIndexName.ENG_WORD_SENTENCES,//单词造句
                            RecogIndexName.ENG_COMPREHENSION_FILL,//阅读填空
                            RecogIndexName.ENG_WORD_FILL,//选词填空
                            RecogIndexName.ENG_WRITTEN_EXPRESS//书面表达
                        ];
                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.ENG_UNKNOW);
                        }
                        return recognizeList;
                    }
                    case 4:
                    {//物理
                        recognizeList = [RecogIndexName.PHY_SINGLE_OPTION,//单选题
                            RecogIndexName.PHY_MULTI_OPTION,//多选题
                            RecogIndexName.PHY_FILLING_BANK,//填空题
                            RecogIndexName.PHY_EXPERIMENT,//实验题
                            RecogIndexName.PHY_CALCULATE,//计算题
                            RecogIndexName.PHY_DRAWING,//作图题
                            RecogIndexName.PHY_ANSWER_QUES,//简答题
                            RecogIndexName.PHY_COMPRE_QUESTION//综合题
                        ];
                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.PHY_UNKNOW);
                        }
                        return recognizeList;
                    }
                    case 5:
                    {//化学
                        recognizeList = [RecogIndexName.CHEMI_SINGLE_OPTION,//单选题
                            RecogIndexName.CHEMI_FILLING_BANK,//填空题
                            RecogIndexName.CHEMI_ANSWER_QUES,//简答题
                            RecogIndexName.CHEMI_EXPLORE,//探究题
                            RecogIndexName.CHEMI_MASSAGE_ANALYSIS,//信息分析题
                            RecogIndexName.CHEMI_INFERENCE,//推断题
                            RecogIndexName.CHEMI_CALCULATE//计算题
                        ];
                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.CHEMI_UNKNOW);
                        }
                        return recognizeList;
                    }
                    case 6:
                    {//生物
                        recognizeList = [RecogIndexName.BIO_SINGLE_OPTION,//单选题
                            RecogIndexName.BIO_JUDGEMENT,//判断题
                            RecogIndexName.BIO_FILLING_BANK,//填空题
                            RecogIndexName.BIO_CONNECTION,//连线题
                            RecogIndexName.BIO_COMPRE_QUESTION,//综合题
                            RecogIndexName.BIO_EXPLORE//探究题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.BIO_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 7:
                    {//政治
                        recognizeList = [RecogIndexName.POLI_SINGLE_OPTION,//单选题
                            RecogIndexName.POLI_MULTI_OPTION,//多选题
                            RecogIndexName.POLI_JUDGEMENT, //判断题
                            RecogIndexName.POLI_FILLING_BANK,//填空题
                            RecogIndexName.POLI_EXPLORE,//探究题
                            RecogIndexName.POLI_EXPRESS,//论述题
                            RecogIndexName.POLI_COMPRE_QUESTION//综合题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.POLI_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 8:
                    {//历史
                        recognizeList = [RecogIndexName.HISTORY_SINGLE_OPTION,//单选题
                            RecogIndexName.HISTORY_JUDGEMENT,//判断题
                            RecogIndexName.HISTORY_FILLING_BANK,//填空题
                            RecogIndexName.HISTORY_CONNECTION,//连线题
                            RecogIndexName.HISTORY_LIST,//列举题
                            RecogIndexName.HISTORY_COMPRE_QUESTION,//综合题
                            RecogIndexName.HISTORY_ESSAY//问答题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.HISTORY_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 9:
                    {//地理
                        recognizeList = [
                            RecogIndexName.GEO_SINGLE_OPTION,//单选题
                            RecogIndexName.GEO_JUDGEMENT,//判断题
                            RecogIndexName.GEO_FILLING_BANK,//填空题
                            RecogIndexName.GEO_CONNECTION,//连线题
                            RecogIndexName.GEO_COMPRE_QUESTION//综合题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.GEO_UNKNOW);
                        }

                        return recognizeList;
                    }
                    default:
                    {
                        throw new Error("学科id不对");
                    }
                }
            }
            case 2:
            {
                //高中
                switch (courseId) {
                    case 1:
                    {//语文

                        recognizeList = [RecogIndexName.CH_SINGLE_OPTION,//单选题
                            RecogIndexName.CH_MODERN_ARTICLE_READING,//现代文阅读
                            RecogIndexName.CH_CLASSICAL_READING,//文言文阅读
                            RecogIndexName.CH_POETRY_APPRECIATE,//诗歌鉴赏
                            RecogIndexName.CH_LANGUAGE_EXPRESS,//语言表达
                            RecogIndexName.CH_FAMOUS_READING,//名著导读
                            RecogIndexName.CH_COMPRE_QUESTION,//综合题
                            RecogIndexName.CH_DICTION,  //默写
                            RecogIndexName.CH_COMPOSITION//作文
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.CH_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 2:
                    {//数学

                        recognizeList = [
                            RecogIndexName.MATH_SINGLE_OPTION,//单选题
                            RecogIndexName.MATH_FILLING_BANK,//填空题
                            RecogIndexName.MATH_ANSWER_QUES//解答题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.MATH_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 3:
                    {//英语
                        recognizeList = [RecogIndexName.ENG_SINGLE_OPTION,//单选题
                            RecogIndexName.ENG_CLOZE, //完形填空
                            RecogIndexName.ENG_READING_UNDERSTAND,//阅读理解
                            RecogIndexName.ENG_WORD_SPELLING,//单词拼写
                            RecogIndexName.ENG_PASSAGE_CORRECTION,//短文改错
                            RecogIndexName.ENG_TRANSLATE,//翻译
                            RecogIndexName.ENG_COMPREHENSION_FILL,//阅读填空
                            RecogIndexName.ENG_MASSAGE_MATCHING,//信息匹配
                            RecogIndexName.ENG_WRITTEN_EXPRESS//书面表达
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.ENG_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 4:
                    {//物理

                        recognizeList = [RecogIndexName.PHY_SINGLE_OPTION,//单选题
                            RecogIndexName.PHY_MULTI_OPTION,//多选题
                            RecogIndexName.PHY_FILLING_BANK,//填空题
                            RecogIndexName.PHY_EXPERIMENT,//实验题
                            RecogIndexName.PHY_CALCULATE,//计算题
                            RecogIndexName.PHY_DRAWING,//作图题
                            RecogIndexName.PHY_ANSWER_QUES//简答题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.PHY_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 5:
                    {//化学

                        recognizeList = [RecogIndexName.CHEMI_SINGLE_OPTION,//单选题
                            RecogIndexName.CHEMI_FILLING_BANK,//填空题
                            RecogIndexName.CHEMI_EXPERIMENT,//实验题
                            RecogIndexName.CHEMI_CALCULATE,//计算题
                            RecogIndexName.CHEMI_ANSWER_QUES,//简答题
                            RecogIndexName.CHEMI_INFERENCE//推断题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.CHEMI_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 6:
                    {//生物

                        recognizeList = [RecogIndexName.BIO_SINGLE_OPTION,//单选题
                            RecogIndexName.BIO_MULTI_OPTION,//多选题
                            RecogIndexName.BIO_COMPRE_QUESTION//综合题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.BIO_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 7:
                    {//政治

                        recognizeList = [RecogIndexName.POLI_SINGLE_OPTION,//单选题
                            RecogIndexName.POLI_MULTI_OPTION,//多选题
                            RecogIndexName.POLI_JUDGEMENT,//判断题
                            RecogIndexName.POLI_FILLING_BANK,//填空题
                            RecogIndexName.POLI_EXPLORE,//探究题
                            RecogIndexName.POLI_DISTINGUISH,//辨析题
                            RecogIndexName.POLI_COMPRE_QUESTION,//综合题
                            RecogIndexName.POLI_ANSWER_QUES//简答题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.POLI_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 8:
                    {//历史

                        recognizeList = [RecogIndexName.HISTORY_SINGLE_OPTION,//单选题
                            RecogIndexName.HISTORY_JUDGEMENT,//判断题
                            RecogIndexName.HISTORY_FILLING_BANK,//填空题
                            RecogIndexName.HISTORY_CONNECTION,//连线题
                            RecogIndexName.HISTORY_COMPRE_QUESTION,//综合题
                            RecogIndexName.HISTORY_ESSAY//问答题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.HISTORY_UNKNOW);
                        }

                        return recognizeList;
                    }
                    case 9:
                    {//地理

                        recognizeList = [
                            RecogIndexName.GEO_SINGLE_OPTION,//单选题
                            RecogIndexName.GEO_MULTI_OPTION,//多选题
                            RecogIndexName.GEO_JUDGEMENT,//判断题
                            RecogIndexName.GEO_FILLING_BANK,//填空题
                            RecogIndexName.GEO_COMPRE_QUESTION//综合题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.GEO_UNKNOW);
                        }

                        return recognizeList;
                    }
                    default:
                    {
                        throw new Error("学科id不对");
                    }
                }
            }
            case 3:
                //小学
                switch(courseId){
                    case 1:
                        //语文
                        recognizeList = [RecogIndexName.CH_SINGLE_OPTION,//单选题
                            RecogIndexName.CH_MULTI_OPTION,//多选题
                            RecogIndexName.CH_JUDGEMENT,//判断题
                            RecogIndexName.CH_FILLING_BANK,//填空
                            RecogIndexName.CH_MODERN_ARTICLE_READING,//现代文阅读
                            RecogIndexName.CH_CLASSICAL_READING,//文言文阅读
                            RecogIndexName.CH_LANGUAGE_EXPRESS,//语言表达
                            RecogIndexName.CH_WRITING,//书写
                            RecogIndexName.CH_SENTENCE_CONVERSION, //句型转换
                            RecogIndexName.CH_MASSAGE_MATCHING, //信息匹配
                            RecogIndexName.CH_CONNECTION, //连线题
                            RecogIndexName.CH_SORT, //排序
                            RecogIndexName.CH_COMPOSITION//作文
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.CH_UNKNOW);
                        }

                        return recognizeList;
                    case 2:
                        //数学
                        recognizeList = [
                            RecogIndexName.MATH_SINGLE_OPTION,//单选题
                            RecogIndexName.MATH_MULTI_OPTION,//多选
                            RecogIndexName.MATH_JUDGEMENT,//判断题
                            RecogIndexName.MATH_FILLING_BANK,//填空题
                            RecogIndexName.MATH_ANSWER_QUES //解答题
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.MATH_UNKNOW);
                        }

                        return recognizeList;
                    case 3:
                        //英语
                        recognizeList = [RecogIndexName.ENG_SINGLE_OPTION,//单选题
                            RecogIndexName.ENG_WORD_SPELLING,//单词拼写
                            RecogIndexName.ENG_TRANSLATE,//翻译
                            RecogIndexName.ENG_READING_UNDERSTAND,//阅读理解
                            RecogIndexName.ENG_FILLING_BANK,//填空
                            RecogIndexName.ENG_CONNECTION, //连线题
                            RecogIndexName.ENG_SORT, //排序题
                            RecogIndexName.ENG_WRITTEN_EXPRESS//书面表达
                        ];

                        if (isShowUnknow) {
                            recognizeList.push(RecogIndexName.ENG_UNKNOW);
                        }

                        return recognizeList;

                }
                break;
            default:
            {
                throw new Error("学段id不对");
            }
        }
    }
    //flag 非必填，boolean类型，true代表显示未知题型
    module.exports = function (schoolStageId, courseId, flag) {
        schoolStageId = schoolStageId - 0;
        courseId = courseId - 0;
        return recognizeTypeOrder(schoolStageId, courseId, !!flag);
    }
