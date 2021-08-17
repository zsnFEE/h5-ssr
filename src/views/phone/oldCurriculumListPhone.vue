<template>
	<div class="temp">
		<header>
			<div class="titleText">我的课程</div>
			<div id="person-wrap">
				<div v-for="(items, index) in date" :key="index" class="dayBox">
					<div class="weekText">{{ items.week }}</div>
					<div class="dayText" @click="setnum(items)" :id="course(items.id)">
						{{ items.day }}
					</div>
					<div
						class="sign"
						:class="items.signFlag ? 'active' : ''"
						v-show="items.showFlag"
					></div>
				</div>
			</div>
		</header>
		<body>
			<div class="notLiveBroadcast" v-show="!classFlag">
				{{ `${today ? "今日暂无课程安排" : "此日暂无课程安排"}` }}
			</div>
			<div
				class="liveBroadcast"
				v-for="(item, index) in temp"
				:key="index"
				v-show="classFlag"
			>
				<div class="liveTop">
					<img
						:src="`${item.class.logo}?x-oss-process=image/resize,w_120`"
						class="imageDv"
					/>
					<div class="liveTitle">
						<div class="liveTitleName">{{ item.class.name }}</div>
						<div class="liveTitleTeacher">
							{{ `主讲老师:${item.teacher_name}` }}
						</div>
						<div class="liveTitleTeacher">{{ `班级:${item.clazz_name}` }}</div>
					</div>
				</div>
				<div class="liveBottom">
					<div class="bottomLeft">
						<img
							src="../../assets/img/ic_live.png"
							class="liveIcon"
							v-show="item.clazz_status == 3"
						/>
						<span class="liveText">{{ item.lesson_name }}</span>
					</div>
					<div class="bottomRight">
						<div
							v-show="item.clazz_status == 1 && !item.startClass_flag"
							class="liveRemind"
						>
							已结束
						</div>
						<!-- v-show="item.startClass_flag" -->

						<button class="liveButton" @click="start(item)">
							开始上课<img
								src="../../assets/img/ic_get_in.png"
								class="ButtonIcon"
							/>
						</button>
						<span
							class="liveRemind"
							v-show="item.clazz_status == 2 && !item.startClass_flag"
							>{{ item.start }} 开始</span
						>
					</div>
				</div>
			</div>
		</body>
	</div>
</template>

<script>
import { getMyClass, getMonth } from "../../api/common";

