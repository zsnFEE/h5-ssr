import Request from "../common/request";

// 获取首页信息
export const getMyClass = data =>
  Request.get("/api/schedule/get_my_class", data);

// 获取哪天有课
export const getMonth = data =>
  Request.get("/api/schedule/get_month_schedule", data);

// 刷新token
export const refreshToken = data =>
  Request.post("/api/login/refresh_token", data);

//
export const getCookie = data => Request.post("/api/tools/show_cookie", data);

// 获取首页信息
export const getAppList = data =>
  Request.get("/api/classes/get_app_list", data);

// 获取课程信息
export const getCourseInfo = data =>
  Request.get("/api/classes/get_course_info", data);

// 获取我的信息
export const getMyInfo = data => Request.get("/api/classes/my", data);

// 观看记录
export const studyLog = data => Request.post("/api/classes/study_log", data);

// 二阶列表
export const getSubjectClass = data =>
  Request.get("/api/classes/get_subject_class", data);

//二维码
export const getMemberCode = data =>
  Request.get("/api/member/get_member_code", data);

// 获取验证码
export const getLoginSms = data => Request.post("/api/sms/code", data);

// 登录
export const getPhoneLogin = data => Request.post("/api/sms/check", data);

//登录login
export const smsLogin = data => Request.post("/api/sms/login", data);

// 收货信息
export const updateOrderReceiver = data =>
  Request.post("/api/quickapp/update_order_receiver", data);

// 支付成功二次确认
export const getPaymentConfirmation = data =>
  Request.post("/api/quickapp/get_order_pay_status", data);

//
export const statsLog = data => Request.post("/api/publics/stats_log", data);

// 获取二维码
export const getCanvas = data => Request.get("/api/quickapp/tqr", data);

// 获取老师二维码与微信
export const getWechat = data =>
  Request.get("/api/quickapp/teacher_info", data);

// 获取我的订单
export const getMyOrder = data => Request.get("/api/member/get_my_order", data);

// 获取详细订单
export const getOrderInfo = (data, header) =>
  Request.get("/api/order/get_order_info", data, header);

// 课程详情
export const getClassInfo = data => Request.get("/api/classes/info", data);

// 创建订单
export const postCreate = data => Request.post("/api/order/create", data);

// pc获取课程详情页信息
export const getCourse = data => Request.get("/api/classes/info", data);

//web 获取课程详情
export const getClssInfomation = data =>
  Request.get("/api/classes/get_class_info", data);

// 获取pc目录信息
// export const getCatalog = data => Request.get('', data)

// 获取我的订单
// export const getMyOrder = data => Request.get("/api/member/get_my_order", data);

// pc创建订单
export const getCreat = data => Request.get("/api/order/create", data);

// pc微信支付二维码支付
export const getWXpay = data => Request.get("/fe/pay/pay_wx_qr", data);

// pc支付宝二维码支付
export const getAlipay = data => Request.get("/fe/pay/pay_ali_qr", data);

// 获取订单详情
export const getDetails = data =>
  Request.get("/api/order/get_order_info", data);

// pc查看支付状态接口
export const Querystatus = data =>
  Request.get("/api/quickapp/get_order_pay_status", data);

//查看我的直播课程
export const getMyLiveClass = data =>
  Request.get("/api/schedule/get_my_live_class", data);

//我的订单——名字
export const getGoods = data => Request.get("/api/publics/get_goods", data);

//获取我的收货地址
export const getMyAddress = data =>
  Request.get("/api/member/get_my_address", data);

//删除我的收货地址
export const dropAddress = data =>
  Request.post("/api/member/drop_address", data);

//添加我的收货地址
export const addAddress = data => Request.post("/api/member/add_address", data);

//修改我的收货地址
export const updateAddress = data =>
  Request.post("/api/member/update_address", data);

//获取我的录播课程
export const getMyRecordClass = data =>
  Request.get("/api/schedule/get_my_record_class", data);

//获取我的录播课程列表
export const getMyRecordClasses = data =>
  Request.get("/api/schedule/get_my_record_classes", data);

//获取我的录播课节
export const getMyClassCourse = data =>
  Request.get("/api/schedule/get_my_class_course", data);

//录入我的个人信息
export const updateProfile = data =>
  Request.post("/api/member/update_profile", data);

//我的个人信息
export const apiInfo = data => Request.post("/api/member/api_info", data);

//阿里付款
export const aiPay = data => Request.post("/api/order/app_wap_alipay", data);

//查看订单支付状态
export const getOrderPayStatus = data =>
  Request.post("/api/quickapp/get_order_pay_status", data);

//小课堂列表
export const getSmallClass = data =>
  Request.get("/api/smallclass/get_class", data);

