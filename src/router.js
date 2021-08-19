import Vue from "vue";
import VueRouter from "vue-router";

import pccurriculumList from "./views/pc/curriculumList.vue";
import secondList from "./views/list/secondList.vue";
import Studentschedules from "./views/pc/Studentschedules.vue";
import signUp from "./views/sign/signUp.vue";
import signUpCanvas from "./views/sign/signUpCanvas.vue";
import home from "./views/home/home.vue";
import tab from "./views/home/tab.vue";
import player from "./views/home/player.vue";
import selectCourseType from "./views/home/selectCourseType.vue";
import landingPagePhone from "./views/home/landingPagePhone.vue";
import landingPage from "./views/home/landingPage.vue";

import findPc from "./views/pc/findPc.vue";
import orderPc from "./views/pc/orderPc.vue";
import Myorder from "./views/pc/Myorder.vue";
import OrderInformation from "./views/pc/OrderInformation.vue";
import Orderdetails from "./views/pc/Orderdetails.vue";
import Homepage from "./views/pc/Homepage.vue";
import Me from "./views/pc/Me.vue";
import Smallclass from "./views/pc/Smallclass.vue";
import pcNewSchedule from "./views/pc/pcNewSchedule.vue";
import pcSchedule from "./views/pc/pcSchedule.vue";
import prepareLessons from "./views/pc/prepareLessons.vue";
import pcLiveCourseUnit from "./views/pc/pcLiveCourseUnit.vue";
import improveInfoPc from "./views/pc/improveInfoPc.vue";
import New from "./views/pc/New.vue";
import Orders from "./views/pc/Orders.vue";
import Trialclass from "./views/pc/Trialclass.vue";
import Consult from "./views/pc/Consult.vue";
import Fillorder from "./views/pc/Fillorder.vue";
import Shippingaddress from "./views/pc/Shippingaddress.vue";
import Selectaddress from "./views/pc/Selectaddress.vue";
import Signup from "./views/pc/Signup.vue";
import Set from "./views/pc/Set.vue";
import Personalpc from "./views/pc/Personalpc.vue";
import RecordListpc from "./views/pc/RecordListpc.vue";
import Middlepagepc from "./views/pc/Middlepagepc.vue";
import Rule from "./views/pc/Rule.vue";
import Earnings from "./views/pc/Earnings.vue";
import Award from "./views/pc/Award.vue";
import Withdraw from "./views/pc/Withdraw.vue";
import Replacephone from "./views/pc/Replacephone.vue";
import Originalphone from "./views/pc/Originalphone.vue";
import Codephone from "./views/pc/Codephone.vue";
import Nickname from "./views/pc/Nickname.vue";
import policyPhone from "./views/pc/policyPhone.vue";
import pcprivacyPhone from "./views/pc/privacyPhone.vue";
import Aboutapppc from "./views/pc/Aboutapppc.vue";
import Attendclass from "./views/pc/Attendclass.vue";
import Help from "./views/pc/Help.vue";
import Evaluatelist from "./views/pc/Evaluatelist.vue";
import Submit from "./views/pc/Submit.vue";
import evaluatePc from "./views/pc/evaluatePc.vue";
import teacherReport from "./views/pc/teacherReport.vue";
import myCoupon from "./views/pc/myCoupon.vue";
import Courselist from "./views/pc/Courselist.vue";
import Login from "./views/pc/Login.vue";
import pclogisticsInfo from "./views/pc/logisticsInfo.vue";
import invitationHomePad from "./views/pc/invitationHomePad.vue";
import morePhone from "./views/phone/morePhone.vue";
import homePagePhone from "./views/phone/homePagePhone.vue";
import curriculumListPhone from "./views/phone/curriculumListPhone.vue";
import findPhone from "./views/phone/findPhone.vue";
import loginPhone from "./views/phone/loginPhone.vue";
import orderPhone from "./views/phone/orderPhone.vue";
import orderDetailsPhone from "./views/phone/orderDetailsPhone.vue";
import courseDetailsPhone from "./views/phone/courseDetailsPhone.vue";
import addAddressPhone from "./views/phone/addAddressPhone.vue";
import wechatAddPhone from "./views/phone/wechatAddPhone.vue";
import secondListPhone from "./views/phone/secondListPhone.vue";
import myInfoPhone from "./views/phone/myInfoPhone.vue";
import settingPhone from "./views/phone/settingPhone.vue";
import phonepolicyPhone from "./views/phone/policyPhone.vue";
import privacyPhone from "./views/phone/privacyPhone.vue";
import middlePagePhone from "./views/phone/middlePagePhone.vue";
import improveInfoPhone from "./views/phone/improveInfoPhone.vue";
import smallClassPhone from "./views/phone/smallClassPhone.vue";
import classDetailsPhone from "./views/phone/classDetailsPhone.vue";
import projectionPhone from "./views/phone/projectionPhone.vue";
import createOrderAddressPhone from "./views/phone/createOrderAddressPhone.vue";
import writeAddressPhone from "./views/phone/writeAddressPhone.vue";
import choiceAddressPhone from "./views/phone/choiceAddressPhone.vue";
import recordListPhone from "./views/phone/recordListPhone.vue";
import smallClassDetailsPhone from "./views/phone/smallClassDetailsPhone.vue";
import invitationPhone from "./views/phone/invitationPhone.vue";
import invitationHomePhone from "./views/phone/invitationHomePhone.vue";
import invitationProfitPhone from "./views/phone/invitationProfitPhone.vue";
import invitationRulePhone from "./views/phone/invitationRulePhone.vue";
import invitationDrawingPhone from "./views/phone/invitationDrawingPhone.vue";
import inquiryTeacherPhone from "./views/phone/inquiryTeacherPhone.vue";
import replacePhone from "./views/phone/replacePhone.vue";
import updateNamePhone from "./views/phone/updateNamePhone.vue";
import personalPhone from "./views/phone/personalPhone.vue";
import aboutAppPhone from "./views/phone/aboutAppPhone.vue";
import helpCenterPhone from "./views/phone/helpCenterPhone.vue";
import toTeachPhone from "./views/phone/toTeachPhone.vue";
import evaluatePhone from "./views/phone/evaluatePhone.vue";
import myCouponPhone from "./views/phone/myCouponPhone.vue";
import useCouponPhone from "./views/phone/useCouponPhone.vue";
import standardCurriculumListPhone from "./views/phone/standardCurriculumListPhone.vue";
import phoneNewSchedule from "./views/phone/phoneNewSchedule.vue";
import accessCode from "./views/phone/accessCode.vue";
import changePassword from "./views/phone/changePassword.vue";
import retrievePassword from "./views/phone/retrievePassword.vue";
import logisticsInfo from "./views/phone/logisticsInfo.vue";
import report from "./views/report/report.vue";
import learningReport from "./views/report/learningReport.vue";
import evaluationAfter from "./views/report/evaluationAfter.vue";
import teacherPreview from "./views/report/teacherPreview.vue";
import preview from "./views/report/preview.vue";
import homework from "./views/report/homework.vue";
import practiceReport from "./views/report/practiceReport.vue";
import homeworkDetail from "./views/report/homeworkDetail.vue";
import imgPreview from "./views/report/imgPreview.vue";
import answerStatistics from "./views/answer/answerStatistics.vue";
import answerCard from "./views/answer/answerCard.vue";
import answerDetails from "./views/answer/answerDetails.vue";
import partAdegpc from "./views/answer/partAdegpc.vue";
import classroomPractice from "./views/answer/classroomPractice.vue";
import myAnswer from "./views/answer/myAnswer.vue";
import teachStage from "./views/answer/teachStage.vue";

