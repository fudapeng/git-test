<div class="body">
	{{#body}}
</div>
{{each subSubjects}}
    {{if $value.type === 1 || $value.type === 2}}
    	<!-- 复合类型选择题 -->
		<div class="padding-left3">
			<div>
				<span class="margin-left-negative3">（{{$index + 1}}）</span>{{#$value.body}}
			</div>
			{{each $value.subjectItems as item}}
				<table class="self-defined">
					<tr>
						<td class="padding-left1"><span class="margin-left-negative1">{{item.value}}.&nbsp;</span>{{#item.content}}</td>
					</tr>
				</table>
			{{/each}}
		</div>
    {{else}}
    	<table class="self-defined">
	    	<tr>
	            <td class="padding-left3"><span class="margin-left-negative3">{{$value.num|$value.position}}</span>.{{#$value.body}}</td>
	        </tr>
	    </table>
    {{/if}}
{{/each}}
