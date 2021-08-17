<template>
	<div class="orderpc">
		<!--上边部分start-->
		<div class="order_top">
			<!-- 左边的图片部分开始 -->
			<div class="left_img">
				<img :src="class_data.cdn + class_data.logo" alt="" />
			</div>
			<!-- 左边的图片部分结束 -->
			<!--右边文字部分开始-->
			<div class="right_font">
				<div class="title">{{ class_data.name }}</div>
				<div class="score">
					<div class="score_num">5.0</div>
					<div class="line"></div>
					<div>start预留的位置</div>
				</div>
				<div class="teacher_flex">
					<div>
						<!--老师部分start-->
						<div class="teacher">
							<span class="teacher_name">{{ class_data.teacher_name }}</span>
							<span>3课时</span>
						</div>
						<!--老师部分end-->
						<div class="start_time">开课时间：{{ class_data.start_time }}</div>
					</div>
					<div class="btn" @click="btn">购买课程 ¥{{ class_data.price }}</div>
				</div>
			</div>
			<!--右边文字部分结束-->
		</div>
		<!--上边部分end-->
		<!--分类导航部分开始-->
		<div class="bar">
			<div
				v-for="(item, index) in navList"
				:key="index"
				class="nav-bar-item"
				:class="currentTab == index ? 'current' : 'item'"
				:id="item.id"
				@click="clickTab(index)"
			>
				{{ item.name }}
			</div>
		</div>
		<div class="bar_line"></div>
		<!--分类导航部分结束-->
		<div
			class="bottom_detail"
			v-if="currentTab == 0"
			v-html="class_data.content"
		></div>
		<Catalog
			v-if="currentTab == 1"
			:chapter_map="chapter_map"
			:cdn="cdn"
		></Catalog>
	</div>
</template>
<script>
import Catalog from "../../components/catalog";
import { getCourse } from "../../api/common";

export default {
	components: {
		Catalog
	},
	data() {
		return {
			navList: [
				{
					name: "详情",
					id: "0"
				},
				{
					name: "目录",
					id: "1"
				}
				// {
				//   name: '评价',
				//   id: '2'
				// }
			],
			currentTab: 0, // 顶部切换导航用到的
			class_data: "",
			chapter_map: "",
			cdn: "",
			goods_id: "",
			need_to_buy: ""
		};
	},
	created() {},
	watch: {},
	mounted() {
		dsBridge.call("hidetabbar", "", function(v) {});

		this.getData();
	},
	methods: {
		/**
		 * 导航切换
		 */
		clickTab(e) {
			if (this.currentTab === 1 * e) return false;
			this.currentTab = 1 * e;
		},
		// 导航点击切换结束
		btn() {
			if (this.need_to_buy === 1) {
				this.$router.push({
					path: "../pc/OrderInformation",
					query: {
						goods_id: this.goods_id,
						token: this.$route.query.token,
						class_data: this.class_data
					}
				});
			} else {
				this.$toast("已购买过");
			}
		},
		getData() {
			getCourse({ class_id: 386 }).then(res => {
				this.class_data = res.data.class;
				this.cdn = res.data.class.cdn;
				this.chapter_map = res.data.chapter_map;
				this.goods_id = res.data.class.goods_id;
				this.need_to_buy = res.data.need_to_buy;
			});
		}
	}
};
</script>

<style lang="less" scoped>
.orderpc {
	padding: 20px 24px 0px;
	// min-width: 918px;
	box-sizing: border-box;
}
.order_top {
	display: flex;
}
.order_top .left_img {
	width: 277px;
	height: 157px;
	background: rgba(67, 88, 151, 1);
	border-radius: 5px;
	margin-right: 21.6px;
}
.left_img img {
	width: 100%;
	height: 100%;
}
.order_top .right_font {
	width: 100%;
}
.order_top .right_font .title {
	height: 38px;
	font-size: 27px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: rgba(0, 0, 0, 1);
	line-height: 38px;
}
.score {
	margin-top: 10.8px;
	margin-bottom: 10.8px;
	display: flex;
}
.score_num {
	width: 47px;
	height: 39px;
	font-size: 32px;
	font-family: Helvetica-Bold, Helvetica;
	font-weight: bold;
	color: rgba(255, 128, 0, 1);
	line-height: 39px;
}
.line {
	width: 1px;
	height: 24px;
	background: rgba(216, 216, 216, 1);
	margin: 6.75px 20.41px 8.1px 21.6px;
}
.teacher_flex {
	display: flex;
	justify-content: space-between;
}
.teacher {
	height: 23px;
	font-size: 16px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(130, 138, 153, 1);
	line-height: 23px;
	margin-bottom: 6.4px;
}
.teacher .teacher_name {
	margin-right: 21.6px;
}

.start_time {
	height: 23px;
	font-size: 16px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(130, 138, 153, 1);
	line-height: 23px;
	display: flex;
}
.btn {
	//  width:167px;
	// height:35px;
	background: rgba(255, 128, 0, 1);
	border-radius: 5px;
	margin-top: 10.8px;
	font-size: 16px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: rgba(255, 255, 255, 1);
	line-height: 35px;
	text-align: center;
	padding: 7px 16px 5px 18px;
	box-sizing: border-box;
	cursor: pointer;
}
/*分类导航部分开始*/
.bar {
	display: flex;
	margin-top: 37.8px;
}
/* 分类导航默认样式开始 */
.bar .nav-bar-item {
	position: relative;
	word-break: keep-all;
	margin-right: 64.8px;
	// width:39px;
	height: 27px;
	font-size: 19px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	line-height: 27px;
	cursor: pointer;
}
.item {
	color: rgba(130, 138, 153, 1);
}
.current {
	color: rgba(255, 128, 0, 1);
}
.bar .current.nav-bar-item::after {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	top: 34px;
	height: 3px;
	width: 38px;
	background: linear-gradient(90deg, #ff4936 0%, #ff6e3c 100%);
	box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(255, 89, 0, 0.25);
	border-radius: 24rpx;
}
.bar_line {
	// width:853px;
	height: 1px;
	background: rgba(242, 245, 250, 1);
	margin-top: 9.46px;
	margin-bottom: 37.8px;
}
//  分类导航选中的样式end
.bottom_detail {
	/deep/ img {
		width: 100% !important;
		height: auto;
	}
}
</style>
