<template>
	<div class="myInfo">
		<header>
			<img
				@click="toBack"
				class="goback"
				src="../../assets/img/ic_back.png"
				alt=""
			/>
			<div class="setBox" @click="toSet">
				<img src="../../assets/img/ic_setting.png" alt="" />
				<div>设置</div>
			</div>
		</header>
		<body>
			<div class="middle">
				<div class="imgContainer">
					<img :src="user.headimgurl" alt="" />
					<span class="nickname">{{ user.nickname }}</span>
				</div>
				<div>
					<span class="studyTime">{{ user.study_time }}min</span>
					<div class="studentAll">累计学习</div>
				</div>
			</div>
			<div class="bottomContainer">
				<span class="relateTitle">观看记录</span>
				<Card :list="history" @toCourse="toCourse"></Card>
			</div>
		</body>
	</div>
</template>
<script>
import Card from "../../components/cardIpad";
import { getMyInfo, studyLog } from "../../api/common";
export default {
	components: {
		Card
	},
	data() {
		return {
			user: {},
			history: []
		};
	},
	mounted() {
		getMyInfo().then(res => {
			this.user = res.data.user;
			this.history = res.data.history;
		});
	},
	methods: {
		toBack() {
			this.$router.push({
				path: "/ipad/homeIpad",
				query: { token: this.$route.query.token }
			});
		},
		toSet() {
			this.$router.push({
				path: "/ipad/settingIpad",
				query: { token: this.$route.query.token }
			});
		},
		toCourse(item) {
			this.$router.push({
				path: "/ipad/playCourseIpad",
				query: { id: item.id, token: this.$route.query.token }
			});
		}
	}
};
</script>
<style lang="less" scoped>
.myInfo {
	width: 100%;
	height: 100%;
	background-color: #f0f2f5;
	header {
		padding: 51px 32px 10px 32px;
		// width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #f0f2f5;
		.goback {
			width: 20px;
			height: 20px;
		}
		.setBox {
			display: flex;
			// flex-direction: row;
			div {
				margin-left: 6px;
				font-size: 18px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				line-height: 25px;
			}
			img {
				height: 24px;
				width: 24px;
			}
		}
	}
	body {
		padding: 0 31px;
		.middle {
			padding: 22.5px 0 20px 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.studyTime {
				font-size: 18px;
				font-weight: 500;
			}
			.imgContainer {
				display: flex;
				margin-right: 5px;

				align-items: center;
				.nickname {
					font-size: 18px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
				}
			}
			.studentAll {
				font-size: 12px;
				color: white;
				width: 60px;
				height: 20px;
				line-height: 20px;
				text-align: center;
				background: linear-gradient(
					129deg,
					rgba(255, 115, 0, 1) 0%,
					rgba(255, 85, 0, 1) 100%
				);
			}
			img {
				height: 50px;
				width: 50px;
				border-radius: 50%;
				margin-right: 15px;
			}
		}
		.bottomContainer {
			padding: 20px 0;
			.relateTitle {
				display: block;
				font-size: 18px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				line-height: 25px;
				margin-bottom: 10px;
			}
		}
	}
}
</style>
