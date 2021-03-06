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
      breadcrumb: "???????????????"
    }
  },
  {
    path: "/phone/homePagePhone",
    name: "homePagePhone",
    component: homePagePhone,
    meta: {
      breadcrumb: "???????????????"
    }
  },
  {
    path: "/phone/curriculumListPhone",
    name: "curriculumListPhone",
    component: curriculumListPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/findPhone",
    name: "findPhone",
    component: findPhone,
    meta: {
      breadcrumb: "???????????????"
    }
  },
  {
    path: "/phone/loginPhone",
    name: "loginPhone",
    component: loginPhone,
    meta: {
      breadcrumb: "???????????????"
    }
  },
  {
    path: "/phone/orderPhone",
    name: "orderPhone",
    component: orderPhone,
    meta: {
      breadcrumb: "???????????????"
    }
  },
  {
    path: "/phone/orderDetailsPhone",
    name: "orderDetailsPhone",
    component: orderDetailsPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/courseDetailsPhone",
    name: "courseDetailsPhone",
    component: courseDetailsPhone,
    meta: {
      breadcrumb: "??????????????????????????????"
    }
  },
  {
    path: "/phone/addAddressPhone",
    name: "addAddressPhone",
    component: addAddressPhone,
    meta: {
      breadcrumb: "???????????????????????????"
    }
  },
  {
    path: "/phone/wechatAddPhone",
    name: "wechatAddPhone",
    component: wechatAddPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/secondListPhone",
    name: "secondListPhone",
    component: secondListPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/myInfoPhone",
    name: "myInfoPhone",
    component: myInfoPhone,
    meta: {
      breadcrumb: "???????????????"
    }
  },
  {
    path: "/phone/policyPhone",
    name: "phone-policyPhone",
    component: phonepolicyPhone,
    meta: {
      breadcrumb: "???????????????????????????"
    }
  },
  {
    path: "/phone/privacyPhone",
    name: "privacyPhone",
    component: privacyPhone,
    meta: {
      breadcrumb: "???????????????????????????"
    }
  },
  {
    path: "/phone/middlePagePhone",
    name: "middlePagePhone",
    component: middlePagePhone,
    meta: {
      breadcrumb: "?????????????????????????????????"
    }
  },
  {
    path: "/phone/improveInfoPhone",
    name: "improveInfoPhone",
    component: improveInfoPhone,
    meta: {
      breadcrumb: "???????????????????????????"
    }
  },
  {
    path: "/phone/smallClassPhone",
    name: "smallClassPhone",
    component: smallClassPhone,
    meta: {
      breadcrumb: "??????????????????"
    }
  },
  {
    path: "/phone/classDetailsPhone",
    name: "classDetailsPhone",
    component: classDetailsPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/projectionPhone",
    name: "projectionPhone",
    component: projectionPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/createOrderAddressPhone",
    name: "createOrderAddressPhone",
    component: createOrderAddressPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/writeAddressPhone",
    name: "writeAddressPhone",
    component: writeAddressPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/choiceAddressPhone",
    name: "choiceAddressPhone",
    component: choiceAddressPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/recordListPhone",
    name: "recordListPhone",
    component: recordListPhone,
    meta: {
      breadcrumb: "??????????????????????????????"
    }
  },
  {
    path: "/phone/smallClassDetailsPhone",
    name: "smallClassDetailsPhone",
    component: smallClassDetailsPhone,
    meta: {
      title: "????????????",
      breadcrumb: "????????????????????????"
    }
  },
  {
    path: "/phone/invitationPhone",
    name: "invitationPhone",
    component: invitationPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/invitationHomePhone",
    name: "invitationHomePhone",
    component: invitationHomePhone,
    meta: {
      breadcrumb: "???????????????????????????"
    }
  },
  {
    path: "/phone/invitationProfitPhone",
    name: "invitationProfitPhone",
    component: invitationProfitPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/invitationRulePhone",
    name: "invitationRulePhone",
    component: invitationRulePhone,
    meta: {
      breadcrumb: "???????????????????????????"
    }
  },
  {
    path: "/phone/invitationDrawingPhone",
    name: "invitationDrawingPhone",
    component: invitationDrawingPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/inquiryTeacherPhone",
    name: "inquiryTeacherPhone",
    component: inquiryTeacherPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/replacePhone",
    name: "replacePhone",
    component: replacePhone,
    meta: {
      breadcrumb: "????????????????????????"
    }
  },
  {
    path: "/phone/updateNamePhone",
    name: "updateNamePhone",
    component: updateNamePhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/personalPhone",
    name: "personalPhone",
    component: personalPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/aboutAppPhone",
    name: "aboutAppPhone",
    component: aboutAppPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/helpCenterPhone",
    name: "helpCenterPhone",
    component: helpCenterPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/toTeachPhone",
    name: "toTeachPhone",
    component: toTeachPhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/evaluatePhone",
    name: "evaluatePhone",
    component: evaluatePhone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/phone/myCouponPhone",
    name: "myCouponPhone",
    component: myCouponPhone,
    meta: {
      breadcrumb: "????????????????????????"
    }
  },
  {
    path: "/phone/useCouponPhone",
    name: "useCouponPhone",
    component: useCouponPhone,
    meta: {
      breadcrumb: "????????????????????????"
    }
  },
  {
    path: "/phone/standardCurriculumListPhone",
    name: "standardCurriculumListPhone",
    component: standardCurriculumListPhone,
    meta: {
      keepalive: true,
      breadcrumb: "??????????????????????????????"
    }
  },
  {
    path: "/phone/phoneNewSchedule",
    name: "phoneNewSchedule",
    component: phoneNewSchedule,
    meta: {
      keepalive: true,
      breadcrumb: "???????????????????????????"
    }
  },
  {
    path: "/phone/accessCode",
    name: "accessCode",
    component: accessCode,
    meta: {
      breadcrumb: "????????????????????????????????????"
    }
  },
  {
    path: "/phone/changePassword",
    name: "changePassword",
    component: changePassword,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/phone/retrievePassword",
    name: "retrievePassword",
    component: retrievePassword,
    meta: {
      breadcrumb: "????????????????????????????????????"
    }
  },
  {
    path: "/phone/logisticsInfo",
    name: "logisticsInfo",
    component: logisticsInfo,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/phone/settingPhone",
    name: "settingPhone",
    component: settingPhone,
    meta: {
      breadcrumb: "???????????????????????????"
    }
  }
];

