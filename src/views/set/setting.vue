<template>
	<div class="setting">
		<header>
			<img
				@click="goback"
				class="goback"
				src="../../assets/img/ic_back.png"
				alt=""
			/>
			<span>设置</span>
			<span class="ignore"></span>
		</header>
		<body>
			<div class="messageControl">
				<span>消息推送</span>
				<van-switch
					size="20px"
					v-model="checked"
					active-color="#ff6401"
					inactive-color="#cbd3e0"
				/>
			</div>
			<div class="messageControl" @click="toPrivacy">
				<span>用户隐私协议</span>
				<img src="../../assets/img/btn_arrow_right.png" alt="" />
			</div>
			<div class="messageControl" @click="toPolicy">
				<span>用户服务条款</span>
				<img src="../../assets/img/btn_arrow_right.png" alt="" />
			</div>
			<div class="messageControl noBorder" @click="quit">
				<span>退出登录</span>
				<img src="../../assets/img/btn_arrow_right.png" alt="" />
			</div>
		</body>
	</div>
</template>
<script>
import { Switch, Collapse, CollapseItem } from "vant";

export default {
	components: {
		[Switch.name]: Switch,
		[Collapse.name]: Collapse,
		[CollapseItem.name]: CollapseItem
	},
	data() {
		return {
			activeName: "1",
			checked: false
		};
	},
	methods: {
		quit() {
			let model = {
				type: "logout" //
			};
			dsBridge.call("RoomSyn", JSON.stringify(model));
		},
		toPrivacy() {
			this.$router.push({
				path: "/file/privacy",
				query: { token: this.$route.query.token }
			});
		},
		toPolicy() {
			this.$router.push({
				path: "/file/policy",
				query: { token: this.$route.query.token }
			});
		},
		goback() {
			this.$router.push({
				path: "/my/myInfo",
				query: { token: this.$route.query.token }
			});
		}
	}
};
</script>
<style lang="less" scoped>
.setting {
	background: #f2f5fa;
	height: 100vh;
	header {
		background: white;
		padding: 5px 15px;
		margin-bottom: 10px;
		// width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.goback {
			width: 20px;
			height: 20px;
		}
		span {
			font-size: 21px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
		}
		img {
			width: 24px;
		}
		.ignore {
			display: inline-block;
			width: 20px;
		}
	}
	body {
		background: white;
		.messageControl {
			color: #333333;
			font-size: 14px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0px 10px;
			padding: 13px 0px;
			background: white;
			border-bottom: 0.5px solid rgba(218, 227, 242, 1);
			img {
				width: 7px;
				height: 12px;
			}
			span {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}
		.noBorder {
			border: 0;
		}
	}
	/deep/ .van-cell__right-icon {
		color: #000000;
	}
}
</style>
