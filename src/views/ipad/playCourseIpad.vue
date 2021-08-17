<template>
	<div class="playCourse">
		<header>
			<div class="playContain">
				<div
					class="backImg"
					:style="{
						background:
							'url(' + courseInfo.logo + ')' + 'no-repeat center center / cover'
					}"
				></div>
				<img @click="play" src="../../assets/img/ic_play.png" alt />
			</div>

			<div class="infoContain">
				<div class="title">
					<span>{{ courseInfo.name }}</span>
				</div>
				<div class="info">
					<span class="teacher">浏览次数：{{ courseInfo.view_count }}</span>
					<span>课时数量：1</span>
				</div>
			</div>
			<img
				class="backButton"
				src="../../assets/img/ic_back_white.png"
				alt
				@click="goBack"
			/>
		</header>
		<body>
			<div>
				<!-- <span class="relateTitle">相关课程</span> -->
				<Card :list="lessonList" @toCourse="toCourse"></Card>
			</div>
		</body>
	</div>
</template>
<script>
import Card from "../../components/cardIpad";
import { getCourseInfo } from "../../api/common";
export default {
	data() {
		return {
			lessonList: [],
			courseInfo: {}
		};
	},
	components: { Card },
	mounted() {
		getCourseInfo({ id: this.$route.query.id }).then(res => {
			this.lessonList = res.data.list;
			this.courseInfo = res.data.course_info;
		});
	},
	methods: {
		play() {
			let model = {
				type: "video", //online/video
				classId: this.courseInfo.id,
				lessonId: "",
				lessonName: "",
				videoUrl: this.courseInfo.resource_url
			};
			// console.log(model, JSON.stringify(model));
			dsBridge.call("RoomSyn", JSON.stringify(model));
		},
		goBack() {
			this.$router.go(-1);
		},
		toCourse(item) {
			if (item.id == this.$route.query.id) {
				return;
			}
			this.$router.push({
				path: "/ipad/playCourseIpad",
				query: { id: item.id, token: this.$route.query.token }
			});
			// this.$router.go(0);
		}
	}
};
</script>
<style lang="less" scoped>
.playCourse {
	// background: rgba(242, 245, 250, 1);
	background: #f0f2f5;
	min-height: 100%;
	header {
		width: 100%;
		background: #f0f2f5;
		.playContain {
			position: relative;
			// height: 576px;
			img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 66px;
			}
		}
		.backImg {
			width: 100%;
			height: 40vh;
		}
		.infoContain {
			padding: 10px 31px;
			display: flex;
			flex-direction: column;
			.title {
				font-size: 18px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
				margin-bottom: 6px;
				line-height: 25px;
			}
			.info {
				font-size: 14px;
				font-weight: 400;
				color: rgba(130, 138, 153, 1);
				line-height: 20px;
				.teacher {
					display: inline-block;
					margin-right: 20px;
				}
			}
		}
		.backButton {
			position: absolute;
			top: 55.5px;
			left: 32px;
			height: 30px;
			width: 30px;
		}
	}
	body {
		background: #f0f2f5;
		.relateTitle {
			display: inline-block;
			margin-top: 20px;
		}
		padding: 10px 31px;
	}
}
</style>
