<template>
	<div class="My_order">
		<div class="myorder">我的订单</div>
		<!--订单详情部分开始-->
		<div class="list">
			<div
				class="detail_order"
				v-for="(order, index) in order_data"
				:key="index"
			>
				<div class="order_top">
					<div class="order_num">订单号：{{ order.gateway_order_id }}</div>
					<div class="detail_font" @click="details(order.order_id)">
						<div>订单详情</div>
						<img src="../../assets/img/btn_arrow.png" />
					</div>
				</div>
				<div class="detail_bottom">
					<div class="bottom_font">{{ order.goods_name }}</div>
					<div class="bottom_right">
						<p class="price">¥{{ order.order_price }}</p>
						<p class="time">{{ order.order_dt }}</p>
						<p class="success">交易完成</p>
					</div>
				</div>
			</div>
		</div>

		<!--订单详情部分结束-->
	</div>
</template>
<script>
import { getMyOrder } from "../../api/common";

export default {
	data() {
		return {
			order_data: ""
		};
	},
	created() {
		getMyOrder().then(res => {
			this.order_data = res.data;
		});
	},
	watch: {},
	mounted() {},
	methods: {
		details(id) {
			this.$router.push({
				path: "../pc/Orderdetails",
				query: { order_id: id, token: this.$route.query.token }
			});
		}
	}
};
</script>

<style lang="less" scoped>
.My_order {
	width: 100%;
	box-sizing: border-box;
	padding-top: 27px;
	padding-left: 32px;
	padding-right: 32px;
	.myorder {
		height: 27px;
		font-size: 19px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
		line-height: 27px;
	}
	.list {
		overflow: auto;
		height: 676px;
	}
	.list::-webkit-scrollbar {
		display: none;
	}
	.detail_order {
		width: 100%;
		// height: 81px;
		box-sizing: border-box;
		border: 1px solid rgba(242, 245, 250, 1);
		margin-top: 27px;
		.order_top {
			width: 100%;
			height: 32px;
			background: rgba(242, 245, 250, 1);
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 4px 16px 0 16px;
			.order_num {
				height: 22px;
				font-size: 15px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(130, 138, 153, 1);
				line-height: 22px;
			}
			.detail_font {
				display: flex;
				cursor: pointer;
				div {
					height: 22px;
					font-size: 15px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(130, 138, 153, 1);
					line-height: 22px;
				}
				img {
					margin-left: 6px;
					margin-top: 5px;
					width: 8px;
					height: 14px;
				}
			}
		}
		.detail_bottom {
			width: 100%;
			height: 49px;
			box-sizing: border-box;
			padding: 12px 16px;
			display: flex;
			justify-content: space-between;
			.bottom_font {
				height: 24px;
				font-size: 18px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(0, 0, 0, 1);
				line-height: 24px;
			}
			.bottom_right {
				// width: 40%;
				display: flex;
				justify-content: space-around;
				p {
					margin: 0;
				}
				.price {
					height: 23px;
					font-size: 16px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(130, 138, 153, 1);
					line-height: 23px;
					margin-right: 41px;
				}
				.time {
					height: 23px;
					font-size: 16px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(130, 138, 153, 1);
					line-height: 23px;
					margin-right: 41px;
				}
				.success {
					margin-right: 8px;
					height: 23px;
					font-size: 16px;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: rgba(36, 173, 147, 1);
					line-height: 23px;
				}
			}
		}
	}
}
</style>
