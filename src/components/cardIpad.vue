<template>
	<div class="card">
		<div
			v-for="(item, index) in list"
			:key="index"
			class="cardContainer"
			@click="tocourse(item)"
			:class="{ noMargin: (index + 1) % 4 == 0 }"
		>
			<div class="imgContainer">
				<img class="classImg" :src="`${item.logo}`" alt />
				<img
					class="hot"
					v-show="item.is_hot"
					src="../assets/img/icon_hot.png"
					alt
				/>
			</div>
			<div class="infoContainer">
				<span class="className">{{ item.name }}</span>
				<div class="teacherInfo">
					<!-- <span>{{ item.teacher_name }}</span> -->
					<span>{{ `${item.view_count} 浏览` }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "card",
	props: ["list"],
	data() {
		return {};
	},
	methods: {
		tocourse(item) {
			this.$emit("toCourse", item);
		}
	}
};
</script>
<style lang="less" scoped>
.card {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	.cardContainer {
		display: flex;
		padding: 0px 0 10px 0px;
		flex-direction: column;
		width: 23%;
		margin-right: 2.5%;
		&.noMargin {
			margin-right: 0;
		}
		.imgContainer {
			display: flex;
			position: relative;
			width: 100%;
			align-items: center;
			.hot {
				position: absolute;
				width: 60px;
				height: 20px;
				bottom: 0;
				left: 0;
			}
			.classImg {
				width: 100% !important;
				/* position: absolute; */
				max-width: 100%;
				min-width: 100%;
				// width: 100%;
			}
		}

		.infoContainer {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-top: 10px;
			.className {
				font-size: 14px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 20px;
			}
			.teacherInfo {
				padding-top: 5px;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(130, 138, 153, 1);
				line-height: 16.5px;
				display: flex;
				justify-content: space-between;
			}
		}
	}
}
</style>
