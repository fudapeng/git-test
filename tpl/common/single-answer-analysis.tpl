<tr>
	<td class="padding-left2">
		<strong class="margin-left-negative2">答案：</strong>
		{{if answer}}
			{{if type === 4}}
				{{if answer == '0'}}
					×
				{{else if answer == '1'}}
					√
				{{/if}}
			{{else}}
				{{#answer}}
			{{/if}}
		{{else}}
			无
		{{/if}}
	</td>
</tr>
<tr>
	<td class="padding-left2">
		<strong class="margin-left-negative2">解析：</strong>
		{{if comment}}
			{{#comment}}
		{{else}}
			无
		{{/if}}
	</td>
</tr>