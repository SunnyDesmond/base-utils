var baseUtils = {
  // url参数转对象
  parseQueryString: function(url) {
    url = !url ? window.location.href : url;
    if (url.indexOf("?") === -1) {
      return {};
    }
    var search = url[0] === "?" ? url.substr(1) : url.substring(url.lastIndexOf("?") + 1);
    if (search === "") {
      return {};
    }
    search = search.split("&");
    var query = {};
    for (var i = 0; i < search.length; i++) {
      var pair = search[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
  },

  // 剩余时间
  timeRemain: function(startTime, endTime) {
    if (!startTime || !endTime) {
      return;
    }
    var startDate, endDate;
    if (startTime instanceof Date) {
      startDate = startTime;
    } else {
      startDate = new Date(startTime.replace(/-/g, "/")); //开始时间
    }
    if (endTime instanceof Date) {
      endDate = endTime;
    } else {
      endDate = new Date(endTime.replace(/-/g, "/")); //结束时间
    }
    var t = endDate.getTime() - startDate.getTime();
    var d = 0,
      h = 0,
      m = 0,
      s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24) < 10 ? "0" + String(Math.floor(t / 1000 / 3600 / 24)) : Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor((t / 1000 / 60 / 60) % 24) < 10 ? "0" + String(Math.floor((t / 1000 / 60 / 60) % 24)) : Math.floor((t / 1000 / 60 / 60) % 24);
      m = Math.floor((t / 1000 / 60) % 60) < 10 ? "0" + String(Math.floor((t / 1000 / 60) % 60)) : Math.floor((t / 1000 / 60) % 60);
      s = Math.floor((t / 1000) % 60) < 10 ? "0" + String(Math.floor((t / 1000) % 60)) : Math.floor((t / 1000) % 60);
    }
    return { d, h, m, s };
  },

  // 验证邮箱
  isEmail: function(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
  },

  // 验证手机号
  isTelphone: function(str) {
    return /^1[3456789]\d{9}$/.test(str);
  },

  // 获取操作系统类型

  getOS: function() {
    var userAgent = ("navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase()) || "";
    var vendor = ("navigator" in window && "vendor" in navigator && navigator.vendor.toLowerCase()) || "";
    var appVersion = ("navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase()) || "";
    var result = "";
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return "ios";
    if (/android/i.test(userAgent)) return "android";
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return "windowsPhone";
    if (/mac/i.test(appVersion)) return "MacOSX";
    if (/win/i.test(appVersion)) return "windows";
    if (/linux/i.test(appVersion)) return "linux";
    if (userAgent.match(/micromessenger/gi)) return "wxPay";
    if (userAgent.match(/AlipayClient/gi)) return "aliPay";
  },

  // 对象判空
  isEmptyObject: function(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    return !Object.keys(obj).length;
  },

  // 深拷贝
  deepClone: function(values) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == values || "object" != typeof values) return values;

    // Handle Date
    if (values instanceof Date) {
      copy = new Date();
      copy.setTime(values.getTime());
      return copy;
    }

    // Handle Array
    if (values instanceof Array) {
      copy = [];
      for (var i = 0, len = values.length; i < len; i++) {
        copy[i] = deepClone(values[i]);
      }
      return copy;
    }

    // Handle Object
    if (values instanceof Object) {
      copy = {};
      for (var attr in values) {
        if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
      }
      return copy;
    }

    throw new Error("兄嘚，你传的类型我处理不了，请传入 Date/Array/Object 这三个类型！");
  }
};
