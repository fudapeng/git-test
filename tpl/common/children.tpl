{{if recognizeType === 4}}
	<!-- 完型填空 -->
	{{include './cloze'}}
{{else if recognizeType === 5}}
	<!-- 阅读理解 -->
	{{include './sub-vertical-option'}}
{{else}}
	<!-- 普通复合题 -->
	{{include './special-complex'}}
{{/if}}