var driverHiring = angular.module(`driverHiring`, []);
driverHiring.controller(`driverHiringController`, function($http){
  var dhc = this;
  dhc.statusOptions =[
      {
        "optionName":"工签",
        "selected":false
      },
      {
        "optionName":"学签",
        "selected":false
      },
      {
        "optionName":"公民",
        "selected":false
      },
      {
        "optionName":"永久居住",
        "selected":false
      },
      {
        "optionName":"其他",
        "selected":false
      }
  ];
  dhc.sinOptions =[
      {
        "optionName":"有",
        "selected":false
      },
      {
        "optionName":"无",
        "selected":false
      }
  ];
  dhc.experienceOptions =[
      {
        "optionName":"有",
        "selected":false
      },
      {
        "optionName":"无",
        "selected":false
      }
  ];
  dhc.areaOptions =[
      {
        "optionName":"Scarborough /& Markham",
        "selected":false
      },
      {
        "optionName":"Richmond Hill /& North York",
        "selected":false
      },
      {
        "optionName":"Downtown",
        "selected":false
      },
      {
        "optionName":"Mississauga",
        "selected":false
      }
  ];
  dhc.hourOptions =[
      {
        "optionName":"Full Time: 每天10:00 - 22:00",
        "selected":false
      },
      {
        "optionName":"Part Time: 每天5个小时",
        "selected":false
      },
      {
        "optionName":"Peak Time: Weekdays: 12:00-14:00,18:00 - 21:00.\n  Weekends: 12:00-15:00, 17:00 - 21:00",
        "selected":false
      }
    ];
  var applyDriver = {
      name :"",
      address: "",
      tel : "",
      email:"",
      status: "",
      sin:"",
      experience:"",
      area:[],
      hour:[],
      comments:""
    }
  dhc.applyDriver = applyDriver;


  dhc.setStatus = function(){
    for (i = 0; i < dhc.statusOptions.length; i++) {
     if (dhc.statusOptions[i].selected == true){
       dhc.applyDriver.status = dhc.statusOptions[i].optionName;
      }
     console.log(applyDriver.status)
     }
   }
  dhc.setSin = function(){
   for (i = 0; i < dhc.sinOptions.length; i++) {
    if (dhc.sinOptions[i].selected == true){
      dhc.applyDriver.sin = dhc.sinOptions[i].optionName;
     }
    console.log(applyDriver.sin)
    }
  }
  dhc.setExperience = function(){
   for (i = 0; i < dhc.experienceOptions.length; i++) {
    if (dhc.experienceOptions[i].selected == true){
     dhc.applyDriver.experience = dhc.experienceOptions[i].optionName;
       }
    }
   }
  dhc.setArea = function(){
   dhc.applyDriver.area = [];
    angular.forEach(dhc.areaOptions, function(area){
      if (area.selected) dhc.applyDriver.area.push(area.optionName);
     })
  }
  dhc.setHour = function(){
    dhc.applyDriver.hour = [];
     angular.forEach(dhc.hourOptions, function(hour){
      if (hour.selected) dhc.applyDriver.hour.push(hour.optionName);
     })
  }
  dhc.statusSelection = function(position, statusOptions) {
     angular.forEach(statusOptions, function(status, index) {
       if (position != index)
       status.selected = false;
     });
   }
  dhc.sinSelection = function(position, sinOptions) {
     angular.forEach(sinOptions, function(sin, index) {
       if (position != index)
       sin.selected = false;
     });
    }
  dhc.experienceSelection = function(position, experienceOptions) {
    angular.forEach(experienceOptions, function(experience, index) {
      if (position != index)
        experience.selected = false;
    });
   }
  dhc.outPutDriver = function(){
   dhc.driverInformaiton =
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>driverHiringr</title>
      </head>
      <body>
      姓名:`+dhc.applyDriver.name +
      `<br>地址:`+ dhc.applyDriver.address+
      `<br>电话:`+dhc.applyDriver.tel+
      `<br>邮箱:`+dhc.applyDriver.email+
      `<br>身份:`+dhc.applyDriver.status+
      `<br>是否有工卡:`+dhc.applyDriver.sin +
      `<br>是否有经验:`+dhc.applyDriver.experience+
      `<br>申请工作区域:`+dhc.applyDriver.area+
      `<br>申请工作时间:`+dhc.applyDriver.hour+
      `<br>自我简述:`+dhc.applyDriver.comments+`
      </body>
    </html>`
    console.log(dhc.driverInformaiton)

    $http({
      method: 'POST',
      url: 'https://www.chanmao.ca/index.php?r=Site/ApplyDriver',
      headers: {
        'Authortoken': "hire_driver_chanmao_inc",
      },
      data: { driver_information: dhc.driverInformaiton }
    }).then(function successCallback(response) {
        console.log(response)
    }, function errorCallback(response) {
      console.log(response)
      });
    }
})