import roster from "./views/roster/roster.vue";
import redeemCodeLink from "./views/redeem/redeemCodeLink.vue";
import redeemCode from "./views/redeem/redeemCode.vue";
import redeemCodeLinkSuccess from "./views/redeem/redeemCodeLinkSuccess.vue";

import courseware from "./views/courseware/courseware.vue";
import playCourse from "./views/course/playCourse.vue";
import curriculumList from "./views/curriculum/curriculumList.vue";

import notes from "./views/classNote/notes.vue";
import notes_view from "./views/classNote/notes_view.vue";

Vue.use(VueRouter);

const listRouterMap = [
  {
    path: "/list/secondList",
    name: "list-secondList",
    component: secondList
  }
];

const phoneMap = [
  {
    path: "/phone/morePhone",
    name: "morePhone",
    component: morePhone,
    meta: {
      breadcrumb: "更多移动端"
    }
  },
  {
    path: "/phone/homePagePhone",
    name: "homePagePhone",
    component: homePagePhone,
    meta: {
      breadcrumb: "首页移动端"
    }
  },
  {
    path: "/phone/curriculumListPhone",
    name: "curriculumListPhone",
    component: curriculumListPhone,
    meta: {
      breadcrumb: "我的课程移动端"
    }
  },
  {
    path: "/phone/findPhone",
    name: "findPhone",
    component: findPhone,
    meta: {
      breadcrumb: "发现移动端"
    }
  },
  {
    path: "/phone/loginPhone",
    name: "loginPhone",
    component: loginPhone,
    meta: {
      breadcrumb: "登录移动端"
    }
  },
  {
    path: "/phone/orderPhone",
    name: "orderPhone",
    component: orderPhone,
    meta: {
      breadcrumb: "订单移动端"
    }
  },
  {
    path: "/phone/orderDetailsPhone",
    name: "orderDetailsPhone",
    component: orderDetailsPhone,
    meta: {
      breadcrumb: "订单详情移动端"
    }
  },
  {
    path: "/phone/courseDetailsPhone",
    name: "courseDetailsPhone",
    component: courseDetailsPhone,
    meta: {
      breadcrumb: "课程详情移动端审核版"
    }
  },
  {
    path: "/phone/addAddressPhone",
    name: "addAddressPhone",
    component: addAddressPhone,
    meta: {
      breadcrumb: "填写收货地址移动端"
    }
  },
  {
    path: "/phone/wechatAddPhone",
    name: "wechatAddPhone",
    component: wechatAddPhone,
    meta: {
      breadcrumb: "添加微信移动端"
    }
  },
  {
    path: "/phone/secondListPhone",
    name: "secondListPhone",
    component: secondListPhone,
    meta: {
      breadcrumb: "二阶目录移动端"
    }
  },
  {
    path: "/phone/myInfoPhone",
    name: "myInfoPhone",
    component: myInfoPhone,
    meta: {
      breadcrumb: "我的移动端"
    }
  },
  {
    path: "/phone/policyPhone",
    name: "phone-policyPhone",
    component: phonepolicyPhone,
    meta: {
      breadcrumb: "用户服务条款移动端"
    }
  },
  {
    path: "/phone/privacyPhone",
    name: "privacyPhone",
    component: privacyPhone,
    meta: {
      breadcrumb: "用户隐私条款移动端"
    }
  },
  {
    path: "/phone/middlePagePhone",
    name: "middlePagePhone",
    component: middlePagePhone,
    meta: {
      breadcrumb: "微信支付中间页款移动端"
    }
  },
  {
    path: "/phone/improveInfoPhone",
    name: "improveInfoPhone",
    component: improveInfoPhone,
    meta: {
      breadcrumb: "完善个人信息移动端"
    }
  },
  {
    path: "/phone/smallClassPhone",
    name: "smallClassPhone",
    component: smallClassPhone,
    meta: {
      breadcrumb: "小课堂移动端"
    }
  },
  {
    path: "/phone/classDetailsPhone",
    name: "classDetailsPhone",
    component: classDetailsPhone,
    meta: {
      breadcrumb: "课程详情移动端"
    }
  },
  {
    path: "/phone/projectionPhone",
    name: "projectionPhone",
    component: projectionPhone,
    meta: {
      breadcrumb: "课件投屏移动端"
    }
  },
  {
    path: "/phone/createOrderAddressPhone",
    name: "createOrderAddressPhone",
    component: createOrderAddressPhone,
    meta: {
      breadcrumb: "创建订单移动端"
    }
  },
  {
    path: "/phone/writeAddressPhone",
    name: "writeAddressPhone",
    component: writeAddressPhone,
    meta: {
      breadcrumb: "填写地址移动端"
    }
  },
  {
    path: "/phone/choiceAddressPhone",
    name: "choiceAddressPhone",
    component: choiceAddressPhone,
    meta: {
      breadcrumb: "选择地址移动端"
    }
  },
  {
    path: "/phone/recordListPhone",
    name: "recordListPhone",
    component: recordListPhone,
    meta: {
      breadcrumb: "录播课二级列表移动端"
    }
  },
  {
    path: "/phone/smallClassDetailsPhone",
    name: "smallClassDetailsPhone",
    component: smallClassDetailsPhone,
    meta: {
      title: "课程详情",
      breadcrumb: "小课堂详情移动端"
    }
  },
  {
    path: "/phone/invitationPhone",
    name: "invitationPhone",
    component: invitationPhone,
    meta: {
      breadcrumb: "邀请有礼移动端"
    }
  },
  {
    path: "/phone/invitationHomePhone",
    name: "invitationHomePhone",
    component: invitationHomePhone,
    meta: {
      breadcrumb: "首页邀请有礼移动端"
    }
  },
  {
    path: "/phone/invitationProfitPhone",
    name: "invitationProfitPhone",
    component: invitationProfitPhone,
    meta: {
      breadcrumb: "邀请收益移动端"
    }
  },
  {
    path: "/phone/invitationRulePhone",
    name: "invitationRulePhone",
    component: invitationRulePhone,
    meta: {
      breadcrumb: "邀请收益规则移动端"
    }
  },
  {
    path: "/phone/invitationDrawingPhone",
    name: "invitationDrawingPhone",
    component: invitationDrawingPhone,
    meta: {
      breadcrumb: "邀请提现移动端"
    }
  },
  {
    path: "/phone/inquiryTeacherPhone",
    name: "inquiryTeacherPhone",
    component: inquiryTeacherPhone,
    meta: {
      breadcrumb: "询问教师移动端"
    }
  },
  {
    path: "/phone/replacePhone",
    name: "replacePhone",
    component: replacePhone,
    meta: {
      breadcrumb: "更换手机号移动端"
    }
  },
  {
    path: "/phone/updateNamePhone",
    name: "updateNamePhone",
    component: updateNamePhone,
    meta: {
      breadcrumb: "更改姓名移动端"
    }
  },
  {
    path: "/phone/personalPhone",
    name: "personalPhone",
    component: personalPhone,
    meta: {
      breadcrumb: "程序设置移动端"
    }
  },
  {
    path: "/phone/aboutAppPhone",
    name: "aboutAppPhone",
    component: aboutAppPhone,
    meta: {
      breadcrumb: "关于程序移动端"
    }
  },
  {
    path: "/phone/helpCenterPhone",
    name: "helpCenterPhone",
    component: helpCenterPhone,
    meta: {
      breadcrumb: "帮助中心移动端"
    }
  },
  {
    path: "/phone/toTeachPhone",
    name: "toTeachPhone",
    component: toTeachPhone,
    meta: {
      breadcrumb: "如何上课移动端"
    }
  },
  {
    path: "/phone/evaluatePhone",
    name: "evaluatePhone",
    component: evaluatePhone,
    meta: {
      breadcrumb: "学生评价移动端"
    }
  },
  {
    path: "/phone/myCouponPhone",
    name: "myCouponPhone",
    component: myCouponPhone,
    meta: {
      breadcrumb: "我的优惠券移动端"
    }
  },
  {
    path: "/phone/useCouponPhone",
    name: "useCouponPhone",
    component: useCouponPhone,
    meta: {
      breadcrumb: "使用优惠券移动端"
    }
  },
  {
    path: "/phone/standardCurriculumListPhone",
    name: "standardCurriculumListPhone",
    component: standardCurriculumListPhone,
    meta: {
      keepalive: true,
      breadcrumb: "标准版手机端课程页面"
    }
  },
  {
    path: "/phone/phoneNewSchedule",
    name: "phoneNewSchedule",
    component: phoneNewSchedule,
    meta: {
      keepalive: true,
      breadcrumb: "标准版手机端新课表"
    }
  },
  {
    path: "/phone/accessCode",
    name: "accessCode",
    component: accessCode,
    meta: {
      breadcrumb: "登录后修改密码验证码验证"
    }
  },
  {
    path: "/phone/changePassword",
    name: "changePassword",
    component: changePassword,
    meta: {
      breadcrumb: "修改密码"
    }
  },
  {
    path: "/phone/retrievePassword",
    name: "retrievePassword",
    component: retrievePassword,
    meta: {
      breadcrumb: "登录前修改密码验证码验证"
    }
  },
  {
    path: "/phone/logisticsInfo",
    name: "logisticsInfo",
    component: logisticsInfo,
    meta: {
      breadcrumb: "物流信息"
    }
  },
  {
    path: "/phone/settingPhone",
    name: "settingPhone",
    component: settingPhone,
    meta: {
      breadcrumb: "个人信息设置移动端"
    }
  }
];

