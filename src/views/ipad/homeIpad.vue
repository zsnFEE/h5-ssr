<template>
	<div class="home">
		<!-- <div>
      {{ `${$route.query.token}/${$route.name}` }}
  </div>-->
		<header>
			<div>发现课程</div>
			<img @click="toMy" :src="user.headimgurl" alt />
		</header>
		<body>
			<div class="swipeBox">
				<!-- <van-swipe class="my-swipe" indicator-color="white" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in banner" :key="index" @click="toCourse(item)">
          <img :src="item.src" alt />
        </van-swipe-item>
      </van-swipe> -->
				<img
					:src="item.src"
					class="banner"
					v-for="(item, index) in banner"
					:key="index"
					@click="toCourse(item)"
				/>
			</div>
			<div class="todayContainer">
				<div class="title">
					<span class="recommand">今日推荐</span>
					<div class>
						<!-- <span class="more" @click="toMore">更多</span>
          <img src="../../assets/img/btn_arrow.png" alt />-->
					</div>
				</div>
				<div class="imgContainer">
					<div
						class="imgAndText"
						@click="toCourse(item)"
						v-for="(item, index) in todayClass"
						:key="index"
					>
						<img :src="item.logo" alt />
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
			<div class="specialContainer">
				<div class="title">
					<span class="recommand">专题探索</span>
				</div>
				<div class="imgContainer">
					<div
						class="imgAndText"
						@click="toMore(item)"
						v-for="(item, index) in subjects"
						:key="index"
						:class="{ noMargin: (index + 1) % 4 == 0 }"
					>
						<img :src="item.logo" alt />
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
			<div class="title">
				<span class="recommand">大家都在看</span>
			</div>
			<Card :list="courseList" @toCourse="toCourse"></Card>
		</body>
	</div>
</template>
<script>
import { getAppList } from "../../api/common";
import { Swipe, SwipeItem } from "vant";
import Card from "../../components/cardIpad";

export default {
	components: {
		[SwipeItem.name]: SwipeItem,
		[Swipe.name]: Swipe,
		Card
	},
	data() {
		return {
			a: {},
			todayClass: [],
			user: {},
			banner: [],
			courseList: [],
			subjects: [],
			list: [{ id: "1", name: "新虹艺小孩子大艺术01-剪纸的线条" }]
		};
	},
	mounted() {
		// this.a = document.cookie;
		getAppList().then(res => {
			this.todayClass = res.data.today_class;
			this.subjects = res.data.subjects;
			this.user = res.data.user;
			this.banner = res.data.banners;
			this.courseList = res.data.course;
		});
		// console.log(area);
	},
	methods: {
		toMore(item) {
			if (item) {
				this.$router.push({
					path: "/ipad/secondListIpad",
					query: { subject_id: item.id, token: this.$route.query.token }
				});
			} else {
				this.$router.push({
					path: "/ipad/secondListIpad",
					query: { token: this.$route.query.token }
				});
			}
		},
		toMy() {
			this.$router.push({
				path: "/ipad/myInfoIpad",
				query: { token: this.$route.query.token }
			});
		},
		// toBanner(e) {
		//   this.$router.push({
		//     path: "/ipad/playCourseIpad",
		//     query: { id: e, token: this.$route.query.token }
		//   });
		// },
		toCourse(item) {
			// console.log(item);
			this.$router.push({
				path: "/ipad/playCourseIpad",
				query: { id: item.id || item.class_id, token: this.$route.query.token }
			});
		}
	}
};
</script>
<style lang="less" scoped>
.home {
	background: #f0f2f5;
	min-height: 100%;
	header {
		padding: 28.5px 31px;
		padding-top: 48.5px;
		display: flex;
		justify-content: space-between;
		background: #f0f2f5;
		// padding: 5px 15px;
		// display: flex;
		img {
			height: 30px;
			width: 30px;
			border-radius: 50%;
		}
		div {
			font-size: 21px;
			font-weight: 500;
			font-family: PingFangSC-Medium, PingFang SC;
			color: rgba(0, 0, 0, 1);
			line-height: 29.5px;
		}
	}
	body {
		padding: 0px 31px;
		width: calc(100% - 62px);
		height: 100%;
		.todayContainer {
			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40px 0 10px 0;
				.recommand {
					font-size: 18px;
					font-family: PingFangSC-Medium, PingFang SC;
					color: rgba(0, 0, 0, 1);
					font-weight: 500;
				}
				img {
					width: 5.5px;
					height: 9px;
				}
				.more {
					display: inline-block;
					margin-right: 4px;
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #828a99;
				}
			}
			.imgContainer {
				display: flex;
				// overflow: scroll;
				justify-content: space-between;
				width: 100%;
				.imgAndText {
					display: flex;
					width: 23.64%;
					flex-direction: column;
					img {
						margin-bottom: 10.5px;
						width: 100%;
						object-fit: cover;
					}
					// margin-right: 7.5px;
					span {
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 500;
						line-height: 20px;
						color: rgba(0, 0, 0, 1);
					}
				}
			}
		}
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20px 0 10px 0;
		}
		.specialContainer {
			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40px 0 10px 0;
				.recommand {
					font-size: 18px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					line-height: 25px;
				}
				img {
					width: 5.5px;
					height: 9px;
				}
				.more {
					display: inline-block;
					margin-right: 4px;
					font-size: 12px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #828a99;
				}
			}
			.imgContainer {
				display: flex;
				overflow: scroll;
				.imgAndText {
					width: 31.93%;
					img {
						width: 100%;
					}
					margin-right: 2.13%;
					span {
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 500;
						line-height: 20px;
						color: rgba(0, 0, 0, 1);
					}
					&.noMargin {
						margin-right: 0;
					}
				}
			}
		}
		.swipeBox {
			width: 100%;
			height: 13.98%;
			display: flex;
			// flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.banner {
				// background: red;
				border-radius: 6px;
				width: 48%;
			}
			.my-swipe {
				border-radius: 6px;
				width: 48.96%;
			}
			.van-swipe-item {
				width: 48.96%;
				img {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
}
</style>
