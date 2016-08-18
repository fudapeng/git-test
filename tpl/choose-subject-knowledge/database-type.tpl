{{if isShowSchoolDistrict}}
	{{if isDirector}}
		<li><a data-db-type="public" class="active" href="javascript:void(0);">公共题库</a></li>
		<li><a data-db-type="district" href="javascript:void(0);">区级题库</a></li>
		<li><a data-db-type="private" href="javascript:void(0);">个人题库</a></li>
	{{else if isTeacher}}
		<li><a data-db-type="public" class="active" href="javascript:void(0);">公共题库</a></li>
		<li><a data-db-type="district" href="javascript:void(0);">区级题库</a></li>
		<li><a data-db-type="school" href="javascript:void(0);">校级题库</a></li>
		<li><a data-db-type="private" href="javascript:void(0);">个人题库</a></li>
	{{/if}}
{{else}}
	<li><a data-db-type="public" class="active" href="javascript:void(0);">公共题库</a></li>
	<li><a data-db-type="private" href="javascript:void(0);">个人题库</a></li>
{{/if}}