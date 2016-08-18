<!--南京添加字段isHaveIO-->
{{each}}
	<div class="question" data-id="{{$value.id}}" data-recognize-type-id="{{$value.recognizeType}}">
    	<div class="property clearfix">
            <span class="ques-type">题型：{{$value.recognizeTypeName}}</span>
            <span>难度：{{$value.complexity / 100}}</span>
            {{if $value.isShowEvaluate}}
                <span class="test-builders">出题人：<strong title="{{$value.user.name}}  {{$value.school.name}}">{{$value.user.name}}&nbsp;&nbsp;{{$value.school.name}}</strong></span>
            {{/if}}
            <span class="fr chosen-count">组卷次数：
                <strong class="orange-font" style="font-weight:normal;">{{$value.chosenCount || coverCount}}</strong>
            </span>
            {{if $value.isShowEvaluate}}
            <dl class="fr evalucate">
                <dt class="fl">试题评价：</dt>
                {{each $value.evaluateFlags}}
                    {{if $value}}
                        <dd class="fl yes"></dd>
                    {{else}}
                        <dd class="fl no"></dd>
                    {{/if}}
                {{/each}}
            </dl>
            {{/if}}
    	</div>
    	<div class="ques-content">
			{{if $value.subSubjects && $value.subSubjects.length}}
			<!-- 有子题目 -->
				{{include './children' $value}}
			{{else}}
			<!-- 没有子题目 -->
				{{include './child-none' $value}}
			{{/if}}
    	</div>
    	<div class="handler-btn clearfix">
    		<button class="fl answer-analysis-btn">答案与解析</button>
            {{if $value.isShowEvaluate}}
                <dl class="fl evalucate">
                    <dt class="fl">我的评分：</dt>
                    {{each $value.myEvaluateFlags}}
                        {{if $value}}
                            <dd class="fl yes" data-num='{{$index + 1}}'></dd>
                        {{else}}
                            <dd class="fl no" data-num='{{$index + 1}}'></dd>
                        {{/if}}
                    {{/each}}
                </dl>
            {{/if}}
    		<button class="fr download">下载试题</button>
    		{{if $value.isFavorite}}
                <button class="fr store active">取消收藏</button>
            {{else}}
                <button class="fr store">收藏试题</button>
            {{/if}}

            {{if $value.isHasChoosed}}
                <button class="fr input-paper active">移出试题</button>
            {{else}}
                <button class="fr input-paper">加入试题</button>
            {{/if}}
    	</div>
    	<div class="answer-analysis none">
    		{{include './answer-analysis' $value}}
    	</div>
    </div>
{{/each}}