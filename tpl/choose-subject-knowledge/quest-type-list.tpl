<li><a data-recognize-type-id="" class="active" href="javascript:void(0);">全部</a></li>
{{each}}
<li><a data-recognize-type-id="{{$value.id}}" href="javascript:void(0);" title="{{$value.name}}">{{$value.name}}</a></li>
{{/each}}