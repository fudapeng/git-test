<ul class="page {{theme}}">
    <li data-num="-" class="page-left">&nbsp;</li>
    {{each list}}
        {{if $value === '-'}}
            <li data-num="x" class="uncheck">…</li>
        {{else if $value == current}}
            <li data-num="{{$value}}" class="active">{{$value}}</li>
        {{else}}
            <li data-num="{{$value}}">{{$value}}</li>
        {{/if}}
    {{/each}}
    <li data-num="+" class="page-right">&nbsp;</li>
</ul>
<div class="input-page">
    共{{total}}页，去第<input name="page-num" type="text"/>页
    <a class="page-go" href="javascript:void(0);">GO</a>
</div>