const signRouterMap = [
  {
    path: "/sign/signUp",
    name: "sign-signUp",
    component: signUp,
    meta: {
      breadcrumb: "报名成功1"
    }
  },
  {
    path: "/sign/signUpCanvas",
    name: "sign-signUpCanvas",
    component: signUpCanvas,
    meta: {
      keepalive: false,
      breadcrumb: "报名成功2"
    }
  }
];
const homeRouterMap = [
  {
    path: "/home",
    name: "home-home",
    component: home,
    meta: {
      breadcrumb: "首页"
    }
  },
  {
    path: "/tab",
    name: "home-tab",
    component: tab,
    meta: {
      noRefresh: true,
      breadcrumb: "tab"
    }
  },
  {
    path: "/player",
    name: "home-player",
    component: player
  },
  {
    path: "/landingPage",
    name: "home-landingPage",
    component: landingPage
  },
  {
    path: "/selectCourseType",
    name: "home-selectCourseType",
    component: selectCourseType
  },
  {
    path: "/lp",
    name: "home-landingPagePhone",
    component: landingPagePhone
  }
];
const reportMap = [
  {
    path: "/report/report",
    name: "report",
    component: report,
    meta: {
      noRefresh: true,
      breadcrumb: "report"
    }
  },
  {
    path: "/report/evaluationAfter",
    name: "evaluationAfter",
    component: evaluationAfter,
    meta: {
      noRefresh: true,
      breadcrumb: "evaluationAfter"
    }
  },
  {
    path: "/report/teacherPreview",
    name: "teacherPreview",
    component: teacherPreview,
    meta: {
      noRefresh: true,
      breadcrumb: "teacherPreview"
    }
  },
  {
    path: "/report/preview",
    name: "preview",
    component: preview,
    meta: {
      noRefresh: true,
      breadcrumb: "preview"
    }
  },
  {
    path: "/report/homework",
    name: "homework",
    component: homework,
    meta: {
      noRefresh: true,
      breadcrumb: "homework"
    }
  },
  {
    path: "/report/practiceReport",
    name: "practiceReport",
    component: practiceReport,
    meta: {
      noRefresh: true,
      breadcrumb: "practiceReport"
    }
  },
  {
    path: "/report/homeworkDetail",
    name: "homeworkDetail",
    component: homeworkDetail,
    meta: {
      noRefresh: true,
      breadcrumb: "homeworkDetail"
    }
  },
  {
    path: "/report/imgPreview",
    name: "imgPreview",
    component: imgPreview,
    meta: {
      noRefresh: true,
      breadcrumb: "imgPreview"
    }
  },
  {
    path: "/report/learningReport",
    name: "learningReport",
    component: learningReport,
    meta: {
      noRefresh: true,
      breadcrumb: "learningReport"
    }
  }
];

