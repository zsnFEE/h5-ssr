export { default as BroadcastSchedule } from '../..\\src\\components\\broadcastSchedule.vue'
export { default as Card } from '../..\\src\\components\\card.vue'
export { default as CardDemoPhone } from '../..\\src\\components\\cardDemoPhone.vue'
export { default as CardIpad } from '../..\\src\\components\\cardIpad.vue'
export { default as CardOrder } from '../..\\src\\components\\cardOrder.vue'
export { default as CardPhone } from '../..\\src\\components\\cardPhone.vue'
export { default as CardPrice } from '../..\\src\\components\\cardPrice.vue'
export { default as Catalog } from '../..\\src\\components\\catalog.vue'
export { default as ClassButton } from '../..\\src\\components\\classButton.vue'
export { default as ClassTab } from '../..\\src\\components\\classTab.vue'
export { default as CommetDialog } from '../..\\src\\components\\commetDialog.vue'
export { default as Coupon } from '../..\\src\\components\\coupon.vue'
export { default as DateTimeTab } from '../..\\src\\components\\dateTimeTab.vue'
export { default as Details } from '../..\\src\\components\\details.vue'
export { default as Header } from '../..\\src\\components\\header.vue'
export { default as Headerweb } from '../..\\src\\components\\headerweb.vue'
export { default as Homework } from '../..\\src\\components\\homework.vue'
export { default as Institutions } from '../..\\src\\components\\Institutions.vue'
export { default as Logistics } from '../..\\src\\components\\logistics.vue'
export { default as Navigation } from '../..\\src\\components\\navigation.vue'
export { default as NewCard } from '../..\\src\\components\\newCard.vue'
export { default as OrderDetail } from '../..\\src\\components\\orderDetail.vue'
export { default as Personage } from '../..\\src\\components\\personage.vue'
export { default as RecordedSchedule } from '../..\\src\\components\\recordedSchedule.vue'
export { default as ScheduleDate } from '../..\\src\\components\\scheduleDate.vue'
export { default as StandardMyInfoPhone } from '../..\\src\\components\\standardMyInfoPhone.vue'
export { default as Statistics } from '../..\\src\\components\\statistics.vue'
export { default as StudentNotes } from '../..\\src\\components\\studentNotes.vue'
export { default as TeacherNotes } from '../..\\src\\components\\teacherNotes.vue'
export { default as TestTable } from '../..\\src\\components\\testTable.vue'
export { default as TimeBar } from '../..\\src\\components\\timeBar.vue'
export { default as TodayCard } from '../..\\src\\components\\todayCard.vue'
export { default as VideoClassCard } from '../..\\src\\components\\videoClassCard.vue'
export { default as VideoPackage } from '../..\\src\\components\\videoPackage.vue'
export { default as Toast } from '../..\\src\\components\\toast\\index.js'
export { default as PcList } from '../..\\src\\components\\pc\\list.vue'
export { default as PcScheduleDate } from '../..\\src\\components\\pc\\pcScheduleDate.vue'
export { default as ReportStudentPim } from '../..\\src\\components\\report\\studentPim.vue'
export { default as ReportTeacherComments } from '../..\\src\\components\\report\\teacherComments.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