//小课堂详情
export const getSmallClassDetail = data =>
  Request.get("/api/smallclass/get_class_detail", data);
//我的收益
export const getIncome = data => Request.get("/api/member/income", data);

//金额提现
export const postApiWidthdraw = data =>
  Request.post("/api/member/api_widthdraw", data);

//获取jssdk信息
export const getJssdkConfig = data =>
  Request.post("/api/publics/jssdk_config", data);

//验证原手机号
export const checkPhone = data => Request.post("/api/member/check_phone", data);

// 修改手机号接口
export const resetPhone = data => Request.post("/api/member/reset_phone", data);

//获取报告详情
export const getReportinfo = data =>
  Request.get("/api/report/get_report_info", data);

//学生上传作品
export const saveWorks = data => Request.post("/api/report/save_works", data);

//获取需要学生评价的接口
export const getEvaluatelist = data =>
  Request.get("/api/report/get_schedule_member", data);

//老师填写评价
export const Submitevaluate = data =>
  Request.post("/api/report/save_comment", data);

//获取播放地址
export const getPlayUrl = data =>
  Request.get("/api/classes/get_play_url", data);

//删除作品
export const removeWorks = data =>
  Request.post("/api/report/remove_works", data);

//获取goods_id
export const getExperienceGoods = data =>
  Request.get("/api/publics/get_experience_goods", data);

//销售课程
export const getSaleClass = data =>
  Request.get("/api/classes/get_sale_class", data);
//课程分类
export const getClassCategory = data =>
  Request.get("/api/classes/get_class_category", data);

//获取oss
export const getOssSts = data => Request.get("/api/oss/sts", data);

//api/settled/presonal_settled_add 个人入驻
export const presonalAdd = data =>
  Request.post("/api/settled/presonal_settled_add", data);

//api/settled/org_settled_add   机构入驻  post
export const orgAdd = data =>
  Request.post("/api/settled/org_settled_add", data);

//api/settled/get_apply  检查是否提交过入驻
export const getApply = data => Request.get("api/settled/get_apply", data);

//可领优惠券列表
export const getCouponList = data =>
  Request.post("/api/usercoupon/getCouponList", data);

//查看惠券列表
export const getUserCouponList = data =>
  Request.post("/api/usercoupon/getUserCouponList", data);

//领取优惠券
export const setUserCoupon = data =>
  Request.post("/api/usercoupon/setUserCoupon", data);

// 使用优惠券 /api/useusercoupon/goodpay
export const useuserCoupon = data =>
  Request.post("/api/useusercoupon/goodpay", data);

//订单确认收货
export const confirmOrder = data =>
  Request.get("/api/order/confirm_order", data);

//题干详情
export const getcoursetopic = data =>
  Request.get("/api/topic/get_course_topic", data);

//提交答案
export const saveAnswer = data => Request.post("/api/topic/save_answer", data);

//查看以提交答案
export const myAnswers = data => Request.get("/api/topic/my_answers", data);

//设置老师的答题
export const setTeacherAnswer = data =>
  Request.post("/api/AnsweringMachine/setTeacherAnswer", data);

//学生获取答题卡题目
export const getTeacherAnswer = data =>
  Request.get("/api/AnsweringMachine/getTeacherAnswer", data);

//学生提交答案
export const setStudentAnswer = data =>
  Request.post("/api/AnsweringMachine/setStudentAnswer", data);

//答题情况接口
export const answerstats = data => Request.get("/api/topic/answer_stats", data);

//学生查看随堂练习答案
export const myAnswerStats = data =>
  Request.get("/api/topic/my_answer_stats", data);

//答案统计  get  参数 clazz_schedule_id 课节id
export const answerStatistics = data =>
  Request.get("/api/AnsweringMachine/answerStatistics", data);

//结束答题。  post 参数 clazz_schedule_id 课节id
export const endTeacherAnswer = data =>
  Request.post("/api/AnsweringMachine/endTeacherAnswer", data);

// 再来一题  get 参数 clazz_schedule_id 课节id
export const againAnswer = data =>
  Request.get("/api/AnsweringMachine/againAnswer", data);

//学生答题明细  get
export const answerTeacherDetailed = data =>
  Request.get("/api/AnsweringMachine/answerTeacherDetailed", data);

//  post请求    参数 schedule_id   老师收卷接口
export const collectpaper = data =>
  Request.post("/api/topic/collect_paper", data);

//学生查看学生答题明细  get clazz_schedule_id
export const answerStudentDetailed = data =>
  Request.get("/api/AnsweringMachine/answerStudentDetailed", data);

//   get请求  参数 schedule_id  topic_id发布试卷可以传空或者不传topic_id
export const publishTopic = data =>
  Request.get("/api/topic/publish_topic", data);

