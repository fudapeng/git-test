{{each list}}
    {{if isDisable}}
        {{if selectedId == $value.id}}
            <div class="check-item fl">
                <label title="{{$value.name}}"><input checked class="vm" disabled name="{{name}}" value="{{$value.id}}" type="checkbox">{{$value.name}}</label>
            </div>
        {{else}}
            <div class="check-item fl">
                <label title="{{$value.name}}"><input class="vm" disabled name="{{name}}" value="{{$value.id}}" type="checkbox">{{$value.name}}</label>
            </div>
        {{/if}}
    {{else}}
        <div class="check-item fl">
            <label title="{{$value.name}}"><input class="vm" name="{{name}}" value="{{$value.id}}" type="checkbox">{{$value.name}}</label>
        </div>
    {{/if}}
{{/each}}