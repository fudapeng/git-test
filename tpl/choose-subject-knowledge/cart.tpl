<div id="my-paper">
 	<div class="header clearfix">
 		<!-- <img src="../../images/orange-cart.png" alt="cart"> -->
 		已选题目
 		<a href="javascript:;" class="fr clear">清&nbsp;空</a>
 	</div>
	{{if cartNum && cartNum.recognizeTypeNum && cartNum.recognizeTypeNum.length}}
		<div class="choosed-ques">
			<table class="table-style" style="width:100%;">
				<thead class="tr-height">
					<tr>
						<th>题型</th>
						<th>题数</th>
					</tr>
				</thead>
				<tbody>
					{{each cartNum.recognizeTypeNum}}
						<tr class="tr-height" data-id="{{$value.id}}">
							<td>{{$value.recognizeTypeName}}</td>
							<td>{{$value.subjects.length}}</td>
						</tr>
					{{/each}}
				</tbody>
				<tfoot>
					<tr class="tr-height total-num">
						<td>合计</td>
						<td>{{cartNum.totalNum}}</td>
					</tr>
				</tfoot>
			</table>
			<div id="generage-paper">
				{{include './cart-handler'}}
			</div>
		</div>
		<div class="ques-none none">
			暂时还没有题目
		</div>
	{{else}}
		<div class="choosed-ques none">
			<table class="table-style" style="width:100%;">
				<thead class="thead-border-bottom tr-height">
					<tr>
						<th>题型</th>
						<th>题数</th>
					</tr>
				</thead>
				<tbody></tbody>
				<tfoot>
					<tr class="tr-height total-num">
						<td>合计</td>
						<td>0</td>
					</tr>
				</tfoot>
			</table>
			<div id="generage-paper">
				{{include './cart-handler'}}
			</div>
		</div>
		<div class="ques-none">
			暂时还没有题目
		</div>
	{{/if}}

</div>