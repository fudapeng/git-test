<div class="body">
	{{#body}}
</div>
<table class="self-defined">
    {{each subjectItems}}
        <tr>
            <td class="padding-left1"><span class="margin-left-negative1">{{$value.value}}.&nbsp;</span>{{#$value.content}}</td>
        </tr>
    {{/each}}
</table>