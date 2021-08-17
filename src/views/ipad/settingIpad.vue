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
					size="18px"
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
			<div class="messageControl" @click="quit">
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
				path: "/ipad/privacyIpad",
				query: { token: this.$route.query.token }
			});
		},
		toPolicy() {
			this.$router.push({
				path: "/ipad/policyIpad",
				query: { token: this.$route.query.token }
			});
		},
		goback() {
			this.$router.push({
				path: "/ipad/myInfoIpad",
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
		padding: 50px 32px 16px 32px;
		background: #f2f5fa;
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
			color: rgba(42, 46, 51, 1);
			line-height: 29.5px;
		}
		img {
			height: 24px;
			width: 24px;
		}
		.ignore {
			display: inline-block;
			width: 20px;
		}
	}
	body {
		.messageControl {
			height: 50px;
			color: #333333;
			font-size: 14px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0px 32px;
			border-bottom: 0.5px solid rgba(218, 227, 242, 1);
			img {
				width: 7px;
				height: 12px;
			}
			span {
				font-size: 14px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 20px;
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