const signRouterMap = [
  {
    path: "/sign/signUp",
    name: "sign-signUp",
    component: signUp,
    meta: {
      breadcrumb: "????????????1"
    }
  },
  {
    path: "/sign/signUpCanvas",
    name: "sign-signUpCanvas",
    component: signUpCanvas,
    meta: {
      keepalive: false,
      breadcrumb: "????????????2"
    }
  }
];
const homeRouterMap = [
  {
    path: "/home",
    name: "home-home",
    component: home,
    meta: {
      breadcrumb: "??????"
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
      breadcrumb: "pc???????????????"
    }
  },
  {
    path: "/answer/classroomPractice",
    name: "classroomPractice",
    component: classroomPractice,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/answer/myAnswer",
    name: "myAnswer",
    component: myAnswer,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "??????????????????????????????"
    }
  },
  {
    path: "/answer/teachStage",
    name: "teachStage",
    component: teachStage,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "??????"
    }
  },
  {
    path: "/answer/answerCard",
    name: "answerCard",
    component: answerCard,
    meta: {
      bg: "dark",
      noRefresh: true,
      breadcrumb: "?????????"
    }
  }
];

const courseRouterMap = [
  {
    path: "/course/playCourse",
    name: "course-playCourse",
    component: playCourse,
    meta: {
      breadcrumb: "?????????"
    }
  }
];
const classRouterMap = [
  {
    path: "/pc/curriculumList",
    name: "pc-curriculumList",
    component: pccurriculumList,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/pc/findPc",
    name: "pc-findPc",
    component: findPc,
    meta: {
      breadcrumb: "PC??????"
    }
  },
  {
    path: "/pc/orderPc",
    name: "pc-orderPc",
    component: orderPc,
    meta: {
      breadcrumb: "PC??????"
    }
  },
  {
    path: "/pc/Myorder",
    name: "pc-Myorder",
    component: Myorder,
    meta: {
      breadcrumb: "PC????????????"
    }
  },
  {
    path: "/pc/OrderInformation",
    name: "pc-OrderInformation",
    component: OrderInformation,
    meta: {
      breadcrumb: "PC????????????"
    }
  },
  {
    path: "/pc/Orderdetails",
    name: "pc-Orderdetails",
    component: Orderdetails,
    meta: {
      breadcrumb: "PC????????????"
    }
  },
  {
    path: "/pc/Homepage",
    name: "pc-Homepage",
    component: Homepage,
    meta: {
      breadcrumb: "PC??????"
    }
  },
  {
    path: "/pc/Me",
    name: "pc-Me",
    component: Me,
    meta: {
      breadcrumb: "PC??????"
    }
  },
  {
    path: "/pc/Smallclass",
    name: "pc-Smallclass",
    component: Smallclass,
    meta: {
      breadcrumb: "PC?????????"
    }
  },
  {
    path: "/pc/Studentschedules",
    name: "pc-Studentschedules",
    component: Studentschedules,
    meta: {
      breadcrumb: "PC??????"
    }
  },
  {
    path: "/pc/pcNewSchedule",
    name: "pc-pcNewSchedule",
    component: pcNewSchedule,
    meta: {
      breadcrumb: "ipad?????????"
    }
  },
  {
    path: "/pc/pcSchedule",
    name: "pc-pcSchedule",
    component: pcSchedule,
    meta: {
      breadcrumb: "PC?????????"
    }
  },
  {
    path: "/pc/prepareLessons",
    name: "pc-prepareLessons",
    component: prepareLessons,
    meta: {
      breadcrumb: "PC????????????"
    }
  },
  {
    path: "/pc/pcLiveCourseUnit",
    name: "pc-pcLiveCourseUnit",
    component: pcLiveCourseUnit,
    meta: {
      breadcrumb: "PC???????????????"
    }
  },
  {
    path: "/pc/improveInfoPc",
    name: "pc-improveInfoPc",
    component: improveInfoPc,
    meta: {
      breadcrumb: "pc????????????"
    }
  },
  {
    path: "/pc/New",
    name: "pc-New",
    component: New,
    meta: {
      breadcrumb: "pc??????????????????"
    }
  },
  {
    path: "/pc/Orders",
    name: "pc-Orders",
    component: Orders,
    meta: {
      breadcrumb: "pc??????????????????"
    }
  },
  {
    path: "/pc/Trialclass",
    name: "pc-Trialclass",
    component: Trialclass,
    meta: {
      breadcrumb: "pc?????????"
    }
  },
  {
    path: "/pc/Consult",
    name: "pc-Consult",
    component: Consult,
    meta: {
      breadcrumb: "pc????????????"
    }
  },
  {
    path: "/pc/Fillorder",
    name: "pc-Fillorder",
    component: Fillorder,
    meta: {
      breadcrumb: "pc??????????????????"
    }
  },
  {
    path: "/pc/Shippingaddress",
    name: "pc-Shippingaddress",
    component: Shippingaddress,
    meta: {
      breadcrumb: "pc??????????????????"
    }
  },
  {
    path: "/pc/Selectaddress",
    name: "pc-Selectaddress",
    component: Selectaddress,
    meta: {
      breadcrumb: "pc??????????????????"
    }
  },
  {
    path: "/pc/Signup",
    name: "pc-Signup",
    component: Signup,
    meta: {
      breadcrumb: "pc????????????"
    }
  },
  {
    path: "/pc/Set",
    name: "pc-Set",
    component: Set,
    meta: {
      breadcrumb: "pc??????"
    }
  },
  {
    path: "/pc/Personalpc",
    name: "pc-Personalpc",
    component: Personalpc,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/pc/RecordListpc",
    name: "pc-RecordListpc",
    component: RecordListpc,
    meta: {
      breadcrumb: "pc????????????"
    }
  },
  {
    path: "/pc/Middlepagepc",
    name: "pc-Middlepagepc",
    component: Middlepagepc,
    meta: {
      breadcrumb: "pc????????????????????????"
    }
  },
  {
    path: "/pc/Rule",
    name: "pc-Rule",
    component: Rule,
    meta: {
      breadcrumb: "ipad ??????????????????"
    }
  },
  {
    path: "/pc/Earnings",
    name: "pc-Earnings",
    component: Earnings,
    meta: {
      breadcrumb: "ipad ??????????????????"
    }
  },
  {
    path: "/pc/Award",
    name: "pc-Award",
    component: Award,
    meta: {
      breadcrumb: "ipad ??????????????????"
    }
  },
  {
    path: "/pc/Withdraw",
    name: "pc-Withdraw",
    component: Withdraw,
    meta: {
      breadcrumb: "ipad ????????????"
    }
  },
  {
    path: "/pc/Replacephone",
    name: "pc-Replacephone",
    component: Replacephone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/pc/Originalphone",
    name: "pc-Originalphone",
    component: Originalphone,
    meta: {
      breadcrumb: "??????????????????"
    }
  },
  {
    path: "/pc/Codephone",
    name: "pc-Codephone",
    component: Codephone,
    meta: {
      breadcrumb: "?????????????????????"
    }
  },
  {
    path: "/pc/Nickname",
    name: "pc-Nickname",
    component: Nickname,
    meta: {
      breadcrumb: "??????????????????"
    }
  },
  {
    path: "/pc/policyPhone",
    name: "pc-policyPhone",
    component: policyPhone,
    meta: {
      breadcrumb: "??????????????????"
    }
  },
  {
    path: "/pc/privacyPhone",
    name: "pc-privacyPhone",
    component: pcprivacyPhone,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/pc/Aboutapppc",
    name: "pc-Aboutapppc",
    component: Aboutapppc,
    meta: {
      breadcrumb: "??????"
    }
  },
  {
    path: "/pc/Attendclass",
    name: "pc-Attendclass",
    component: Attendclass,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/pc/Help",
    name: "pc-Help",
    component: Help,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/pc/Evaluatelist",
    name: "pc-Evaluatelist",
    component: Evaluatelist,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/pc/Submit",
    name: "pc-Submit",
    component: Submit,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/pc/evaluatePc",
    name: "pc-evaluatePc",
    component: evaluatePc,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/pc/teacherReport",
    name: "pc-teacherReport",
    component: teacherReport,
    meta: {
      breadcrumb: "??????????????????"
    }
  },
  {
    path: "/pc/myCoupon",
    name: "pc-myCoupon",
    component: myCoupon,
    meta: {
      breadcrumb: "???????????????"
    }
  },
  {
    path: "/pc/Courselist",
    name: "pc-Courselist",
    component: Courselist,
    meta: {
      breadcrumb: "pc???????????????"
    }
  },
  {
    path: "/pc/Login",
    name: "pc-Login",
    component: Login,
    meta: {
      breadcrumb: "??????web???"
    }
  },
  {
    path: "/pc/logisticsInfo",
    name: "pc-logisticsInfo",
    component: pclogisticsInfo,
    meta: {
      breadcrumb: "????????????"
    }
  },
  {
    path: "/pc/invitationHomePad",
    name: "pc-invitationHomePad",
    component: invitationHomePad,
    meta: {
      breadcrumb: "????????????pad???"
    }
  }
];
const currRouterMap = [
  {
    path: "/curriculum/curriculumList",
    name: "curriculum-curriculumList",
    component: curriculumList,
    meta: {
      breadcrumb: "????????????"
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
//           breadcrumb: "??????"
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
//           breadcrumb: "????????????pad"
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
//           breadcrumb: "??????pad"
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
//           breadcrumb: "??????pad"
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
//           breadcrumb: "??????"
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
//           breadcrumb: "?????????"
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
//           breadcrumb: "?????????"
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
//           breadcrumb: "?????????"
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
//           breadcrumb: "?????????"
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
//           breadcrumb: "????????????web???"
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
//           breadcrumb: "????????????web???"
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
//           breadcrumb: "????????????web???"
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
//           breadcrumb: "??????ipad???"
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
//           breadcrumb: "????????????ipad???"
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
//           breadcrumb: "?????????ipad???"
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
//           breadcrumb: "??????ipad???"
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
//           breadcrumb: "??????ipad???"
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
//           breadcrumb: "????????????ipad???"
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
//           breadcrumb: "????????????ipad???"
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
//           breadcrumb: "??????"
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
//           breadcrumb: "??????"
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
//           breadcrumb: "????????????"
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
//           breadcrumb: "????????????"
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
//           breadcrumb: "?????????"
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
//           breadcrumb: "?????????"
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
//           breadcrumb: "???????????????"
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
//           breadcrumb: "???????????????"
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
//           breadcrumb: "????????????"
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
//           breadcrumb: "?????????"
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
//           breadcrumb: "????????????????????????"
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
//           breadcrumb: "???????????????????????????"
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
//           breadcrumb: "???????????????????????????"
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
//           breadcrumb: "???????????????????????????"
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
//           breadcrumb: "?????????????????????????????????"
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
//           breadcrumb: "??????????????????????????????"
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
//           breadcrumb: "?????????????????????"
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
//           breadcrumb: "????????????"
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
//           breadcrumb: "????????????"
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
