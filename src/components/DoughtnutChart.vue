<template>
  <div v-if="percentage !== null">
    <section>
      <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
        <circle stroke="#195267" stroke-width="7" fill="none" cx="80" cy="80" r="60"/>
        <circle :class="'circle circle-anim-' + anim"
          stroke="#79bad2"
          stroke-width="7.3"
          :stroke-dasharray="(3.8 * percentage) + ' 380'"
          stroke-linecap="round" fill="none"
          cx="80" cy="80" r="60"/>
      </svg>
    </section>
  </div>
</template>

<script>

export default {
  name: 'doughtnut-chart',
  props: ['value'],
  data() {
    return {
      percentage: null,
      anim: 1,
    }
  },
  created() {
    this.calculatePercentage(this.value)
  },
  methods: {
    calculatePercentage: function(value) {
      if(!this.value) return
      let newPercentage = (value * 100 / 200).toFixed(1)
      if (newPercentage !== this.percentage) {
        this.percentage = newPercentage
        if (this.anim === 1) {
          this.anim = 2
        } else {
          this.anim = 1
        }
      }
    }
  },
  watch: {
    value: function(value) {
      this.calculatePercentage(value)
    }
  }
}
</script>

<style scoped lang="scss">
section {
  display: inline-block;
  height: 80px;
  position: relative;
  overflow: hidden;
}
.circle {
  transform: rotate(-180deg);
  transform-origin: center;
}

.info {
  opacity: 1
}

@for $i from 1 through 2 {
  .circle-anim-#{$i} {
    animation: chart-fill- + i 1s reverse
  }
  .info-anim-#{$i} {
    animation: chart-appear- + i 1s forwards
  }
  @keyframes chart-fill-#{$i} {
    to {
      stroke-dasharray: 0 380;
    }
  }
  @keyframes chart-appear-#{$i} {
    to {
      opacity: 1;
    }
  }
}
</style>
