<h1 id="logo" class="fl"></h1>
<ul id="dr-nav-list" class="clearfix fl">
    {{each menu}}
    <li data-id="{{$value.id}}" data-url="{{$value.url}}">
        <span class="first-menu" data-id="{{$value.id}}">{{$value.name}}</span>
        {{if $value.children}}
        <div class="sec-menu pt5 pb5 pa none clearfix">
            {{each $value.children}}
            <div class="pr sec-menu-data" data-id="{{$value.id}}" data-url="{{$value.url}}">
                <span class="href">{{$value.name}}</span>
                {{if $value.children}}
                <div class="pa third-menu none clearfix pt5 pb5">
                    {{each $value.children}}
                    <span class="href tc Clearfix" data-id="{{$value.id}}" data-url="{{$value.url}}">{{$value.name}}</span>
                    {{/each}}
                </div>
                {{/if}}
            </div>
            {{/each}}
        </div>
        {{/if}}
    </li>
    {{/each}}
</ul>
<div id = "dr-user-info" class = "fr pr">
    <span class = "greetings">你好,<strong>{{user.displayName}}</strong></span>|
    <a class = "leave" href="javascript:;">退出</a>
</div>