const answerMap = [
  {
    path: "/answer/answerStatistics",
    name: "answerStatistics",
    component: answerStatistics,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "answerStatistics"
    }
  },
  {
    path: "/answer/answerDetails",
    name: "answerDetails",
    component: answerDetails,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "answerDetails"
    }
  },
  {
    path: "/answer/partAdegpc",
    name: "partAdegpc",
    component: partAdegpc,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "pc的随堂练习"
    }
  },
  {
    path: "/answer/classroomPractice",
    name: "classroomPractice",
    component: classroomPractice,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "课堂练习答题卡"
    }
  },
  {
    path: "/answer/myAnswer",
    name: "myAnswer",
    component: myAnswer,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "我的随堂联系答题情况"
    }
  },
  {
    path: "/answer/teachStage",
    name: "teachStage",
    component: teachStage,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "讲台"
    }
  },
  {
    path: "/answer/answerCard",
    name: "answerCard",
    component: answerCard,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "答题卡"
    }
  }
];

const courseRouterMap = [
  {
    path: "/course/playCourse",
    name: "course-playCourse",
    component: playCourse,
    meta: {
      breadcrumb: "播放页"
    }
  }
];
const classRouterMap = [
  {
    path: "/pc/curriculumList",
    name: "pc-curriculumList",
    component: pccurriculumList,
    meta: {
      breadcrumb: "我的课程"
    }
  },
  {
    path: "/pc/findPc",
    name: "pc-findPc",
    component: findPc,
    meta: {
      breadcrumb: "PC发现"
    }
  },
  {
    path: "/pc/orderPc",
    name: "pc-orderPc",
    component: orderPc,
    meta: {
      breadcrumb: "PC订单"
    }
  },
  {
    path: "/pc/Myorder",
    name: "pc-Myorder",
    component: Myorder,
    meta: {
      breadcrumb: "PC我的订单"
    }
  },
  {
    path: "/pc/OrderInformation",
    name: "pc-OrderInformation",
    component: OrderInformation,
    meta: {
      breadcrumb: "PC订单信息"
    }
  },
  {
    path: "/pc/Orderdetails",
    name: "pc-Orderdetails",
    component: Orderdetails,
    meta: {
      breadcrumb: "PC订单详情"
    }
  },
  {
    path: "/pc/Homepage",
    name: "pc-Homepage",
    component: Homepage,
    meta: {
      breadcrumb: "PC首页"
    }
  },
  {
    path: "/pc/Me",
    name: "pc-Me",
    component: Me,
    meta: {
      breadcrumb: "PC我的"
    }
  },
  {
    path: "/pc/Smallclass",
    name: "pc-Smallclass",
    component: Smallclass,
    meta: {
      breadcrumb: "PC小课堂"
    }
  },
  {
    path: "/pc/Studentschedules",
    name: "pc-Studentschedules",
    component: Studentschedules,
    meta: {
      breadcrumb: "PC课表"
    }
  },
  {
    path: "/pc/pcNewSchedule",
    name: "pc-pcNewSchedule",
    component: pcNewSchedule,
    meta: {
      breadcrumb: "ipad新课表"
    }
  },
  {
    path: "/pc/pcSchedule",
    name: "pc-pcSchedule",
    component: pcSchedule,
    meta: {
      breadcrumb: "PC新课表"
    }
  },
  {
    path: "/pc/prepareLessons",
    name: "pc-prepareLessons",
    component: prepareLessons,
    meta: {
      breadcrumb: "PC教师备课"
    }
  },
  {
    path: "/pc/pcLiveCourseUnit",
    name: "pc-pcLiveCourseUnit",
    component: pcLiveCourseUnit,
    meta: {
      breadcrumb: "PC直播课单元"
    }
  },
  {
    path: "/pc/improveInfoPc",
    name: "pc-improveInfoPc",
    component: improveInfoPc,
    meta: {
      breadcrumb: "pc更换头像"
    }
  },
  {
    path: "/pc/New",
    name: "pc-New",
    component: New,
    meta: {
      breadcrumb: "pc新的订单详情"
    }
  },
  {
    path: "/pc/Orders",
    name: "pc-Orders",
    component: Orders,
    meta: {
      breadcrumb: "pc新的我的订单"
    }
  },
  {
    path: "/pc/Trialclass",
    name: "pc-Trialclass",
    component: Trialclass,
    meta: {
      breadcrumb: "pc体验课"
    }
  },
  {
    path: "/pc/Consult",
    name: "pc-Consult",
    component: Consult,
    meta: {
      breadcrumb: "pc咨询老师"
    }
  },
  {
    path: "/pc/Fillorder",
    name: "pc-Fillorder",
    component: Fillorder,
    meta: {
      breadcrumb: "pc填写订单页面"
    }
  },
  {
    path: "/pc/Shippingaddress",
    name: "pc-Shippingaddress",
    component: Shippingaddress,
    meta: {
      breadcrumb: "pc填写收货地址"
    }
  },
  {
    path: "/pc/Selectaddress",
    name: "pc-Selectaddress",
    component: Selectaddress,
    meta: {
      breadcrumb: "pc选择收货地址"
    }
  },
  {
    path: "/pc/Signup",
    name: "pc-Signup",
    component: Signup,
    meta: {
      breadcrumb: "pc报名成功"
    }
  },
  {
    path: "/pc/Set",
    name: "pc-Set",
    component: Set,
    meta: {
      breadcrumb: "pc设置"
    }
  },
  {
    path: "/pc/Personalpc",
    name: "pc-Personalpc",
    component: Personalpc,
    meta: {
      breadcrumb: "个人资料"
    }
  },
  {
    path: "/pc/RecordListpc",
    name: "pc-RecordListpc",
    component: RecordListpc,
    meta: {
      breadcrumb: "pc录播列表"
    }
  },
  {
    path: "/pc/Middlepagepc",
    name: "pc-Middlepagepc",
    component: Middlepagepc,
    meta: {
      breadcrumb: "pc微信支付的中间页"
    }
  },
  {
    path: "/pc/Rule",
    name: "pc-Rule",
    component: Rule,
    meta: {
      breadcrumb: "ipad 赏金规则页面"
    }
  },
  {
    path: "/pc/Earnings",
    name: "pc-Earnings",
    component: Earnings,
    meta: {
      breadcrumb: "ipad 赏金收益页面"
    }
  },
  {
    path: "/pc/Award",
    name: "pc-Award",
    component: Award,
    meta: {
      breadcrumb: "ipad 赏金奖励页面"
    }
  },
  {
    path: "/pc/Withdraw",
    name: "pc-Withdraw",
    component: Withdraw,
    meta: {
      breadcrumb: "ipad 提现页面"
    }
  },
  {
    path: "/pc/Replacephone",
    name: "pc-Replacephone",
    component: Replacephone,
    meta: {
      breadcrumb: "更换手机号页面"
    }
  },
  {
    path: "/pc/Originalphone",
    name: "pc-Originalphone",
    component: Originalphone,
    meta: {
      breadcrumb: "原手机号页面"
    }
  },
  {
    path: "/pc/Codephone",
    name: "pc-Codephone",
    component: Codephone,
    meta: {
      breadcrumb: "输入验证码页面"
    }
  },
  {
    path: "/pc/Nickname",
    name: "pc-Nickname",
    component: Nickname,
    meta: {
      breadcrumb: "修改昵称页面"
    }
  },
  {
    path: "/pc/policyPhone",
    name: "pc-policyPhone",
    component: policyPhone,
    meta: {
      breadcrumb: "用户注册协议"
    }
  },
  {
    path: "/pc/privacyPhone",
    name: "pc-privacyPhone",
    component: pcprivacyPhone,
    meta: {
      breadcrumb: "隐私政策"
    }
  },
  {
    path: "/pc/Aboutapppc",
    name: "pc-Aboutapppc",
    component: Aboutapppc,
    meta: {
      breadcrumb: "关于"
    }
  },
  {
    path: "/pc/Attendclass",
    name: "pc-Attendclass",
    component: Attendclass,
    meta: {
      breadcrumb: "如何上课"
    }
  },
  {
    path: "/pc/Help",
    name: "pc-Help",
    component: Help,
    meta: {
      breadcrumb: "帮助中心"
    }
  },
  {
    path: "/pc/Evaluatelist",
    name: "pc-Evaluatelist",
    component: Evaluatelist,
    meta: {
      breadcrumb: "评价列表"
    }
  },
  {
    path: "/pc/Submit",
    name: "pc-Submit",
    component: Submit,
    meta: {
      breadcrumb: "提交评价"
    }
  },
  {
    path: "/pc/evaluatePc",
    name: "pc-evaluatePc",
    component: evaluatePc,
    meta: {
      breadcrumb: "学生评价"
    }
  },
  {
    path: "/pc/teacherReport",
    name: "pc-teacherReport",
    component: teacherReport,
    meta: {
      breadcrumb: "教师课堂报告"
    }
  },
  {
    path: "/pc/myCoupon",
    name: "pc-myCoupon",
    component: myCoupon,
    meta: {
      breadcrumb: "我的优惠券"
    }
  },
  {
    path: "/pc/Courselist",
    name: "pc-Courselist",
    component: Courselist,
    meta: {
      breadcrumb: "pc更多的页面"
    }
  },
  {
    path: "/pc/Login",
    name: "pc-Login",
    component: Login,
    meta: {
      breadcrumb: "登录web端"
    }
  },
  {
    path: "/pc/logisticsInfo",
    name: "pc-logisticsInfo",
    component: pclogisticsInfo,
    meta: {
      breadcrumb: "物流信息"
    }
  },
  {
    path: "/pc/invitationHomePad",
    name: "pc-invitationHomePad",
    component: invitationHomePad,
    meta: {
      breadcrumb: "分销首页pad端"
    }
  }
];
const currRouterMap = [
  {
    path: "/curriculum/curriculumList",
    name: "curriculum-curriculumList",
    component: curriculumList,
    meta: {
      breadcrumb: "我的课程"
    }
  }
];
// const myRouterMap = [
//   {
//     path: "/my",
//     redirect: "/my/myInfo",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "myInfo",
//         name: "myInfo",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "myInfo" */ "./views/my/myInfo.vue")
//               ),
//             "myInfo"
//           ),