export default {
	data() {
		return {
			temp: [],
			flag: true,
			date: [],
			dayflag: 15,
			classFlag: true,
			today: true
		};
	},
	watch: {},
	created() {
		getMyClass().then(res => {
			if (res.data.length > 0) {
				this.temp = res.data;
				for (let i = 0; i < this.temp.length; i++) {
					let newTime = Math.round(new Date() / 1000);
					if (
						(this.temp[i].start_time > newTime &&
							this.temp[i].start_time <= newTime + 900) ||
						(this.temp[i].end_time > newTime &&
							this.temp[i].start_time < newTime) ||
						this.temp[i].clazz_status == 3
					) {
						this.$set(this.temp[i], "startClass_flag", true);
					} else {
						this.$set(this.temp[i], "startClass_flag", false);
					}
				}
				this.classFlag = true;
			} else {
				this.classFlag = false;
			}
		});

		var xdata = [];

		var xweek = ["一", "二", "三", "四", "五", "六", "日"];
		var d = new Date();
		var newweek = d.getDay() - 1;
		for (var i = -15; i < 16; i++) {
			var signFlag = "";
			var showFlag = false;
			var f = (newweek - i) % 7;
			var xday = "";
			if (f < 0) {
				f = f + 7;
			}
			if (this.getDay(-i).substring(8) === "01") {
				xday =
					this.getDay(-i)
						.substr(5, 2)
						.split("0")
						.join("") + "月";
			} else {
				if (this.getDay(-i).substring(8) < 10) {
					xday = this.getDay(-i)
						.substring(8)
						.split("0")
						.join("");
				} else {
					xday = this.getDay(-i).substring(8);
				}
			}
			if (i == 0) {
				xday = "今";
			}
			if (i < 1) {
				signFlag = false;
			} else {
				signFlag = true;
			}
			xdata[15 - i] = {
				id: 15 - i,
				day: xday,
				week: xweek[f % 7],
				data: this.getDay(-i),
				signFlag: signFlag,
				showFlag: showFlag
			};
		}

		this.date = xdata;
	},
	mounted() {
		window.setInterval(() => {
			for (var i = 0; i < this.temp.length; i++) {
				this.temp[i].start_time;
				let newTime = Math.round(new Date() / 1000);
				if (
					(this.temp[i].start_time > newTime &&
						this.temp[i].start_time <= newTime + 900) ||
					(this.temp[i].end_time > newTime &&
						this.temp[i].start_time < newTime) ||
					this.temp[i].clazz_status == 3
				) {
					this.temp[i].startClass_flag = true;
				} else {
					this.temp[i].startClass_flag = false;
				}
			}
		}, 1000);
		getMonth().then(res => {
			this.monthData = res.data;
			for (let i = 0; i < this.date.length; i++) {
				for (let j = 0; j < this.monthData.length; j++) {
					if (this.date[i].data == this.monthData[j]) {
						this.date[i].showFlag = true;
					}
				}
			}
		});
		document.getElementById("person-wrap").scrollLeft = 580;
		document.getElementById("dayId" + this.dayflag).style.background =
			"#FFD400";
	},
	methods: {
		start(item) {
			let model = {
				code: localStorage.code,
				data: {
					type: "online",
					roleId: item.role_id,
					classId: item.course_id,
					lessonId: item.lesson_id,
					lessonName: item.lesson_name,
					clazzId: item.clazz_id,
					videoUrl: ""
				}
			};
			dsBridge.call("RoomSyn", JSON.stringify(model));
		},
		stamp(e) {
			if (e.start_time < Math.round(new Date() / 1000)) {
				return 0;
			} else if (e.start_time - Math.round(new Date() / 1000) < 900) {
				return 1;
			} else {
				return 2;
			}
		},
		course(index) {
			return "dayId" + index;
		},
		setnum(e) {
			document.getElementById(this.course(this.dayflag)).style.background =
				"#fff";
			document.getElementById(this.course(e.id)).style.background = "#FFD400";

			this.dayflag = e.id;
			if (e.day == "今") {
				this.today = true;
			} else {
				this.today = false;
			}
			this.classFlag = e.showFlag;
			localStorage.setItem("data", e.data);
			if (this.classFlag) {
				getMyClass({ date: e.data }).then(res => {
					this.temp = res.data;
				});
			}
		},
		getDay(day) {
			var today = new Date();
			var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
			today.setTime(targetday_milliseconds);
			var tYear = today.getFullYear();
			var tMonth = today.getMonth();
			var tDate = today.getDate();
			tMonth = this.doHandleMonth(tMonth + 1);
			tDate = this.doHandleMonth(tDate);
			return tYear + "-" + tMonth + "-" + tDate;
		},
		doHandleMonth(month) {
			var m = month;
			if (month.toString().length === 1) {
				m = "0" + month;
			}
			return m;
		}
	}
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
	display: none;
}
.temp {
	min-height: 100%;
	width: 100%;
	background: rgba(242, 245, 250, 1);
	header {
		position: fixed;
		width: calc(100% - 30px);
		background: rgba(255, 255, 255, 1);
		padding: 4.5px 15px 18px 15px;
		.titleText {
			font-size: 21px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(0, 0, 0, 1);
			line-height: 29.5px;
			margin-bottom: 20px;
		}
		#person-wrap {
			width: 100%;
			overflow-y: scroll;
			display: flex;
			flex-direction: row;
			.dayBox {
				display: flex;
				flex-direction: column;
				align-items: center;
				.weekText {
					font-size: 12px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(184, 192, 205, 1);
					line-height: 16.5px;
					margin: 0 20px 7px 20px;
				}
				.dayText {
					width: 51.5px;
					text-align: center;
					height: 30px;
					line-height: 30px;
					border-radius: 30px;
					font-size: 16px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(42, 46, 51, 1);
				}
				.sign {
					width: 5px;
					height: 5px;
					border-radius: 2.5px;
					background: linear-gradient(
						131deg,
						rgba(255, 213, 0, 1) 0%,
						rgba(255, 191, 0, 1) 100%
					);
				}
				.sign.active {
					background: rgba(184, 192, 205, 1);
				}
			}
		}
	}
	body {
		margin: 0px;
		padding: 143px 15px 3px 15px;
		.notLiveBroadcast {
			width: 100%;
			text-align: center;
			margin-top: 75px;
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(184, 192, 205, 1);
			line-height: 20px;
		}
		.liveBroadcast {
			width: calc(100% - 20px);
			background: rgba(255, 255, 255, 1);
			border-radius: 4px;
			padding: 10px;
			margin-bottom: 12px;
			.liveTop {
				display: flex;
				.imageDv {
					width: 120px;
					height: 68px;
					border-radius: 4px;
					object-fit: cover;
				}
				.liveTitle {
					margin-left: 8px;
					.liveTitleName {
						font-size: 14px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						line-height: 20px;
						display: -webkit-box;
						-webkit-box-orient: vertical;
					}
					.liveTitleTeacher {
						margin-top: 4px;
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(130, 138, 153, 1);
						line-height: 16.5px;
					}
				}
			}
			.liveBottom {
				display: flex;
				flex-direction: row;
				margin-top: 16.5px;
				justify-content: space-between;
				align-items: center;
				.bottomLeft {
					.liveIcon {
						width: 11px;
						height: 10px;
						margin-right: 8px;
					}
					.liveText {
						font-size: 14px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(130, 138, 153, 1);
						line-height: 20px;
					}
				}
				.bottomRight {
					.liveButton {
						width: 95px;
						height: 28px;
						background: linear-gradient(
							131deg,
							rgba(255, 213, 0, 1) 0%,
							rgba(255, 191, 0, 1) 100%
						);
						box-shadow: 0px -2px 0px 0px rgba(255, 255, 255, 0.15);
						border-radius: 4px;
						border: 0px;
						font-size: 13px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(41, 45, 51, 1);
						line-height: 28px;
						.ButtonIcon {
							height: 12px;
							width: 12px;
							margin-left: 8px;
						}
					}
					.liveRemind {
						font-size: 14px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(130, 138, 153, 1);
						line-height: 20px;
					}
				}
			}
		}
	}
}
</style>
