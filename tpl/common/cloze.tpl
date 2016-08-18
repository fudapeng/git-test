<div class="body">
	{{#body}}
</div>
<table style="width:100%;" class="bs-cloze-option self-defined">
	<tbody>
		{{each subSubjects}}
			<tr>
				<td style="vertical-align:top;">（{{$index + 1}}）</td>
				<td style="width:100%;">
					<table style="width:100%;" class="self-defined">
						<tbody>
							<tr>
								{{each $value.subjectItems}}
									<td style="width:25%;vertical-align:top;">
										<div style="padding-left:20px; padding-right:5px;">
											<span style="margin-left:-20px">{{$value.value}}.&nbsp;</span>
											{{#$value.content}}
										</div>
									</td>
								{{/each}}
			    			</tr>
						</tbody>
					</table>
				</td>
			</tr>
		{{/each}}
	</tbody>
</table>