//         meta: {
//           breadcrumb: "我的"
//         }
//       }
//     ]
//   }
// ];

// const ipadRouterMap = [
//   {
//     path: "/pad",
//     redirect: "/pad/curriculumListPad",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "curriculumListPad",
//         name: "curriculumListPad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "curriculumListPad" */ "./views/pad/curriculumListPad.vue")
//               ),
//             "curriculumListPad"
//           ),

//         meta: {
//           breadcrumb: "我的课程pad"
//         }
//       },
//       {
//         path: "findPad",
//         name: "findPad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "findPad" */ "./views/pad/findPad.vue")
//               ),
//             "findPad"
//           ),

//         meta: {
//           breadcrumb: "发现pad"
//         }
//       },
//       {
//         path: "orderPad",
//         name: "orderPad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPad" */ "./views/pad/orderPad.vue")
//               ),
//             "orderPad"
//           ),

//         meta: {
//           breadcrumb: "订单pad"
//         }
//       }
//     ]
//   }
// ];

// const webRouterMap = [
//   {
//     path: "/web",
//     redirect: "/web/Home",
//     component: webLayout,
//     hidden: true,
//     children: [
//       {
//         path: "Home",
//         name: "Home",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(require(/* webpackChunkName: "Home" */ "./views/web/Home.vue")),
//             "Home"
//           ),

