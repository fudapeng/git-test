{{if type === 1 || type === 2}}
	<!-- 单选  多选 垂直显示-->
	{{include './vertical-option'}}
{{else}}
	<div class="body">{{#body}}</div>
{{/if}}