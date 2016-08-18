{{if subSubjects && subSubjects.length}}
	<!-- 复合题 -->
	{{each subSubjects}}
		<table class="self-defined">
			<tr><td colspan="2" style="text-align:left;" class="orange-font">（{{$index + 1}}）</td></tr>
			{{include './single-answer-analysis' $value}}
		</table>
	{{/each}}
{{else}}
	<!-- 非复合题 -->
	<table class="self-defined">
		<tbody>
			{{include './single-answer-analysis'}}
		</tbody>
	</table>
{{/if}}