import Vue from "vue";
import VueRouter from "vue-router";

import curriculumList from "./views/pc/curriculumList.vue";
import secondList from "./views/list/secondList.vue";
import Studentschedules from "./views/pc/Studentschedules.vue";
import pcLogin from "./views/pc/Login.vue";
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
import policyPhone from "./views/phone/policyPhone.vue";
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

Vue.use(VueRouter);

const listRouterMap = [
  {
    path: "/pc/Studentschedules",
    name: "pcStudentschedules",
    component: Studentschedules,
    meta: {
      breadcrumb: "报名成功1"
    }
  }
];
const loginMap = [
  {
    path: "/pc/Login",
    name: "pcLogin",
    component: pcLogin
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
    name: "policyPhone",
    component: policyPhone,
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
// const signRouterMap = [
//   {
//     path: "/sign",
//     redirect: "/sign/signUp",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "signUp",
//         name: "signUp",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "signUp" */ "./views/sign/signUp.vue")
//               ),
//             "signUp"
//           ),

//         meta: {
//           breadcrumb: "报名成功1"
//         }
//       },
//       {
//         path: "signUpCanvas",
//         name: "signUpCanvas",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "signUpCanvas" */ "./views/sign/signUpCanvas.vue")
//               ),
//             "signUpCanvas"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "报名成功2"
//         }
//       }
//     ]
//   }
// ];
// const homeRouterMap = [
//   {
//     path: "/",
//     redirect: "/home",
//     // name: "home",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "home",
//         name: "home",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "home" */ "./views/home/home.vue")
//               ),
//             "home"
//           ),

//         meta: {
//           breadcrumb: "首页"
//         }
//       },
//       {
//         path: "tab",
//         name: "tab",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(require(/* webpackChunkName: "tab" */ "./views/home/tab.vue")),
//             "tab"
//           ),

//         meta: {
//           noRefresh: true,
//           breadcrumb: "tab"
//         }
//       },
//       {
//         path: "player",
//         name: "player",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "player" */ "./views/home/player.vue")
//               ),
//             "player"
//           ),

//         meta: {
//           breadcrumb: "播放"
//         }
//       },
//       {
//         path: "landingPage",
//         name: "landingPage",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "home" */ "./views/home/landingPage.vue")
//               ),
//             "landingPage"
//           ),

//         meta: {
//           keepalive: false,
//           breadcrumb: "落地页面"
//         }
//       },
//       {
//         path: "selectCourseType",
//         name: "selectCourseType",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "home" */ "./views/home/selectCourseType.vue")
//               ),
//             "selectCourseType"
//           ),

//         meta: {
//           breadcrumb: "选择课程类型"
//         }
//       },
//       {
//         path: "lp",
//         name: "landingPagePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "home" */ "./views/home/landingPagePhone.vue")
//               ),
//             "landingPagePhone"
//           ),

//         meta: {
//           breadcrumb: "购买课程"
//         }
//       }
//     ]
//   }
// ];

// const courseRouterMap = [
//   {
//     path: "/course",
//     redirect: "/course/playCourse",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "playCourse",
//         name: "playCourse",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "playCourse" */ "./views/course/playCourse.vue")
//               ),
//             "playCourse"
//           ),

//         meta: {
//           breadcrumb: "播放页"
//         }
//       }
//     ]
//   }
// ];
// const classRouterMap = [
//   {
//     path: "/pc",
//     redirect: "/pc/curriculumList",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "curriculumList",
//         name: "curriculumList",
//         component: curriculumList,

//         // r =>
//         //   require.ensure(
//         //     [],
//         //     () =>
//         //       r(
//         //         require(/* webpackChunkName: "curriculumList" */ "./views/pc/curriculumList.vue")
//         //       ),
//         //     "curriculumList"
//         //   ),

//         meta: {
//           breadcrumb: "我的课程"
//         }
//       },
//       {
//         path: "findPc",
//         name: "findPc",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "findPc" */ "./views/pc/findPc.vue")
//               ),
//             "findPc"
//           ),

//         meta: {
//           breadcrumb: "PC发现"
//         }
//       },
//       {
//         path: "orderPc",
//         name: "orderPc",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/orderPc.vue")
//               ),
//             "orderPc"
//           ),

//         meta: {
//           breadcrumb: "PC订单"
//         }
//       },
//       {
//         path: "Myorder",
//         name: "Myorder",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Myorder.vue")
//               ),
//             "Myorder"
//           ),

//         meta: {
//           breadcrumb: "PC我的订单"
//         }
//       },
//       {
//         path: "OrderInformation",
//         name: "OrderInformation",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/OrderInformation.vue")
//               ),
//             "OrderInformation"
//           ),

//         meta: {
//           breadcrumb: "PC订单信息"
//         }
//       },
//       {
//         path: "Orderdetails",
//         name: "Orderdetails",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Orderdetails.vue")
//               ),
//             "Orderdetails"
//           ),

//         meta: {
//           breadcrumb: "PC订单详情"
//         }
//       },
//       {
//         path: "Homepage",
//         name: "Homepage",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Homepage.vue")
//               ),
//             "Homepage"
//           ),

//         meta: {
//           breadcrumb: "PC首页"
//         }
//       },
//       {
//         path: "Me",
//         name: "Me",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(require(/* webpackChunkName: "orderPC" */ "./views/pc/Me.vue")),
//             "Me"
//           ),

//         meta: {
//           breadcrumb: "PC我的"
//         }
//       },
//       {
//         path: "Smallclass",
//         name: "Smallclass",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Smallclass.vue")
//               ),
//             "Smallclass"
//           ),

//         meta: {
//           breadcrumb: "PC小课堂"
//         }
//       },
//       {
//         path: "Studentschedules",
//         name: "Studentschedules",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Studentschedules.vue")
//               ),
//             "Studentschedules"
//           ),

//         meta: {
//           breadcrumb: "PC课表"
//         }
//       },
//       {
//         path: "pcNewSchedule",
//         name: "pcNewSchedule",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "pcNewSchedule" */ "./views/pc/pcNewSchedule.vue")
//               ),
//             "pcNewSchedule"
//           ),

//         meta: {
//           breadcrumb: "ipad新课表"
//         }
//       },
//       {
//         path: "pcSchedule",
//         name: "pcSchedule",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "pcSchedule" */ "./views/pc/pcSchedule.vue")
//               ),
//             "pcSchedule"
//           ),

//         meta: {
//           breadcrumb: "PC新课表"
//         }
//       },
//       {
//         path: "prepareLessons",
//         name: "prepareLessons",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "prepareLessons" */ "./views/pc/prepareLessons.vue")
//               ),
//             "prepareLessons"
//           ),

//         meta: {
//           breadcrumb: "PC教师备课"
//         }
//       },
//       {
//         path: "pcLiveCourseUnit",
//         name: "pcLiveCourseUnit",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "pcLiveCourseUnit" */ "./views/pc/pcLiveCourseUnit.vue")
//               ),
//             "pcLiveCourseUnit"
//           ),

//         meta: {
//           breadcrumb: "PC直播课单元"
//         }
//       },
//       {
//         path: "improveInfoPc",
//         name: "improveInfoPc",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/improveInfoPc.vue")
//               ),
//             "improveInfoPc"
//           ),

//         meta: {
//           breadcrumb: "pc更换头像"
//         }
//       },
//       {
//         path: "New",
//         name: "New",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/New.vue")
//               ),
//             "New"
//           ),

//         meta: {
//           breadcrumb: "pc新的订单详情"
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
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Orders.vue")
//               ),
//             "Orders"
//           ),

//         meta: {
//           breadcrumb: "pc新的我的订单"
//         }
//       },
//       {
//         path: "Trialclass",
//         name: "Trialclass",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Trialclass.vue")
//               ),
//             "Trialclass"
//           ),

//         meta: {
//           breadcrumb: "pc体验课"
//         }
//       },
//       {
//         path: "Consult",
//         name: "Consult",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Consult.vue")
//               ),
//             "Consult"
//           ),

//         meta: {
//           breadcrumb: "pc咨询老师"
//         }
//       },
//       {
//         path: "Fillorder",
//         name: "Fillorder",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Fillorder.vue")
//               ),
//             "Fillorder"
//           ),

//         meta: {
//           breadcrumb: "pc填写订单页面"
//         }
//       },
//       {
//         path: "Shippingaddress",
//         name: "Shippingaddress",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Shippingaddress.vue")
//               ),
//             "Shippingaddress"
//           ),

//         meta: {
//           breadcrumb: "pc填写收货地址"
//         }
//       },
//       {
//         path: "prepareLessons",
//         name: "prepareLessons",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "prepareLessons" */ "./views/pc/prepareLessons.vue")
//               ),
//             "prepareLessons"
//           ),

//         meta: {
//           breadcrumb: "pc备课"
//         }
//       },

//       {
//         path: "Selectaddress",
//         name: "Selectaddress",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Selectaddress.vue")
//               ),
//             "Selectaddress"
//           ),

//         meta: {
//           breadcrumb: "pc选择收货地址"
//         }
//       },
//       {
//         path: "Signup",
//         name: "Signup",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Signup.vue")
//               ),
//             "Signup"
//           ),

//         meta: {
//           breadcrumb: "pc报名成功"
//         }
//       },
//       {
//         path: "Set",
//         name: "Set",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Set.vue")
//               ),
//             "Set"
//           ),

//         meta: {
//           breadcrumb: "pc设置"
//         }
//       },
//       {
//         path: "Personalpc",
//         name: "Personalpc",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Personalpc.vue")
//               ),
//             "Personalpc"
//           ),

//         meta: {
//           breadcrumb: "个人资料"
//         }
//       },
//       {
//         path: "RecordListpc",
//         name: "RecordListpc",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/RecordListpc.vue")
//               ),
//             "RecordListpc"
//           ),

//         meta: {
//           breadcrumb: "pc录播列表"
//         }
//       },
//       {
//         path: "Middlepagepc",
//         name: "Middlepagepc",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Middlepagepc.vue")
//               ),
//             "Middlepagepc"
//           ),

//         meta: {
//           breadcrumb: "pc微信支付的中间页"
//         }
//       },
//       {
//         path: "Rule",
//         name: "Rule",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Rule.vue")
//               ),
//             "Rule"
//           ),

//         meta: {
//           breadcrumb: "ipad 赏金规则页面"
//         }
//       },
//       {
//         path: "Earnings",
//         name: "Earnings",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Earnings.vue")
//               ),
//             "Earnings"
//           ),

//         meta: {
//           breadcrumb: "ipad 赏金收益页面"
//         }
//       },
//       {
//         path: "Award",
//         name: "Award",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Award.vue")
//               ),
//             "Award"
//           ),

//         meta: {
//           breadcrumb: "ipad 赏金奖励页面"
//         }
//       },
//       {
//         path: "Withdraw",
//         name: "Withdraw",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Withdraw.vue")
//               ),
//             "Withdraw"
//           ),

//         meta: {
//           breadcrumb: "ipad 提现页面"
//         }
//       },
//       {
//         path: "Replacephone",
//         name: "Replacephone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Replacephone.vue")
//               ),
//             "Replacephone"
//           ),

//         meta: {
//           breadcrumb: "更换手机号页面"
//         }
//       },
//       {
//         path: "Originalphone",
//         name: "Originalphone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Originalphone.vue")
//               ),
//             "Originalphone"
//           ),

//         meta: {
//           breadcrumb: "原手机号页面"
//         }
//       },
//       {
//         path: "Codephone",
//         name: "Codephone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Codephone.vue")
//               ),
//             "Codephone"
//           ),

//         meta: {
//           breadcrumb: "输入验证码页面"
//         }
//       },
//       {
//         path: "Nickname",
//         name: "Nickname",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Nickname.vue")
//               ),
//             "Nickname"
//           ),

//         meta: {
//           breadcrumb: "修改昵称页面"
//         }
//       },
//       {
//         path: "policyPhone",
//         name: "policyPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/policyPhone.vue")
//               ),
//             "policyPhone"
//           ),

//         meta: {
//           breadcrumb: "用户注册协议"
//         }
//       },
//       {
//         path: "privacyPhone",
//         name: "privacyPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/privacyPhone.vue")
//               ),
//             "privacyPhone"
//           ),

//         meta: {
//           breadcrumb: "隐私政策"
//         }
//       },
//       {
//         path: "Aboutapppc",
//         name: "Aboutapppc",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Aboutapppc.vue")
//               ),
//             "Aboutapppc"
//           ),

//         meta: {
//           breadcrumb: "关于猴猴画"
//         }
//       },
//       {
//         path: "Attendclass",
//         name: "Attendclass",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Attendclass.vue")
//               ),
//             "Attendclass"
//           ),

//         meta: {
//           breadcrumb: "如何上课"
//         }
//       },
//       {
//         path: "Help",
//         name: "Help",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Help.vue")
//               ),
//             "Help"
//           ),

//         meta: {
//           breadcrumb: "帮助中心"
//         }
//       },
//       {
//         path: "Evaluatelist",
//         name: "Evaluatelist",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Evaluatelist.vue")
//               ),
//             "Evaluatelist"
//           ),

//         meta: {
//           breadcrumb: "评价列表"
//         }
//       },
//       {
//         path: "Submit",
//         name: "Submit",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/Submit.vue")
//               ),
//             "Submit"
//           ),

//         meta: {
//           breadcrumb: "提交评价"
//         }
//       },
//       {
//         path: "evaluatePc",
//         name: "evaluatePc",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/evaluatePc.vue")
//               ),
//             "evaluatePc"
//           ),

//         meta: {
//           breadcrumb: "学生评价"
//         }
//       },
//       {
//         path: "teacherReport",
//         name: "teacherReport",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "teacherReport" */ "./views/pc/teacherReport.vue")
//               ),
//             "teacherReport"
//           ),

//         meta: {
//           breadcrumb: "教师课堂报告"
//         }
//       },
//       {
//         path: "myCoupon",
//         name: "myCoupon",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPC" */ "./views/pc/myCoupon.vue")
//               ),
//             "myCoupon"
//           ),

//         meta: {
//           breadcrumb: "我的优惠券"
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
//                 require(/* webpackChunkName: "Courselist" */ "./views/pc/Courselist.vue")
//               ),
//             "Courselist"
//           ),

//         meta: {
//           breadcrumb: "pc更多的页面"
//         }
//       },
//       {
//         path: "Login",
//         name: "Login",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "Login" */ "./views/pc/Login.vue")
//               ),
//             "Login"
//           ),

//         meta: {
//           breadcrumb: "登录web端"
//         }
//       },
//       {
//         path: "logisticsInfo",
//         name: "logisticsInfo",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "logisticsInfo" */ "./views/pc/logisticsInfo.vue")
//               ),
//             "logisticsInfo"
//           ),

//         meta: {
//           breadcrumb: "物流信息"
//         }
//       },
//       {
//         path: "invitationHomePad",
//         name: "invitationHomePad",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "invitationHomePad" */ "./views/pc/invitationHomePad.vue")
//               ),
//             "invitationHomePad"
//           ),

//         meta: {
//           breadcrumb: "分销首页pad端"
//         }
//       }
//     ]
//   }
// ];
// const currRouterMap = [
//   {
//     path: "/curriculum",
//     redirect: "/curriculum",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "curriculumList",
//         name: "curriculumList",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "curriculumList" */ "./views/curriculum/curriculumList.vue")
//               ),
//             "curriculumList"
//           ),

//         meta: {
//           breadcrumb: "我的课程"
//         }
//       }
//     ]
//   }
// ];
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
// const phoneRouterMap = [
//   {
//     path: "/phone",
//     redirect: "/phone/findPhone",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "morePhone",
//         name: "morePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "morePhone" */ "./views/phone/morePhone.vue")
//               ),
//             "morePhone"
//           ),

//         meta: {
//           breadcrumb: "更多移动端"
//         }
//       },
//       {
//         path: "homePagePhone",
//         name: "homePagePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "homePagePhone" */ "./views/phone/homePagePhone.vue")
//               ),
//             "homePagePhone"
//           ),

//         meta: {
//           breadcrumb: "ydt首页移动端"
//         }
//       },

//       {
//         path: "curriculumListPhone",
//         name: "curriculumListPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "curriculumListPhone" */ "./views/phone/curriculumListPhone.vue")
//               ),
//             "curriculumListPhone"
//           ),

//         meta: {
//           breadcrumb: "我的课程移动端"
//         }
//       },
//       {
//         path: "findPhone",
//         name: "findPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "findPhone" */ "./views/phone/findPhone.vue")
//               ),
//             "findPhone"
//           ),

//         meta: {
//           breadcrumb: "发现移动端"
//         }
//       },
//       {
//         path: "loginPhone",
//         name: "loginPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "loginPhone" */ "./views/phone/loginPhone.vue")
//               ),
//             "loginPhone"
//           ),

//         meta: {
//           breadcrumb: "登录"
//         }
//       },
//       {
//         path: "orderPhone",
//         name: "orderPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderPhone" */ "./views/phone/orderPhone.vue")
//               ),
//             "orderPhone"
//           ),

//         meta: {
//           breadcrumb: "订单移动端"
//         }
//       },
//       {
//         path: "orderDetailsPhone",
//         name: "orderDetailsPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "orderDetailsPhone" */ "./views/phone/orderDetailsPhone.vue")
//               ),
//             "orderDetailsPhone"
//           ),

//         meta: {
//           breadcrumb: "订单详情移动端"
//         }
//       },
//       {
//         path: "courseDetailsPhone",
//         name: "courseDetailsPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "courseDetails" */ "./views/phone/courseDetailsPhone.vue")
//               ),
//             "courseDetailsPhone"
//           ),

//         meta: {
//           breadcrumb: "课程详情移动端审核版"
//         }
//       },
//       {
//         path: "createOrderPhone",
//         name: "createOrderPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "courseDetails" */ "./views/phone/createOrderPhone.vue")
//               ),
//             "createOrderPhone"
//           ),

//         meta: {
//           breadcrumb: "创建订单移动端审核版"
//         }
//       },
//       {
//         path: "addAddressPhone",
//         name: "addAddressPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "addAddressPhone" */ "./views/phone/addAddressPhone.vue")
//               ),
//             "addAddressPhone"
//           ),

//         meta: {
//           breadcrumb: "填写收货地址移动端"
//         }
//       },
//       {
//         path: "wechatAddPhone",
//         name: "wechatAddPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "wechatAddPhone" */ "./views/phone/wechatAddPhone.vue")
//               ),
//             "wechatAddPhone"
//           ),

//         meta: {
//           breadcrumb: "添加微信移动端"
//         }
//       },
//       {
//         path: "secondListPhone",
//         name: "secondListPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "secondListPhone" */ "./views/phone/secondListPhone.vue")
//               ),
//             "secondListPhone"
//           ),

//         meta: {
//           breadcrumb: "二阶目录移动端"
//         }
//       },
//       {
//         path: "myInfoPhone",
//         name: "myInfoPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "myInfoPhone" */ "./views/phone/myInfoPhone.vue")
//               ),
//             "myInfoPhone"
//           ),

//         meta: {
//           breadcrumb: "我的移动端"
//         }
//       },
//       {
//         path: "settingPhone",
//         name: "settingPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "settingPhone" */ "./views/phone/settingPhone.vue")
//               ),
//             "settingPhone"
//           ),

//         meta: {
//           breadcrumb: "个人信息设置移动端"
//         }
//       },
//       {
//         path: "policyPhone",
//         name: "policyPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "policyPhone" */ "./views/phone/policyPhone.vue")
//               ),
//             "policyPhone"
//           ),

//         meta: {
//           breadcrumb: "用户服务条款移动端"
//         }
//       },
//       {
//         path: "privacyPhone",
//         name: "privacyPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "privacyPhone" */ "./views/phone/privacyPhone.vue")
//               ),
//             "privacyPhone"
//           ),

//         meta: {
//           breadcrumb: "用户隐私条款移动端"
//         }
//       },
//       {
//         path: "middlePagePhone",
//         name: "middlePagePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "middlePagePhone" */ "./views/phone/middlePagePhone.vue")
//               ),
//             "middlePagePhone"
//           ),

//         meta: {
//           breadcrumb: "微信支付中间页款移动端"
//         }
//       },
//       {
//         path: "improveInfoPhone",
//         name: "improveInfoPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "improveInfoPhone" */ "./views/phone/improveInfoPhone.vue")
//               ),
//             "improveInfoPhone"
//           ),

//         meta: {
//           breadcrumb: "完善个人信息移动端"
//         }
//       },
//       {
//         path: "smallClassPhone",
//         name: "smallClassPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "smallClassPhone" */ "./views/phone/smallClassPhone.vue")
//               ),
//             "smallClassPhone"
//           ),

//         meta: {
//           breadcrumb: "小课堂移动端"
//         }
//       },
//       {
//         path: "classDetailsPhone",
//         name: "classDetailsPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "classDetailsPhone" */ "./views/phone/classDetailsPhone.vue")
//               ),
//             "classDetailsPhone"
//           ),

//         meta: {
//           breadcrumb: "课程详情移动端"
//         }
//       },
//       {
//         path: "projectionPhone",
//         name: "projectionPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "projectionPhone" */ "./views/phone/projectionPhone.vue")
//               ),
//             "projectionPhone"
//           ),

//         meta: {
//           breadcrumb: "课件投屏移动端"
//         }
//       },
//       {
//         path: "createOrderAddressPhone",
//         name: "createOrderAddressPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "createOrderAddressPhone" */ "./views/phone/createOrderAddressPhone.vue")
//               ),
//             "createOrderAddressPhone"
//           ),

//         meta: {
//           breadcrumb: "创建订单移动端"
//         }
//       },
//       {
//         path: "writeAddressPhone",
//         name: "writeAddressPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "writeAddressPhone" */ "./views/phone/writeAddressPhone.vue")
//               ),
//             "writeAddressPhone"
//           ),

//         meta: {
//           breadcrumb: "填写地址移动端"
//         }
//       },
//       {
//         path: "choiceAddressPhone",
//         name: "choiceAddressPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "choiceAddressPhone" */ "./views/phone/choiceAddressPhone.vue")
//               ),
//             "choiceAddressPhone"
//           ),

//         meta: {
//           breadcrumb: "选择地址移动端"
//         }
//       },
//       {
//         path: "recordListPhone",
//         name: "recordListPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "recordListPhone" */ "./views/phone/recordListPhone.vue")
//               ),
//             "recordListPhone"
//           ),

//         meta: {
//           breadcrumb: "录播课二级列表移动端"
//         }
//       },
//       {
//         path: "smallClassDetailsPhone",
//         name: "smallClassDetailsPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "smallClassDetailsPhone" */ "./views/phone/smallClassDetailsPhone.vue")
//               ),
//             "smallClassDetailsPhone"
//           ),

//         meta: {
//           title: "课程详情",
//           breadcrumb: "小课堂详情移动端"
//         }
//       },
//       {
//         path: "invitationPhone",
//         name: "invitationPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "invitationPhone" */ "./views/phone/invitationPhone.vue")
//               ),
//             "invitationPhone"
//           ),

//         meta: {
//           breadcrumb: "邀请有礼移动端"
//         }
//       },
//       {
//         path: "invitationHomePhone",
//         name: "invitationHomePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "invitationHomePhone" */ "./views/phone/invitationHomePhone.vue")
//               ),
//             "invitationHomePhone"
//           ),

//         meta: {
//           breadcrumb: "首页邀请有礼移动端"
//         }
//       },

//       {
//         path: "invitationProfitPhone",
//         name: "invitationProfitPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "invitationProfitPhone" */ "./views/phone/invitationProfitPhone.vue")
//               ),
//             "invitationProfitPhone"
//           ),

//         meta: {
//           breadcrumb: "邀请收益移动端"
//         }
//       },
//       {
//         path: "invitationRulePhone",
//         name: "invitationRulePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "invitationRulePhone" */ "./views/phone/invitationRulePhone.vue")
//               ),
//             "invitationRulePhone"
//           ),

//         meta: {
//           breadcrumb: "邀请收益规则移动端"
//         }
//       },
//       {
//         path: "invitationDrawingPhone",
//         name: "invitationDrawingPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "invitationDrawingPhone" */ "./views/phone/invitationDrawingPhone.vue")
//               ),
//             "invitationDrawingPhone"
//           ),

//         meta: {
//           breadcrumb: "邀请提现移动端"
//         }
//       },
//       {
//         path: "inquiryTeacherPhone",
//         name: "inquiryTeacherPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "inquiryTeacherPhone" */ "./views/phone/inquiryTeacherPhone.vue")
//               ),
//             "inquiryTeacherPhone"
//           ),

//         meta: {
//           breadcrumb: "询问教师移动端"
//         }
//       },
//       {
//         path: "replacePhone",
//         name: "replacePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "replacePhone" */ "./views/phone/replacePhone.vue")
//               ),
//             "replacePhone"
//           ),

//         meta: {
//           breadcrumb: "更换手机号移动端"
//         }
//       },
//       {
//         path: "updateNamePhone",
//         name: "updateNamePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "updateNamePhone" */ "./views/phone/updateNamePhone.vue")
//               ),
//             "updateNamePhone"
//           ),

//         meta: {
//           breadcrumb: "更改姓名移动端"
//         }
//       },
//       {
//         path: "personalPhone",
//         name: "personalPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "personalPhone" */ "./views/phone/personalPhone.vue")
//               ),
//             "personalPhone"
//           ),

//         meta: {
//           breadcrumb: "程序设置移动端"
//         }
//       },

//       {
//         path: "aboutAppPhone",
//         name: "aboutAppPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "aboutAppPhone" */ "./views/phone/aboutAppPhone.vue")
//               ),
//             "aboutAppPhone"
//           ),

//         meta: {
//           breadcrumb: "关于程序移动端"
//         }
//       },
//       {
//         path: "helpCenterPhone",
//         name: "helpCenterPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "helpCenterPhone" */ "./views/phone/helpCenterPhone.vue")
//               ),
//             "helpCenterPhone"
//           ),

//         meta: {
//           breadcrumb: "帮助中心移动端"
//         }
//       },
//       {
//         path: "toTeachPhone",
//         name: "toTeachPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "toTeachPhone" */ "./views/phone/toTeachPhone.vue")
//               ),
//             "toTeachPhone"
//           ),

//         meta: {
//           breadcrumb: "如何上课移动端"
//         }
//       },
//       {
//         path: "evaluatePhone",
//         name: "evaluatePhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "evaluatePhone" */ "./views/phone/evaluatePhone.vue")
//               ),
//             "evaluatePhone"
//           ),

//         meta: {
//           breadcrumb: "学生评价移动端"
//         }
//       },
//       {
//         path: "myCouponPhone",
//         name: "myCouponPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "myCouponPhone" */ "./views/phone/myCouponPhone.vue")
//               ),
//             "myCouponPhone"
//           ),

//         meta: {
//           breadcrumb: "我的优惠券移动端"
//         }
//       },
//       {
//         path: "useCouponPhone",
//         name: "useCouponPhone",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "useCouponPhone" */ "./views/phone/useCouponPhone.vue")
//               ),
//             "useCouponPhone"
//           ),

//         meta: {
//           breadcrumb: "使用优惠券移动端"
//         }
//       },
//       {
//         path: "standardCurriculumListPhone",
//         name: "standardCurriculumListPhone",
//         component: standardCurriculumListPhone,

//         // r =>
//         //   require.ensure(
//         //     [],
//         //     () =>
//         //       r(
//         //         require(/* webpackChunkName: "standardCurriculumListPhone" */ "./views/phone/standardCurriculumListPhone.vue")
//         //       ),
//         //     "standardCurriculumListPhone"
//         //   ),
//         meta: {
//           keepalive: true,
//           breadcrumb: "标准版手机端课程页面"
//         }
//       },
//       {
//         path: "phoneNewSchedule",
//         name: "phoneNewSchedule",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "phoneNewSchedule" */ "./views/phone/phoneNewSchedule.vue")
//               ),
//             "phoneNewSchedule"
//           ),
//         meta: {
//           keepalive: true,
//           breadcrumb: "标准版手机端新课表"
//         }
//       },
//       {
//         path: "accessCode",
//         name: "accessCode",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "accessCode" */ "./views/phone/accessCode.vue")
//               ),
//             "accessCode"
//           ),

//         meta: {
//           breadcrumb: "登录后修改密码验证码验证"
//         }
//       },
//       {
//         path: "changePassword",
//         name: "changePassword",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "changePassword" */ "./views/phone/changePassword.vue")
//               ),
//             "changePassword"
//           ),

//         meta: {
//           breadcrumb: "修改密码"
//         }
//       },
//       {
//         path: "retrievePassword",
//         name: "retrievePassword",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "retrievePassword" */ "./views/phone/retrievePassword.vue")
//               ),
//             "retrievePassword"
//           ),

//         meta: {
//           breadcrumb: "登录前修改密码验证码验证"
//         }
//       },
//       {
//         path: "logisticsInfo",
//         name: "logisticsInfo",
//         component: r =>
//           require.ensure(
//             [],
//             () =>
//               r(
//                 require(/* webpackChunkName: "logisticsInfo" */ "./views/phone/logisticsInfo.vue")
//               ),
//             "logisticsInfo"
//           ),

//         meta: {
//           breadcrumb: "物流信息"
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
// const answerRouterMap = [
//   {
//     path: "/answer",
//     redirect: "/answer/answerStatistics",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "answerStatistics",
//         name: "answerStatistics",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/answer/answerStatistics.vue")),
//             "answerStatistics"
//           ),
//         meta: {
//           bg: "dark",
//           noRefresh: true,
//           breadcrumb: "answerStatistics"
//         }
//       },
//       {
//         path: "answerCard",
//         name: "answerCard",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/answer/answerCard.vue")),
//             "answerCard"
//           ),
//         meta: {
//           bg: "dark",
//           noRefresh: true,
//           breadcrumb: "答题卡"
//         }
//       },
//       {
//         path: "answerDetails",
//         name: "answerDetails",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/answer/answerDetails.vue")),
//             "answerDetails"
//           ),
//         meta: {
//           bg: "dark",
//           noRefresh: true,
//           breadcrumb: "answerDetails"
//         }
//       },
//       {
//         path: "partAdegpc",
//         name: "partAdegpc",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/answer/partAdegpc.vue")),
//             "partAdegpc"
//           ),
//         meta: {
//           bg: "dark",
//           noRefresh: true,
//           breadcrumb: "pc的随堂练习"
//         }
//       },
//       {
//         path: "classroomPractice",
//         name: "classroomPractice",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/answer/classroomPractice.vue")),
//             "classroomPractice"
//           ),
//         meta: {
//           bg: "dark",
//           noRefresh: true,
//           breadcrumb: "课堂练习答题卡"
//         }
//       },
//       {
//         path: "myAnswer",
//         name: "myAnswer",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/answer/myAnswer.vue")),
//             "myAnswer"
//           ),
//         meta: {
//           bg: "dark",
//           breadcrumb: "我的随堂联系答题情况"
//         }
//       },
//       {
//         path: "teachStage",
//         name: "teachStage",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/answer/teachStage.vue")),
//             "teachStage"
//           ),
//         meta: {
//           breadcrumb: "讲台"
//         }
//       }
//     ]
//   }
// ];

// const rosterRouterMap = [
//   {
//     path: "/roster",
//     redirect: "/roster/roster",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "roster",
//         name: "roster",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/roster/roster.vue")),
//             "roster"
//           ),
//         meta: {
//           bg: "dark",
//           noRefresh: true,
//           breadcrumb: "roster"
//         }
//       }
//     ]
//   }
// ];

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

// const redeemRouterMap = [
//   {
//     path: "/redeem",
//     redirect: "/redeem/redeemCode",
//     component: mainLayout,
//     hidden: true,
//     children: [
//       {
//         path: "redeemCode",
//         name: "redeemCode",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/redeem/redeemCode.vue")),
//             "redeemCode"
//           ),
//         meta: {}
//       },
//       {
//         path: "redeemCodeLink",
//         name: "redeemCodeLink",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/redeem/redeemCodeLink.vue")),
//             "redeemCodeLink"
//           ),
//         meta: {}
//       },
//       {
//         path: "redeemCodeLinkSuccess",
//         name: "redeemCodeLinkSuccess",
//         component: r =>
//           require.ensure(
//             [],
//             () => r(require("./views/redeem/redeemCodeLinkSuccess.vue")),
//             "redeemCodeLinkSuccess"
//           ),
//         meta: {}
//       }
//     ]
//   }
// ];

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
let router;
export function createRouter() {
  router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "nuxt-link-active",
    fallback: false,
    routes: [
      ...loginMap,
      // ...webRouterMap,
      // ...classRouterMap,
      // ...ipadRouterMap,
      // ...phoneRouterMap,
      // ...currRouterMap,
      // ...ipadFromRouterMap,
      // ...homeRouterMap,
      ...listRouterMap,
      ...phoneMap,
      ...reportMap
      // ...courseRouterMap,
      // ...myRouterMap,
      // ...setRouterMap,
      // ...fileRouterMap,
      // ...signRouterMap
      // ...orderRouterMap,
      // ...answerRouterMap,
      // ...rosterRouterMap,
      // ...coursewareRouterMap,
      // ...noteRouterMap,
      // ...reportRouterMap,
      // ...redeemRouterMap
    ]
  });
  Vue.$router = router;
  return router;
}
