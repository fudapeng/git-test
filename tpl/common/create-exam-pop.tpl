<div id="create-exam-pop" class="pop-up f14 p5">
    <div class="pop-head">
        <h3 class="pop-title">创建考试</h3>
        <a href="javascript:void(0);" class="close-box"></a>
    </div>
    <div class="line-dashed-x"></div>
    <div class="pop-content">
        <dl class="clearfix">
            <dt class="tr fl w100">考试名称：</dt>
            <dd class="fl"><input class="examName" type="text" placeholder="请输入考试名称" name="examName"></dd>
            <dd class="fl"><span class="f12 error-red ml5 none title-error-msg">*不超过30个字</span></dd>
        </dl>
        <dl class="clearfix none">
            <dt class="tr fl w100">诊断负责人：</dt>
            <dd class="fl"><select name="examTeacher">
                <option value="1">YJL</option>
            </select></dd>
        </dl>
        <dl class="clearfix">
            <dt class="tr fl w100">文理科：</dt>
            <dd class="fl"><select name="asFlag">
                <option value="0">不分文理科</option>
                <option value="1">针对文科班</option>
                <option value="2">针对理科班</option>
            </select></dd>
        </dl>
        <dl class="clearfix">
            <dt class="tr fl w100">年级：</dt>
            <dd class="fl"><select name="grade">
            </select></dd>
        </dl>
        <dl class="clearfix eclass-row">
            <dt class="tr fl w100">班级：</dt>
            <dd class="fl error-red">班级档案尚未创建，暂不支持考试功能</dd>
            <dd class="checkboxs none fl">
            </dd>
            <dd class="fl"><span class="f12 error-red ml5 none eclass-empty-error">*必填</span></dd>
        </dl>
        <dl class="clearfix course-row">
            <dt class="tr fl w100">选择科目：</dt>
            <dd class="checkboxs fl">
            </dd>
            <dd class="fl"><span class="f12 error-red ml5 none course-empty-error">*必填</span></dd>
        </dl>
    </div>
    <div class="line-dashed-x"></div>
    <div class="ms-pop-control">
        <a href="javascript:void(0);" class="ms-green-btn w70 f14">保存提交</a>
        <a href="javascript:void(0);" class="ms-green-btn w70 f14">取消</a>
    </div>
</div>