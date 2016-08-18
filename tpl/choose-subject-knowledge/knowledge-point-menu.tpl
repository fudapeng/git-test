<div class="knowledge-point-menu">
    <div class="c-title pr">
        <div class="pa green-block"></div>
        <h3>高中-数学</h3><a class="green-change-btn pa" href="javascript:void(0);">【更改】</a>
    </div>
    <div class="all-title">
        <h3><a data-id="" class="active" href="javascript:void(0);">全部知识点</a></h3>
    </div>
    <div class="single-point">
    {{each}}
        <ul class="first">
            <li class="clearfix">
                {{if $value.children.length > 0}}
                    <i></i><a href="javascript:void(0);" data-level="1" data-id="{{$value.id}}" title="{{$value.name}}">{{$value.name}}</a>
                    {{each $value.children as sec}}
                        <ul class="sec none">

                            {{if sec.children.length > 0}}
                            <li class="clearfix">
                                <i></i><a href="javascript:void(0);" data-level="2" data-has-thd="true" data-id="{{sec.id}}" data-parent-id="{{$value.id}}" title="{{sec.name}}" >{{sec.name}}</a>
                                <ul class="three none">
                                    {{each sec.children as three}}
                                        <li class="clearfix">
                                            <a href="javascript:void(0);" data-level="3" data-id="{{three.id}}" title="{{three.name}}">{{three.name}}</a>
                                        </li>
                                    {{/each}}
                                </ul>
                            </li>
                            {{else}}
                            <li class="clearfix">
                                <i class="hidden"></i><a href="javascript:void(0);" data-level="2" data-has-thd="false" data-id="{{sec.id}}" data-parent-id="{{$value.id}}" title="{{sec.name}}" >{{sec.name}}</a>
                            </li>
                            {{/if}}
                        </ul>
                    {{/each}}
                {{else}}
                    <i class="hidden"></i><a href="javascript:void(0);" data-level="1" data-id="{{$value.id}}" title="{{$value.name}}">{{$value.name}}</a>
                {{/if}}
            </li>
        </ul>
    {{/each}}
    </div>
</div>