export const isMobile = () => {
  // 判断移动端还是pc端
  // isMobile方法
  if (process.browser) {
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return (
      flag ||
      (navigator.userAgent.toLowerCase().indexOf("macintosh") > -1 &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2)
    );
  }
};

export const isIos = () => {
  var u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

export const isMac = () => {
  var u = navigator.userAgent;
  return u.includes("Mac");
};

export const isDevice = () => {
  if (process.browser) {
    let bd_env = "";
    var name = "bd_env";
    var cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // 判断这个cookie的参数名是不是我们想要的
      if (cookie.substring(0, name.length + 1) === name + "=") {
        bd_env = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
    return bd_env;
  }
};

//转换base64
export const imageUrl2Base64 = url => {
  return new Promise((resolve, reject) => {
    if (url) {
      let image = new Image();
      //解决跨域报错，必须写在赋值给image.src的前面，否则偶尔报错，也可以这样写image.setAttribute('crossOrigin', 'anonymous');
      image.crossOrigin = "anonymous";
      image.src = url;
      //等待图片加载完成，转换图片为base64，异步
      image.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);
        let base64 = canvas.toDataURL("image/png");
        resolve(base64);
      };
    }
  });
};
//url转blob
export const dataURLtoBlob = dataurl => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const dateFormat = date => {
  date = typeof date === "string" ? new Date(date.replace(/-/g, "/")) : date;
  var mouth = date.getMonth() + 1;
  mouth = setFull(mouth);
  return date.getFullYear() + "-" + mouth + "-" + setFull(date.getDate());
};

export const getDay = (num, str) => {
  var today = new Date();
  var nowTime = today.getTime();
  var ms = 24 * 3600 * 1000 * num;
  today.setTime(parseInt(nowTime + ms));
  var oYear = today.getFullYear();
  var oMoth = (today.getMonth() + 1).toString();
  if (oMoth.length <= 1) oMoth = "0" + oMoth;
  var oDay = today.getDate().toString();
  if (oDay.length <= 1) oDay = "0" + oDay;
  return oYear + str + oMoth + str + oDay;
};
export const formatDate = date => {
  date = new Date(date);
  let myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  mymonth < 10 ? (mymonth = "0" + mymonth) : mymonth;
  myweekday < 10 ? (myweekday = "0" + myweekday) : myweekday;
  return `${myyear}-${mymonth}-${myweekday}`;
};

export const getWeekDay = () => {
  let dateString = formatDate(new Date()); //当天的日期，例如2020-2-28
  let presentDate = new Date(dateString);
  let today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;
  return Array.from(new Array(7), function(val, index) {
    return formatDate(
      new Date(
        presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000
      )
    );
  });
};

export const Debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function() {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }

    let callNow = !timer;

    timer = setTimeout(() => {
      timer = null;
    }, delay);

    if (callNow) fn.apply(this, args);
  };
};

/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
export const isWeiXin = () => {
  if (process.browser) {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }
};

export const isAlipay = () => {
  if (process.browser) {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/Alipay/i) == "alipay") {
      return true;
    } else {
      return false;
    }
  }
};

export const notImmediatelyDebounce = (func, wait) => {
  let delay = wait || 500;
  let timeout;
  return function() {
    const context = this;
    const args = [...arguments];
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