//         meta: {
//           breadcrumb: "首页"
//         }
//       },
//       {
//         path: "About",
//         name: "About",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "About" */ "./views/web/About.vue")
//               ),
//             "About"
//           ),

//         meta: {
//           breadcrumb: "详情页"
//         }
//       },
//       {
//         path: "Courselist",
//         name: "Courselist",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "Courselist" */ "./views/web/Courselist.vue")
//               ),
//             "Courselist"
//           ),

//         meta: {
//           breadcrumb: "更多页"
//         }
//       },
//       {
//         path: "Enter",
//         name: "Enter",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "Enter" */ "./views/web/Enter.vue")
//               ),
//             "Enter"
//           ),

//         meta: {
//           breadcrumb: "入驻页"
//         }
//       },
//       {
//         path: "Pay",
//         name: "Pay",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(require(/* webpackChunkName: "Pay" */ "./views/web/Pay.vue")),
//             "Pay"
//           ),

//         meta: {
//           breadcrumb: "支付页"
//         }
//       },
//       {
//         path: "Orders",
//         name: "Orders",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "Orders" */ "./views/web/Orders.vue")
//               ),
//             "Orders"
//           ),

//         meta: {
//           breadcrumb: "我的订单web端"
//         }
//       },

//       {
//         path: "New",
//         name: "New",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(require(/* webpackChunkName: "New" */ "./views/web/New.vue")),
//             "New"
//           ),

//         meta: {
//           breadcrumb: "订单详情web端"
//         }
//       },
//       {
//         path: "myClass",
//         name: "myClass",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "myClass" */ "./views/web/myClass.vue")
//               ),
//             "myClass"
//           ),

//         meta: {
//           breadcrumb: "我的课程web端"
//         }
//       }
//     ]
//   }
// ];
// const ipadFromRouterMap = [
//   {
//     path: "/ipad",
//     redirect: "/ipad",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "homeIpad",
//         name: "homeIpad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "homeIpad" */ "./views/ipad/homeIpad.vue")
//               ),
//             "homeIpad"
//           ),

//         meta: {
//           breadcrumb: "首页ipad端"
//         }
//       },
//       {
//         path: "secondListIpad",
//         name: "secondListIpad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "homeIpad" */ "./views/ipad/secondListIpad.vue")
//               ),
//             "secondListIpad"
//           ),

//         meta: {
//           breadcrumb: "二级目录ipad端"
//         }
//       },
//       {
//         path: "playCourseIpad",
//         name: "playCourseIpad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "homeIpad" */ "./views/ipad/playCourseIpad.vue")
//               ),
//             "playCourseIpad"
//           ),

//         meta: {
//           breadcrumb: "播放页ipad端"
//         }
//       },
//       {
//         path: "myInfoIpad",
//         name: "myInfoIpad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "homeIpad" */ "./views/ipad/myInfoIpad.vue")
//               ),
//             "myInfoIpad"
//           ),

