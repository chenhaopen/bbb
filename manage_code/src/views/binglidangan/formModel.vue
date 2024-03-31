<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="80%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" label-width="$template2.back.add.form.base.labelWidth" :rules="rules">
				<el-row>
					<el-col :span="12">
						<el-form-item label="病例编号" prop="binglibianhao">
							<el-input class="list_inp" v-model="form.binglibianhao" :readonly="true" placeholder="病例编号" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="老人姓名" prop="laorenxingming">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.laorenxingming?true:false"
								v-model="form.laorenxingming" 
								placeholder="请选择老人姓名"
								@change="laorenxingmingChange">
								<el-option v-for="(item,index) in laorenxingmingLists" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="家属账号" prop="jiashuzhanghao">
							<el-input class="list_inp" v-model="form.jiashuzhanghao" placeholder="家属账号"
								 type="text" 								:readonly="!isAdd||disabledForm.jiashuzhanghao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="家属姓名" prop="jiashuxingming">
							<el-input class="list_inp" v-model="form.jiashuxingming" placeholder="家属姓名"
								 type="text" 								:readonly="!isAdd||disabledForm.jiashuxingming?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="性别" prop="xingbie">
							<el-input class="list_inp" v-model="form.xingbie" placeholder="性别"
								 type="text" 								:readonly="!isAdd||disabledForm.xingbie?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="年龄" prop="nianling">
							<el-input class="list_inp" v-model="form.nianling" placeholder="年龄"
								 type="text" 								:readonly="!isAdd||disabledForm.nianling?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="病例报告" prop="binglibaogao">
							<uploads
								:disabled="!isAdd||disabledForm.binglibaogao?true:false"
								type="file"
								action="file/upload" 
								tip="请上传病例报告" 
								:limit="1" 
								style="width: 100%;text-align: left;"
								:fileUrls="form.binglibaogao?form.binglibaogao:''" 
								@change="binglibaogaoUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="登记时间" prop="dengjishijian">
							<el-date-picker
								class="list_date"
								v-model="form.dengjishijian"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
								type="datetime"
								:readonly="!isAdd||disabledForm.dengjishijian?true:false"
								placeholder="请选择登记时间" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="病例详情" prop="binglixiangqing">
							<editor :value="form.binglixiangqing" placeholder="请输入病例详情" :readonly="!isAdd||disabledForm.binglixiangqing?true:false"
								class="list_editor" @change="(e)=>editorChange(e,'binglixiangqing')"></editor>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="closeClick">取消</el-button>
					<el-button class="formModel_confirm" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;	
	const emit = defineEmits(['formModelChange'])
	//基础信息
	const tableName = 'binglidangan'
	const formName = '病例档案'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
		binglibianhao : false,
		laorenxingming : false,
		jiashuzhanghao : false,
		jiashuxingming : false,
		xingbie : false,
		nianling : false,
		binglixiangqing : false,
		binglibaogao : false,
		dengjishijian : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	//表单验证
	//匹配整数
	const validateIntNumber = (rule, value, callback) => {
		if (!value) {
			callback();
		} else if (!context?.$toolUtil.isIntNumer(value)) {
			callback(new Error("请输入整数"));
		} else {
			callback();
		}
	}
	//匹配数字
	const validateNumber = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isNumber(value)) {
			callback(new Error("请输入数字"));
		} else {
			callback();
		}
	}
	//匹配手机号码
	const validateMobile = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isMobile(value)) {
			callback(new Error("请输入正确的手机号码"));
		} else {
			callback();
		}
	}
	//匹配电话号码
	const validatePhone = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isPhone(value)) {
			callback(new Error("请输入正确的电话号码"));
		} else {
			callback();
		}
	}
	//匹配邮箱
	const validateEmail = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isEmail(value)) {
			callback(new Error("请输入正确的邮箱地址"));
		} else {
			callback();
		}
	}
	//匹配身份证
	const validateIdCard = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.checkIdCard(value)) {
			callback(new Error("请输入正确的身份证号码"));
		} else {
			callback();
		}
	}
	//匹配网站地址
	const validateUrl = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isURL(value)) {
			callback(new Error("请输入正确的URL地址"));
		} else {
			callback();
		}
	}
	const rules = ref({
		binglibianhao: [
		],
		laorenxingming: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		jiashuzhanghao: [
		],
		jiashuxingming: [
		],
		xingbie: [
		],
		nianling: [
		],
		binglixiangqing: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		binglibaogao: [
		],
		dengjishijian: [
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//老人姓名列表
	const laorenxingmingLists = ref([])
	//病例报告上传回调
	const binglibaogaoUploadSuccess=(e)=>{
		form.value.binglibaogao = e
	}
	//methods

	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			binglibianhao: getUUID(),
			laorenxingming: '',
			jiashuzhanghao: '',
			jiashuxingming: '',
			xingbie: '',
			nianling: '',
			binglixiangqing: '',
			binglibaogao: '',
			dengjishijian: '',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			res.data.data.binglixiangqing = res.data.data.binglixiangqing?(res.data.data.binglixiangqing.replace(reg,'../../../cl32683157/file')):'';
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
			form.value.dengjishijian = context?.$toolUtil.getCurDateTime()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
			// getInfo()
			for(let x in row){
				if(x=='binglibianhao'){
					form.value.binglibianhao = row[x];
					disabledForm.value.binglibianhao = true;
					continue;
				}
				if(x=='laorenxingming'){
					form.value.laorenxingming = row[x];
					disabledForm.value.laorenxingming = true;
					continue;
				}
				if(x=='jiashuzhanghao'){
					form.value.jiashuzhanghao = row[x];
					disabledForm.value.jiashuzhanghao = true;
					continue;
				}
				if(x=='jiashuxingming'){
					form.value.jiashuxingming = row[x];
					disabledForm.value.jiashuxingming = true;
					continue;
				}
				if(x=='xingbie'){
					form.value.xingbie = row[x];
					disabledForm.value.xingbie = true;
					continue;
				}
				if(x=='nianling'){
					form.value.nianling = row[x];
					disabledForm.value.nianling = true;
					continue;
				}
				if(x=='binglixiangqing'){
					form.value.binglixiangqing = row[x];
					disabledForm.value.binglixiangqing = true;
					continue;
				}
				if(x=='binglibaogao'){
					form.value.binglibaogao = row[x];
					disabledForm.value.binglibaogao = true;
					continue;
				}
				if(x=='dengjishijian'){
					form.value.dengjishijian = row[x];
					disabledForm.value.dengjishijian = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
			formVisible.value = true
		}

		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res => {
			var json = res.data.data
		})
		context?.$http({
			url: `option/laorenxinxi/laorenxingming`,
			method: 'get'
		}).then(res=>{
			laorenxingmingLists.value = res.data.data
		})
		//由上级字段带出不可改
		disabledForm.value.jiashuzhanghao = true;
		//由上级字段带出不可改
		disabledForm.value.jiashuxingming = true;
		//由上级字段带出不可改
		disabledForm.value.xingbie = true;
		//由上级字段带出不可改
		disabledForm.value.nianling = true;
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	const laorenxingmingChange=()=>{
		context?.$http({
			url: `follow/laorenxinxi/laorenxingming?columnValue=` + form.value.laorenxingming,
			method: 'get'
		}).then(res=>{
			if(res.data.data.jiashuzhanghao){
				form.value.jiashuzhanghao = res.data.data.jiashuzhanghao
			}
			if(res.data.data.jiashuxingming){
				form.value.jiashuxingming = res.data.data.jiashuxingming
			}
			if(res.data.data.xingbie){
				form.value.xingbie = res.data.data.xingbie
			}
			if(res.data.data.nianling){
				form.value.nianling = res.data.data.nianling
			}
		})
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save=()=>{
		if(form.value.binglibaogao!=null) {
			form.value.binglibaogao = form.value.binglibaogao.replace(new RegExp(context?.$config.url,"g"),"");
		}
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		if(type.value == 'cross'){
			if(crossColumnName.value!=''){
				if(!crossColumnName.value.startsWith('[')){
					for(let o in objcross){
						if(o == crossColumnName.value){
							objcross[o] = crossColumnValue.value
						}
					}
					//修改跨表数据
					changeCrossData(objcross)
				}else{
					crossUserId = context?.$toolUtil.storageGet('userid')
					crossRefId = objcross['id']
					crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
				}
			}
		}
		formRef.value.validate((valid)=>{
			if(valid){
				if(crossUserId&&crossRefId){
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000, 
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get', 
						params: params 
					}).then(res=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post', 
								data: form.value 
							}).then(res=>{
								context?.$toolUtil.message(`操作成功`,'success',()=>{
									formVisible.value = false
									emit('formModelChange')
								})
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(res=>{
						context?.$toolUtil.message(`操作成功`,'success',()=>{
							formVisible.value = false
							emit('formModelChange')
						})
					})
				}
			}
		})
	}
	//修改跨表数据
	const changeCrossData=(row)=>{
		context?.$http({
			url: `${crossTable.value}/update`,
			method: 'post',
			data: row
		}).then(res=>{})
	}
</script>
<style lang="scss" scoped>
	// 表单
	.formModel_form{
		border-radius: 6px;
		padding: 30px;
		box-shadow: 0 0px 0px rgba(85, 255, 255, 0.5);
		// form item
		:deep(.el-form-item) {
			border: 1px solid #ddd;
			margin: 0;
			display: flex;
			//label
			.el-form-item__label {
			 border: 1px solid #ddd;
			 padding: 0;
			 background: rgba(236,236,236,1);
			 display: block;
			 width: 120px;
			 border-width: 0 2px 0 0;
			 text-align: center;
			}
			// 内容盒子
			.el-form-item__content {
				padding: 0 20px;
				display: flex;
				width: calc(100% - 120px);
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				// 输入框
				.list_inp {
					border: 1px solid #ddd;
					box-shadow: 0 0 0px rgba(85, 255, 255, 0.5);
					padding: 0 10px;
					width: 100%;
					line-height: 36px;
					box-sizing: border-box;
					height: 36px;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
						padding: 0;
					}
					.is-focus {
						box-shadow: none !important;
					}
				}
				//日期选择器
				.list_date {
					border: 1px solid #ddd;
					border-radius: 0;
					box-shadow: 0 0 0px rgba(85, 255, 255, 0.5);
					width: 100%;
					line-height: 36px;
					box-sizing: border-box;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
					}
				}
				// 下拉框
				.list_sel {
					border: 1px solid #ddd;
					border-radius: 0;
					box-shadow: 0 0 0px rgba(85, 255, 255, 0.5);
					padding: 0 10px;
					width: 100%;
					line-height: 36px;
					box-sizing: border-box;
					//去掉默认样式
					.select-trigger{
						height: 100%;
						.el-input{
							height: 100%;
							.el-input__wrapper{
								border: none;
								box-shadow: none;
								background: none;
								border-radius: 0;
								height: 100%;
								padding: 0;
							}
							.is-focus {
								box-shadow: none !important;
							}
						}
					}
				}
				// 富文本
				.list_editor {
					background-color: #fff;
					border-radius: 0;
					padding: 0;
					box-shadow: 0 0 0px rgba(85, 255, 255, 0.5);
					margin: 0;
					width: 100%;
					border-color: #ddd;
					border-width: 0;
					border-style: solid;
					height: auto;
				}
				//文件上传样式
				.upload-demo {
					width: 100%;
					//外部盒子
					.el-upload-dragger {
						border: 1px dashed #000;
						cursor: pointer;
						background-color: #fff;
						border-radius: 6px;
						overflow: hidden;
						flex-direction: column;
						display: flex;
						width: 200px;
						align-items: center;
						box-sizing: border-box;
						text-align: center;
						height: 100px;
					}
					//图标
					.el-icon--upload {
						color: #000;
						font-size: 50px;
						line-height: 0;
					}
					//提示文字
					.el-upload__text {
						margin: 7px 0 0;
						color: #999;
						font-size: 12px;
						em {
							color: #409EFF;
						}
					}
					//提示文字
					.el-upload__tip {
						margin: 7px 0 0;
						color: #999;
						font-size: 12px;
					}
				}
			}
		}
	}
	// 按钮盒子
	.formModel_btn_box {
		padding: 40px 0 0;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		.formModel_cancel {
			border: 0;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 24px;
			margin: 0 10px 0 0;
			outline: none;
			color: #fff;
			background: rgba(27, 78, 133, 1);
			width: auto;
			font-size: 14px;
			height: 32px;
		}
		.formModel_cancel:hover {
			background: rgba(27, 78, 133, 0.5);
		}
		
		.formModel_confirm {
			border: 0;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 24px;
			margin: 0 10px 0 0;
			outline: none;
			color: #fff;
			background: rgba(241, 49, 100, 1);
			width: auto;
			font-size: 14px;
			height: 32px;
		}
		.formModel_confirm:hover {
			background: rgba(241, 49, 100, .5);
		}
	}
</style>