<template>
  <div class="label" v-if="initialized && !error">
    <div class="container">
      <doughnut :value="percent" style="position: absolute; top: -25px; width: 100%; z-index: -1"></doughnut>
      <img :src="weatherIcon" alt="" style="z-index: 1; height: 100px;">
      <div class="sun">
        <span>{{sunrise}}</span>
        <span>{{sunset}}</span>
      </div>
      <div class="desc-container">
        {{weatherDescription}}
        <span class="temp">{{weatherTemp}}</span>
      </div>
      
      <div class="week-container">
        <div v-for="day in week" :key="day.dt" class="weekDay">
          {{formatDate(day.dt)}}
          <img :src="getIcon(day.weather[0].icon)"/>
        </div>
      </div>
      <div class="author">
        Météo
      </div>

    </div>

  </div>
  <div class="label" v-else-if="error">
    {{error}}
    <div class="author">
      Météo
    </div>
  </div>
  <div class="label" v-else>
    Donnez l'accés à votre position pour que je puisse vous donnez la météo
    <div class="author">
      Météo
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as locale from 'dayjs/locale/fr'

import dayjs from 'dayjs';
import DoughtnutChartVue from '../DoughtnutChart.vue';
dayjs.locale(locale)
export default {
  components: {
    doughnut: DoughtnutChartVue
  },
  data() {
    return {
      initialized: false,
      geo: {
        lat: 0,
        lon: 0,
      },
      error: null,
      weather: null
    }
  },
  computed: {
    percent() {
      var dt = new Date();
      var secs = dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
      return secs * 100 / 86400
    },
    week() {
      if(this.weather) {
        const daily = this.weather.daily
        return daily
      }
      return []
    },
    weatherIcon() {
      if(this.weather) {
        return this.getIcon(this.weather.current.weather[0].icon)
      }
      return ''
    },
    weatherDescription() {
      if(this.weather) {
        const desc = this.weather.current.weather[0].description
        return desc.charAt(0).toUpperCase() + desc.slice(1)
      }
      return ''
    },
    weatherTemp() {
      if(this.weather) {
        const temp = this.weather.current.temp
        return temp.toFixed() + '°C'
      }
      return ''
    },
    sunrise() {
      if(this.weather) {
        return dayjs.unix(this.weather.current.sunrise).format('HH:mm').replace(':', 'h')
      }
      return ''
    },
    sunset() {
      if(this.weather) {
        return dayjs.unix(this.weather.current.sunset).format('HH:mm').replace(':', 'h')
      }
      return ''
    }
  },
  mounted() {
    this.getLocation()
  },
  methods: {
    getIcon(icon) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`
    },
    formatDate(unix) {
      const dayName = dayjs.unix(unix).locale('fr').format('dddd')
      return dayName.charAt(0).toUpperCase() + dayName.slice(1)
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((geo) => {
          this.geo.lat = geo.coords.latitude
          this.geo.lon = geo.coords.longitude
          this.getWeather()
          this.initialized = true
        }, function() {
          this.initialized = false
          this.error = "Donnez l'accés à votre position pour que je puisse vous donnez la météo"
        });
      } else {
        this.error = "Je ne peux pas te donner la météo depuis ton appareil"
        this.initialized = false;
      }
    },
    async getWeather() {
      if(!process.env.VUE_APP_WEATHER_APIKEY) {
        this.error = "L'application n'est pas encore configuré pour donner la météo, réessayez plus tard."
        return
      }
      const {data: weather} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.geo.lat}&lon=${this.geo.lon}&appid=${process.env.VUE_APP_WEATHER_APIKEY}&lang=fr&units=metric`)
        .catch(() => {
          this.error = "Je n'arrives pas à accéder à la météo pour le moment, réessayez plus tard."
          return 
        })
      if(weather) {
        this.weather = weather
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.week-container {
  width: 80vw;
  height: 200px;
  display: flex;
  overflow: auto;
  margin-top: 40px;
  justify-content: center;
  .weekDay {
    font-size: 0.4em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      height: 100px;
      width: 100px;
    }
  }
}

.container {
  position: relative;
}
.desc-container {
  margin-top: 40px
}
.sun {
  font-size: 0.6em;
  margin-top: -70px;
  &>span {
    margin: 0 50px
  }
}
.temp {
  font-size: 0.6em;
}
.author {
  text-align: end;
  justify-self: flex-end;
  align-self: flex-end;
  font-size: 0.5em;
  font-style: italic;
  text-decoration: underline;
}
@media (max-width: 800px) {
  .sun {
    margin-top: -60px;

  }
}
</style>