//微信号解绑
export const wxUnbind = data => Request.post("/api/member/wx_unbind", data);

// api/schedule/get_student_ai_course   获取ai课列表  没有参数    18100000601先用这个账号测试
export const getStudentAiCourse = data =>
  Request.get("/api/schedule/get_student_ai_course", data);

// 兑换优惠券
export const setExchangeCoupon = data =>
  Request.post("/api/Exchange/setExchangeCoupon", data);

//核对验证码
export const checkSms = data => Request.post("/api/sms/check_sms", data);

//发送验证码
export const sendOutCode = data => Request.post("/api/sms/code", data);

//修改密码
export const updatePassword = data =>
  Request.post("/api/sms/update_password", data);

//个人信息与菜单栏
export const getAppMenu = data => Request.get("/api/app/get_app_menu", data);

//获取订单状态
export const getOrderStatus = (data, headers) =>
  Request.get("/api/quickapp/get_order_pay_status", data, headers);

//获取花名册数据
export const getScheduleRoster = data =>
  Request.get("/api/schedule/get_schedule_roster", data);

//获取本堂课件
export const getScheduleSlides = data =>
  Request.get("/api/Slides/get_schedule_slides", data);

//获取课件库
export const getCourseAllSlides = data =>
  Request.get("/api/Slides/get_course_all_slides", data);

//获取课程笔记
export const getLessonSnapboard = data =>
  Request.get("/api/classes/get_lesson_snapboard", data);

//删除课程笔记
export const delLessonSnap = data =>
  Request.post("/api/classes/del_lesson_snapboard", data);

// 教师查看课堂报告
export const getTeacherClassReport = data =>
  Request.get("/api/schedule/get_class_report", data);

// 教师对学生评价
export const saveEvaluate = data =>
  Request.post("/api/schedule/save_evaluate", data);

// 提交学生评价
export const addEvaluation = data =>
  Request.post("/api/schedule/add_evaluation", data);

// 学生学习报告
export const getLearningReport = data =>
  Request.get("/api/schedule/get_learning_report", data);

// 获取课后评价的问题及选项
export const getEvaluationQuestion = data =>
  Request.get("/api/schedule/get_evaluation_question", data);

// 获取学生课堂报告是否可以可以进入
export const getMyLiveClassStatus = data =>
  Request.get("/api/schedule/get_my_live_class_status", data);

// 学生新版课表获取排课日历
export const getScheduleCalendar = data =>
  Request.get("/api/schedule/get_schedule_calendar", data);

// 学生新版课表 学生课表
export const studentPlanSchedule = data =>
  Request.get("/api/schedule/student_plan_schedule", data);

// 学生新版课表 -录播程列表
export const myRecordClassList = data =>
  Request.get("/api/schedule/my_record_class_list", data);

// 学生新版课表 -综合课程程列表
export const myLiveClassList = data =>
  Request.get("/api/schedule/my_live_class_list", data);

// 学生新版课表 -课程下单元列表
export const myUnitList = data =>
  Request.get("/api/schedule/my_unit_list", data);

// 学生新版课表 -获取指定单元直播课节
export const myLiveCourseList = data =>
  Request.get("/api/schedule/my_live_course_list", data);

// 学生新版课表 获取排课日历 兼容pc
export const getStudentMonthSchedule = data =>
  Request.get("/api/schedule/get_student_month_schedule", data);

// 分销活动列表
export const shareActivityList = data =>
  Request.get("/api/member/share_activity_list", data);

// 分销 提现明细
export const withdrawLog = data =>
  Request.get("/api/member/withdraw_log", data);

// 分销 收益明细
export const incomeLog = data => Request.get("/api/member/income_log", data);

// 分销 查看活动详情
export const shareActivityDetail = data =>
  Request.get("/api/member/share_activity_detail", data);

// 分销 查看活动详情
export const isMineShare = data =>
  Request.get("/api/member/is_mine_share", data);

// 课后作业列表
export const studentEndTopicList = data =>
  Request.get("/api/topic/student_end_topic_list", data);

// 提交答案
export const submitTopicAnswerList = data =>
  Request.post("/api/topic/submit_topic_answer_list", data);

// 开始答题
export const startAnswer = data => Request.get("/api/topic/start_answer", data);

// 课后作业列表答题统计
export const getMyTopicReport = data =>
  Request.get("/api/topic/get_my_topic_report", data);

// 课后作业列表答题记录
export const showMyAnswerList = data =>
  Request.get("/api/topic/show_my_answer_list", data);

//查看优惠券信息
export const getExchangeCoupon = data =>
  Request.post("/api/Publics/getExchangeCoupon", data);
