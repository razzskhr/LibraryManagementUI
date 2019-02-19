import { Component, OnInit } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";


@Component({
  selector: 'app-dashboard-indicator',
  templateUrl: './dashboard-indicator.component.html',
  styleUrls: ['./dashboard-indicator.component.css']
})
export class DashboardIndicatorComponent implements OnInit {
  private chart:AmChart;
  constructor(private amCharts:AmChartsService) { }

  ngOnInit() {
    this.chart = this.amCharts.makeChart("chartdiv", {
      "theme": "none",
      "type": "gauge",
      "axes": [{
              "topTextFontSize": 10,
              "topTextYOffset": 60,
              "topTextColor": "#D52D2D",
              "axisColor": "#696969",
              "gridInside": true,
              "axisThickness": 1,
              "endValue": 0,
              "startValue": 24,
              "inside": true,
              "radius": "40%",
              "valueInterval": -3,
              "minorTickInterval": -1,
              "tickColor": "#696969	",
              "fontSize": 10,
              "startAngle": -90,
              "endAngle": 90,
              "bandOutlineAlpha": 0,
              "labelOffset": 10,
              "bands": [{
                      "color": "#D52D2D",
                      "endValue": 0,
                      "innerRadius": "105%",
                      "radius": "170%",
                      "gradientRatio": [0.2, 0, -0.2],
                      "startValue": 24,
                      "balloonText": "Book Name or details"
                  }, {
                      "color": "#3CB371",
                      "endValue": 24,
                      "innerRadius": "105%",
                      "radius": "170%",
                      "gradientRatio": [0.5, 0, -0.5],
                      "startValue": 24,
                      "balloonText": "Book Name or details"
                  }]
          }],
      "arrows": [{
              "alpha": 1,
              "innerRadius": "35%",
              "nailRadius": 0,
              "radius": "170%",
              "color": "#696969	",
          }]
  });
  
 
  }
  ngAfterViewInit() {
    setInterval(updateChart => {
      this.amCharts.updateChart(this.chart, () => {
        // Change whatever properties you want
        this.chart.dataProvider = [];
        var now = new Date().getTime();
        var countDownDate = new Date("Feb 14, 2019 11:37:25").getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result in an element with id="demo"
        var displayTime = hours + ":"
            + minutes + ":" + seconds;
        // If the count down is over, write some text 
        if (distance < 0) {
           var displayMsg = "Time Expired";
            return;
        }
        this.chart.arrows[0].setValue(hours);
        this.chart.axes[0].setTopText(displayTime);
        this.chart.axes[0].bands[1].setEndValue(hours);
      });

    }, 1000);
  }
  
  ngOnDestroy() {
    if (this.chart) {
      this.amCharts.destroyChart(this.chart);
    }
  }
// set random value
 GetCounter() {
    var now = new Date().getTime();
    var tomorrow = new Date(now + (24 * 60 * 60 * 1000));
    var countDownDate = new Date("Feb 14, 2019 11:37:25").getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Output the result in an element with id="demo"
    var displayTime = hours + ":"
        + minutes + ":" + seconds;
    // If the count down is over, write some text 
    if (distance < 0) {
       var displayMsg = "Time Expired";
        return;
    }
    this.chart.arrows[0].setValue(hours);
    this.chart.axes[0].setTopText(displayTime);
    this.chart.axes[0].bands[1].setEndValue(hours);
}


}