//         meta: {
//           breadcrumb: "我的ipad端"
//         }
//       },
//       {
//         path: "settingIpad",
//         name: "settingIpad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "settingIpad" */ "./views/ipad/settingIpad.vue")
//               ),
//             "settingIpad"
//           ),

//         meta: {
//           breadcrumb: "设置ipad端"
//         }
//       },
//       {
//         path: "policyIpad",
//         name: "policyIpad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "policy" */ "./views/ipad/policyIpad.vue")
//               ),
//             "policyIpad"
//           ),

//         meta: {
//           breadcrumb: "用户服务ipad端"
//         }
//       },
//       {
//         path: "privacyIpad",
//         name: "privacyIpad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "privacy" */ "./views/ipad/privacyIpad.vue")
//               ),
//             "privacyIpad"
//           ),

//         meta: {
//           breadcrumb: "用户隐私ipad端"
//         }
//       }
//     ]
//   }
// ];
// const setRouterMap = [
//   {
//     path: "/set",
//     redirect: "/set/setting",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "setting",
//         name: "setting",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "setting" */ "./views/set/setting.vue")
//               ),
//             "set"
//           ),

//         meta: {
//           breadcrumb: "设置"
//         }
//       }
//     ]
//   }
// ];
// const orderRouterMap = [
//   {
//     path: "/order",
//     redirect: "/order/fillOrder",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "fillOrder",
//         name: "fillOrder",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "fillOrder" */ "./views/order/fillOrder.vue")
//               ),
//             "fillOrder"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "填表"
//         }
//       },
//       {
//         path: "addAddress",
//         name: "addAddress",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "addAddress" */ "./views/order/addAddress.vue")
//               ),
//             "addAddress"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "添加地址"
//         }
//       },
//       {
//         path: "middlePage",
//         name: "middlePage",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "middlePage" */ "./views/order/middlePage.vue")
//               ),
//             "middlePage"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "添加地址"
//         }
//       },
//       {
//         path: "ipad/Trialclass",
//         name: "Trialclass",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "middlePage" */ "./views/order/ipad/Trialclass.vue")
//               ),
//             "Trialclass"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "落地页"
//         }
//       },
//       {
//         path: "ipad/Fillorder",
//         name: "Fillorder",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "middlePage" */ "./views/order/ipad/Fillorder.vue")
//               ),
//             "Fillorder"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "支付页"
//         }
//       },
//       {
//         path: "ipad/Shippingaddress",
//         name: "Shippingaddress",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "middlePage" */ "./views/order/ipad/Shippingaddress.vue")
//               ),
//             "Shippingaddress"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "填写地址页"
//         }
//       },
//       {
//         path: "ipad/Signup",
//         name: "Signup",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "middlePage" */ "./views/order/ipad/Signup.vue")
//               ),
//             "Signup"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "支付成功页"
//         }
//       },
//       {
//         path: "ipad/Selectaddress",
//         name: "Selectaddress",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "middlePage" */ "./views/order/ipad/Selectaddress.vue")
//               ),
//             "Selectaddress"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "地址列表"
//         }
//       },
//       {
//         path: "ipad/loginIpad",
//         name: "loginIpad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "middlePage" */ "./views/order/ipad/loginIpad.vue")
//               ),
//             "loginIpad"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "登录页"
//         }
//       },
//       {
//         path: "phone/classDetailsPhone",
//         name: "classDetailsPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "classDetailsPhone" */ "./views/order/phone/classDetailsPhone.vue")
//               ),
//             "classDetailsPhone"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "分销落地页手机端"
//         }
//       },
//       {
//         path: "phone/createOrderAddressPhone",
//         name: "createOrderAddressPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "createOrderAddressPhone" */ "./views/order/phone/createOrderAddressPhone.vue")
//               ),
//             "createOrderAddressPhone"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "分销订单详情手机端"
//         }
//       },
//       {
//         path: "phone/choiceAddressPhone",
//         name: "choiceAddressPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "choiceAddressPhone" */ "./views/order/phone/choiceAddressPhone.vue")
//               ),
//             "choiceAddressPhone"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "分销订单列表手机端"
//         }
//       },
//       {
//         path: "phone/writeAddressPhone",
//         name: "writeAddressPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "writeAddressPhone" */ "./views/order/phone/writeAddressPhone.vue")
//               ),
//             "writeAddressPhone"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "分销地址详情手机端"
//         }
//       },
//       {
//         path: "phone/wechatAddPhone",
//         name: "wechatAddPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "wechatAddPhone" */ "./views/order/phone/wechatAddPhone.vue")
//               ),
//             "wechatAddPhone"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "分销添加老师微信手机端"
//         }
//       },
//       {
//         path: "phone/middlePagePhone",
//         name: "middlePagePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "middlePagePhone" */ "./views/order/phone/middlePagePhone.vue")
//               ),
//             "middlePagePhone"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "分销微信中间页手机端"
//         }
//       },
//       {
//         path: "phone/loginPhone",
//         name: "loginPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "loginPhone" */ "./views/order/phone/loginPhone.vue")
//               ),
//             "loginPhone"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "手机登录手机端"
//         }
//       }
//     ]
//   }
// ];
// const fileRouterMap = [
//   {
//     path: "/file",
//     redirect: "/file/policy",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "policy",
//         name: "policy",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "policy" */ "./views/file/policy.vue")
//               ),
//             "policy"
//           ),

//         meta: {
//           breadcrumb: "用户服务"
//         }
//       },
//       {
//         path: "privacy",
//         name: "privacy",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "privacy" */ "./views/file/privacy.vue")
//               ),
//             "privacy"
//           ),

//         meta: {
//           breadcrumb: "用户隐私"
//         }
//       }
//     ]
//   }
// ];

