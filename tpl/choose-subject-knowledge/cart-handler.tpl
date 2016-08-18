{{if generatePaper}}
	{{if generatePaper.homeworkId}}
		<a href="javascript:;" id="paper-preview">布置作业</a>
	{{else if generatePaper.examPaperId}}
		<a href="javascript:;" id="paper-preview">生成考试</a>
	{{else}}
		<!-- 南京作业权限-->
		{{if homeworkFlag}}
			<a href="javascript:;" id="create-exam">生成考试</a>
			<a href="javascript:;" id="create-homework">布置作业</a>
		{{else}}
			<a href="javascript:;" id="create-exam">生成考试</a>
		{{/if}}
	{{/if}}
{{else}}
	<!-- 南京作业权限-->
	{{if homeworkFlag}}
		<a href="javascript:;" id="create-exam">生成考试</a>
		<a href="javascript:;" id="create-homework">布置作业</a>
	{{else if targetPractice}}
		<!-- 针对性练习 -->
		<a href="javascript:;" id="target-practice">完成</a>
	{{else}}
		<a href="javascript:;" id="create-exam">生成考试</a>
	{{/if}}
{{/if}}