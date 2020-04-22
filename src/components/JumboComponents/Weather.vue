<template>
  <div class="label" v-if="initialized && !error">
    <div class="container">
      <doughnut :value="30" style="position: absolute; top: -25px; width: 100%; z-index: -1"></doughnut>
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
        }, function(err) {
          console.error(err)
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
        console.error('Openweather is not configured')
        this.error = "L'application n'est pas encore configuré pour donner la météo, réessayez plus tard."
        return
      }
      // const {data: weather} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.geo.lat}&lon=${this.geo.lon}&appid=${process.env.VUE_APP_WEATHER_APIKEY}&lang=fr&units=metric`)
      //   .catch(err => {
      //     console.error(err)
      //     this.error = "Je n'arrives pas à accéder à la météo pour le moment, réessayez plus tard."
      //     return 
      //   })
      //   console.log(JSON.stringify(weather))
      const weather = {"lat":48.76,"lon":6.13,"timezone":"Europe/Paris","current":{"dt":1586894818,"sunrise":1586839553,"sunset":1586888700,"temp":5.77,"feels_like":0.13,"pressure":1024,"humidity":52,"dew_point":-2.93,"uvi":4.94,"clouds":0,"visibility":10000,"wind_speed":4.6,"wind_deg":60,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},"hourly":[{"dt":1586894400,"temp":5.77,"feels_like":0.76,"pressure":1024,"humidity":52,"dew_point":-2.93,"clouds":0,"wind_speed":3.69,"wind_deg":70,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586898000,"temp":4.95,"feels_like":0.35,"pressure":1025,"humidity":59,"dew_point":-2.11,"clouds":0,"wind_speed":3.27,"wind_deg":81,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586901600,"temp":4.21,"feels_like":-0.36,"pressure":1025,"humidity":63,"dew_point":-1.94,"clouds":0,"wind_speed":3.27,"wind_deg":78,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586905200,"temp":3.57,"feels_like":-1.14,"pressure":1025,"humidity":66,"dew_point":-1.93,"clouds":0,"wind_speed":3.46,"wind_deg":75,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586908800,"temp":3.17,"feels_like":-1.57,"pressure":1025,"humidity":68,"dew_point":-1.91,"clouds":0,"wind_speed":3.51,"wind_deg":66,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586912400,"temp":3,"feels_like":-1.88,"pressure":1024,"humidity":68,"dew_point":-3.36,"clouds":0,"wind_speed":3.69,"wind_deg":68,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586916000,"temp":2.66,"feels_like":-2.36,"pressure":1024,"humidity":70,"dew_point":-3.44,"clouds":0,"wind_speed":3.9,"wind_deg":57,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586919600,"temp":2.33,"feels_like":-2.47,"pressure":1024,"humidity":72,"dew_point":-3.5,"clouds":0,"wind_speed":3.6,"wind_deg":60,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586923200,"temp":2.06,"feels_like":-2.85,"pressure":1024,"humidity":73,"dew_point":-3.48,"clouds":0,"wind_speed":3.73,"wind_deg":65,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586926800,"temp":1.88,"feels_like":-3.32,"pressure":1024,"humidity":74,"dew_point":-3.22,"clouds":0,"wind_speed":4.16,"wind_deg":64,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}]},{"dt":1586930400,"temp":3.09,"feels_like":-2.35,"pressure":1024,"humidity":69,"dew_point":-2.52,"clouds":0,"wind_speed":4.53,"wind_deg":68,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}]},{"dt":1586934000,"temp":5.09,"feels_like":-0.6,"pressure":1024,"humidity":61,"dew_point":-1.51,"clouds":0,"wind_speed":4.93,"wind_deg":73,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}]},{"dt":1586937600,"temp":7.31,"feels_like":1.44,"pressure":1024,"humidity":53,"dew_point":-0.46,"clouds":0,"wind_speed":5.22,"wind_deg":70,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}]},{"dt":1586941200,"temp":9.36,"feels_like":3.5,"pressure":1024,"humidity":50,"dew_point":0.68,"clouds":14,"wind_speed":5.42,"wind_deg":74,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02d"}]},{"dt":1586944800,"temp":11.2,"feels_like":5.54,"pressure":1023,"humidity":48,"dew_point":1.68,"clouds":10,"wind_speed":5.37,"wind_deg":82,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}]},{"dt":1586948400,"temp":12.72,"feels_like":7.45,"pressure":1023,"humidity":46,"dew_point":2.43,"clouds":13,"wind_speed":5,"wind_deg":84,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02d"}]},{"dt":1586952000,"temp":13.9,"feels_like":8.73,"pressure":1022,"humidity":45,"dew_point":3.3,"clouds":22,"wind_speed":5.03,"wind_deg":82,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02d"}]},{"dt":1586955600,"temp":14.65,"feels_like":9.82,"pressure":1022,"humidity":45,"dew_point":4.06,"clouds":71,"wind_speed":4.72,"wind_deg":85,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}]},{"dt":1586959200,"temp":15.32,"feels_like":11.15,"pressure":1021,"humidity":45,"dew_point":4.52,"clouds":76,"wind_speed":3.93,"wind_deg":89,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}]},{"dt":1586962800,"temp":15.66,"feels_like":11.79,"pressure":1020,"humidity":46,"dew_point":5.08,"clouds":70,"wind_speed":3.66,"wind_deg":83,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}]},{"dt":1586966400,"temp":15.36,"feels_like":11.62,"pressure":1020,"humidity":50,"dew_point":6.02,"clouds":62,"wind_speed":3.74,"wind_deg":77,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}]},{"dt":1586970000,"temp":14.13,"feels_like":10.6,"pressure":1020,"humidity":56,"dew_point":6.69,"clouds":54,"wind_speed":3.57,"wind_deg":74,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}]},{"dt":1586973600,"temp":11.65,"feels_like":7.78,"pressure":1020,"humidity":60,"dew_point":5.33,"clouds":50,"wind_speed":3.69,"wind_deg":76,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03d"}]},{"dt":1586977200,"temp":9.94,"feels_like":5.67,"pressure":1020,"humidity":59,"dew_point":3.41,"clouds":43,"wind_speed":3.78,"wind_deg":82,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03n"}]},{"dt":1586980800,"temp":9.18,"feels_like":4.72,"pressure":1021,"humidity":57,"dew_point":2.26,"clouds":22,"wind_speed":3.78,"wind_deg":85,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}]},{"dt":1586984400,"temp":8.4,"feels_like":4.6,"pressure":1021,"humidity":58,"dew_point":1.8,"clouds":15,"wind_speed":2.72,"wind_deg":94,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}]},{"dt":1586988000,"temp":7.46,"feels_like":4.39,"pressure":1021,"humidity":62,"dew_point":1.71,"clouds":12,"wind_speed":1.69,"wind_deg":102,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}]},{"dt":1586991600,"temp":7.01,"feels_like":4.28,"pressure":1021,"humidity":63,"dew_point":1.64,"clouds":9,"wind_speed":1.16,"wind_deg":113,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586995200,"temp":6.94,"feels_like":4.27,"pressure":1021,"humidity":64,"dew_point":1.65,"clouds":7,"wind_speed":1.11,"wind_deg":121,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]},{"dt":1586998800,"temp":6.97,"feels_like":4.16,"pressure":1020,"humidity":63,"dew_point":1.62,"clouds":29,"wind_speed":1.26,"wind_deg":152,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03n"}]},{"dt":1587002400,"temp":7,"feels_like":4.12,"pressure":1020,"humidity":65,"dew_point":1.89,"clouds":24,"wind_speed":1.46,"wind_deg":152,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}]},{"dt":1587006000,"temp":7.02,"feels_like":4.02,"pressure":1020,"humidity":66,"dew_point":2.14,"clouds":16,"wind_speed":1.69,"wind_deg":149,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}]},{"dt":1587009600,"temp":6.84,"feels_like":3.82,"pressure":1020,"humidity":67,"dew_point":2.31,"clouds":12,"wind_speed":1.73,"wind_deg":162,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02n"}]},{"dt":1587013200,"temp":6.73,"feels_like":3.78,"pressure":1020,"humidity":71,"dew_point":2.91,"clouds":10,"wind_speed":1.79,"wind_deg":170,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}]},{"dt":1587016800,"temp":8.42,"feels_like":5.72,"pressure":1020,"humidity":73,"dew_point":4.93,"clouds":12,"wind_speed":1.93,"wind_deg":174,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02d"}]},{"dt":1587020400,"temp":11.01,"feels_like":8.08,"pressure":1020,"humidity":67,"dew_point":6.34,"clouds":93,"wind_speed":2.61,"wind_deg":187,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587024000,"temp":13.15,"feels_like":10.35,"pressure":1019,"humidity":64,"dew_point":7.63,"clouds":100,"wind_speed":2.84,"wind_deg":187,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587027600,"temp":15.1,"feels_like":11.74,"pressure":1019,"humidity":58,"dew_point":7.95,"clouds":97,"wind_speed":3.77,"wind_deg":210,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587031200,"temp":16.71,"feels_like":13.13,"pressure":1018,"humidity":54,"dew_point":8.51,"clouds":98,"wind_speed":4.23,"wind_deg":209,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587034800,"temp":18.52,"feels_like":14.81,"pressure":1018,"humidity":49,"dew_point":8.78,"clouds":95,"wind_speed":4.5,"wind_deg":210,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587038400,"temp":19.05,"feels_like":15.2,"pressure":1018,"humidity":47,"dew_point":8.68,"clouds":96,"wind_speed":4.66,"wind_deg":209,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587042000,"temp":19.64,"feels_like":15.98,"pressure":1017,"humidity":47,"dew_point":8.98,"clouds":100,"wind_speed":4.57,"wind_deg":211,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587045600,"temp":19.59,"feels_like":16.45,"pressure":1017,"humidity":49,"dew_point":9.73,"clouds":100,"wind_speed":4.03,"wind_deg":213,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587049200,"temp":19.31,"feels_like":16.33,"pressure":1016,"humidity":51,"dew_point":10.1,"clouds":100,"wind_speed":3.91,"wind_deg":218,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587052800,"temp":18.73,"feels_like":16.78,"pressure":1016,"humidity":57,"dew_point":11.22,"clouds":100,"wind_speed":2.87,"wind_deg":220,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587056400,"temp":17.5,"feels_like":15.72,"pressure":1015,"humidity":61,"dew_point":11.08,"clouds":100,"wind_speed":2.56,"wind_deg":218,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}]},{"dt":1587060000,"temp":15.53,"feels_like":14.18,"pressure":1015,"humidity":66,"dew_point":10.43,"clouds":82,"wind_speed":1.69,"wind_deg":219,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}]},{"dt":1587063600,"temp":13.44,"feels_like":11.95,"pressure":1015,"humidity":71,"dew_point":9.43,"clouds":0,"wind_speed":1.57,"wind_deg":202,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01n"}]}],"daily":[{"dt":1586862000,"sunrise":1586839553,"sunset":1586888700,"temp":{"day":5.77,"min":2.77,"max":5.77,"night":2.77,"eve":5.77,"morn":5.77},"feels_like":{"day":0.78,"night":-2.02,"eve":0.78,"morn":0.78},"pressure":1024,"humidity":52,"dew_point":-2.93,"wind_speed":3.67,"wind_deg":63,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"clouds":0,"uvi":4.94},{"dt":1586948400,"sunrise":1586925835,"sunset":1586975190,"temp":{"day":13.9,"min":3.08,"max":15.66,"night":6.94,"eve":11.65,"morn":3.08},"feels_like":{"day":8.73,"night":4.27,"eve":7.78,"morn":-2.36},"pressure":1022,"humidity":45,"dew_point":3.3,"wind_speed":5.03,"wind_deg":82,"weather":[{"id":801,"main":"Clouds","description":"peu nuageux","icon":"02d"}],"clouds":22,"uvi":4.57},{"dt":1587034800,"sunrise":1587012118,"sunset":1587061679,"temp":{"day":19.05,"min":8.42,"max":19.31,"night":10.99,"eve":15.53,"morn":8.42},"feels_like":{"day":15.2,"night":9.53,"eve":14.18,"morn":5.72},"pressure":1018,"humidity":47,"dew_point":8.68,"wind_speed":4.66,"wind_deg":209,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"clouds":96,"uvi":4.8},{"dt":1587121200,"sunrise":1587098402,"sunset":1587148168,"temp":{"day":19.95,"min":11.54,"max":20.19,"night":11.54,"eve":16.2,"morn":11.54},"feels_like":{"day":17.16,"night":9.04,"eve":14.53,"morn":9.53},"pressure":1014,"humidity":49,"dew_point":10.17,"wind_speed":3.64,"wind_deg":200,"weather":[{"id":500,"main":"Rain","description":"légère pluie","icon":"10d"}],"clouds":73,"rain":1.2,"uvi":4.7},{"dt":1587207600,"sunrise":1587184686,"sunset":1587234658,"temp":{"day":19.01,"min":10.74,"max":19.01,"night":10.91,"eve":15.58,"morn":10.74},"feels_like":{"day":16.92,"night":9.43,"eve":14.67,"morn":8.16},"pressure":1016,"humidity":56,"dew_point":11.04,"wind_speed":3.06,"wind_deg":278,"weather":[{"id":802,"main":"Clouds","description":"partiellement nuageux","icon":"03d"}],"clouds":42,"uvi":4.7},{"dt":1587294000,"sunrise":1587270971,"sunset":1587321147,"temp":{"day":19.78,"min":10.6,"max":19.99,"night":11.21,"eve":15.92,"morn":10.6},"feels_like":{"day":16.6,"night":5.46,"eve":11.97,"morn":7.94},"pressure":1013,"humidity":60,"dew_point":12.87,"wind_speed":5.33,"wind_deg":66,"weather":[{"id":803,"main":"Clouds","description":"nuageux","icon":"04d"}],"clouds":64,"uvi":5.05},{"dt":1587380400,"sunrise":1587357258,"sunset":1587407636,"temp":{"day":13.34,"min":7.06,"max":13.8,"night":7.06,"eve":10.98,"morn":8.92},"feels_like":{"day":4.84,"night":-1.77,"eve":3.09,"morn":2.17},"pressure":1011,"humidity":49,"dew_point":3.9,"wind_speed":9.96,"wind_deg":73,"weather":[{"id":804,"main":"Clouds","description":"couvert","icon":"04d"}],"clouds":100,"uvi":5.2},{"dt":1587466800,"sunrise":1587443545,"sunset":1587494125,"temp":{"day":12.87,"min":4.74,"max":14.53,"night":8.25,"eve":11.62,"morn":4.74},"feels_like":{"day":3.37,"night":1.72,"eve":4.86,"morn":-4.28},"pressure":1011,"humidity":42,"dew_point":1.34,"wind_speed":10.79,"wind_deg":75,"weather":[{"id":800,"main":"Clear","description":"ciel dégagé","icon":"01d"}],"clouds":0,"uvi":5.48}]}
      console.log(weather)
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
  background-color: rgba(0,0,0,0.2);
  display: flex;
  overflow: auto;
  .weekDay {
    display: flex;
    flex-direction: column;
    padding:10px
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