const rosterMap = [
  {
    path: "/roster/roster",
    name: "roster",
    component: roster
  }
];
const coursewareMap = [
  {
    path: "/courseware/courseware",
    name: "courseware",
    component: courseware,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "courseware"
    }
  }
];

// const coursewareRouterMap = [
//   {
//     path: "/courseware",
//     redirect: "/courseware/courseware",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "courseware",
//         name: "courseware",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/courseware/courseware.vue")),
//             "courseware"
//           ),
//         meta: {
//           bg: "dark",
//           noRefresh: true,
//           breadcrumb: "courseware"
//         }
//       }
//     ]
//   }
// ];

const redeemMap = [
  {
    path: "/redeem/redeemCode",
    name: "redeemCode",
    component: redeemCode
  },
  {
    path: "/redeem/redeemCodeLink",
    name: "redeemCodeLink",
    component: redeemCodeLink
  },
  {
    path: "/redeem/redeemCodeLinkSuccess",
    name: "redeemCodeLinkSuccess",
    component: redeemCodeLinkSuccess
  }
];

const noteMap = [
  {
    path: "/classNote/notes",
    name: "notes",
    component: notes,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "notes"
    }
  },
  {
    path: "/classNote/notes_view",
    name: "notes_view",
    component: notes_view,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "notes_view"
    }
  }
];

// const noteRouterMap = [
//   {
//     path: "/classNote",
//     redirect: "/classNote/notes",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "notes",
//         name: "notes",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/classNote/notes.vue")),
//             "notes"
//           ),
//         meta: {
//           bg: "dark",
//           noRefresh: true,
//           breadcrumb: "notes"
//         }
//       },
//       {
//         path: "notes_view",
//         name: "notes_view",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/classNote/notes_view.vue")),
//             "notes_view"
//           ),
//         meta: {
//           bg: "dark",
//           noRefresh: true,
//           breadcrumb: "notes_view"
//         }
//       }
//     ]
//   }
// ];
// const reportRouterMap = [
//   {
//     path: "/report",
//     redirect: "/report/report",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "report",
//         name: "report",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/report/report.vue")),
//             "report"
//           ),
//         meta: {
//           noRefresh: true,
//           breadcrumb: "report"
//         }
//       },
//       {
//         path: "learningReport",
//         name: "learningReport",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/report/learningReport.vue")),
//             "learningReport"
//           ),
//         meta: {
//           noRefresh: true,
//           breadcrumb: "learningReport"
//         }
//       },
//       {
//         path: "evaluationAfter",
//         name: "evaluationAfter",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/report/evaluationAfter.vue")),
//             "evaluationAfter"
//           ),
//         meta: {
//           noRefresh: true,
//           breadcrumb: "evaluationAfter"
//         }
//       },
//       {
//         path: "teacherPreview",
//         name: "teacherPreview",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/report/teacherPreview.vue")),
//             "teacherPreview"
//           ),
//         meta: {
//           noRefresh: true,
//           breadcrumb: "teacherPreview"
//         }
//       },
//       {
//         path: "preview",
//         name: "preview",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/report/preview.vue")),
//             "preview"
//           ),
//         meta: {
//           noRefresh: true,
//           breadcrumb: "preview"
//         }
//       },
//       {
//         path: "homework",
//         name: "homework",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/report/homework.vue")),
//             "homework"
//           ),
//         meta: {
//           noRefresh: true,
//           breadcrumb: "homework"
//         }
//       },
//       {
//         path: "practiceReport",
//         name: "practiceReport",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/report/practiceReport.vue")),
//             "practiceReport"
//           ),
//         meta: {
//           noRefresh: true,
//           breadcrumb: "practiceReport"
//         }
//       },
//       {
//         path: "homeworkDetail",
//         name: "homeworkDetail",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/report/homeworkDetail.vue")),
//             "homeworkDetail"
//           ),
//         meta: {
//           noRefresh: true,
//           breadcrumb: "homeworkDetail"
//         }
//       },
//       {
//         path: "imgPreview",
//         name: "imgPreview",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/report/imgPreview.vue")),
//             "imgPreview"
//           ),
//         meta: {
//           noRefresh: true,
//           breadcrumb: "imgPreview"
//         }
//       }
//     ]
//   }
// ];

// const router = new VueRouter({
//   mode: "history",
//   // base: process.env.BASE_URL,
//   routes: [
//     ...webRouterMap,
//     ...classRouterMap,
//     ...ipadRouterMap,
//     ...phoneRouterMap,
//     ...currRouterMap,
//     ...ipadFromRouterMap,
//     ...homeRouterMap,
//     ...listRouterMap,
//     ...courseRouterMap,
//     ...myRouterMap,
//     ...setRouterMap,
//     ...fileRouterMap,
//     ...signRouterMap,
//     ...orderRouterMap,
//     ...answerRouterMap,
//     ...rosterRouterMap,
//     ...coursewareRouterMap,
//     ...noteRouterMap,
//     ...reportRouterMap,
//     ...redeemRouterMap
//   ]
// });
export function createRouter() {
  let router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "nuxt-link-active",
    fallback: false,
    routes: [
      // ...webRouterMap,
      ...classRouterMap,
      // ...ipadRouterMap,
      ...currRouterMap,
      // ...ipadFromRouterMap,
      ...homeRouterMap,
      ...listRouterMap,
      ...phoneMap,
      ...reportMap,
      ...courseRouterMap,
      // ...myRouterMap,
      // ...setRouterMap,
      // ...fileRouterMap,
      ...signRouterMap,
      ...answerMap,
      // ...orderRouterMap,
      ...rosterMap,
      ...coursewareMap,
      ...noteMap,
      ...redeemMap
    ]
  });
  Vue.$router = router;
  return router;
}
