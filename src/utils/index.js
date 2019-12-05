import moment from 'moment';

export const Utils = {
  daysBetween : function(date1, date2) {
    const datetime1 = moment(date1).utc();
    const datetime2 = moment(date2).utc();
    const diffTime = moment(datetime2.diff(datetime1)).utc();

    if (datetime1.isAfter(datetime2)) {
      return "00:00:00"
    }
    else {
      const diffInDays = datetime2.diff(datetime1, 'days');
      if (diffInDays > 0) {
        return diffInDays + "d " + diffTime.format("HH:mm:ss");
      }
      else {
        return diffTime.format("HH:mm:ss");
      }
    }
  },

  getRandomValue: function(min, max) {
    return Math.random() * (max - min) + min
  },

  formatDateFromTime: function(timeInSecond) {
    const date = moment(timeInSecond*1000);
    return date.format("DD-MM-YYYY HH:mm:ss");
  },

  getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },

  strip: function(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  },

  getPrecision: function(a) {
    if (!isFinite(a)) return 0;
    var e = 1, p = 0;
    while (Math.round(a * e) / e !== a) {
      e *= 10; p++;
    }
    return p;
  },

  getPrecisionString: function(str) {
    if(typeof str !== 'string')
      str = str.toString()
    str = str.split(".")
    if(str.length === 1)
      return 0
    return str[1].length
  },

  clearUserCache() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("lastLogin");
  },

  convertTimeToTz(timeInSecond) {
    const date = moment(timeInSecond*1000);
    return moment(date).utcOffset("+08:00").format('MMM DD, HH:mm');
  },

  convertCurrentTimeToTz(currentTime) {
    return moment(currentTime).utcOffset("+08:00").format('HH:mm:ss');
  }
  ,
  aesEncrypt(message) {
    return CryptoJS.AES.encrypt(message, process.env.CRYPTO_AES);
  },

  aesDecrypt(message) {
    if(message === null)
      return "";
    return CryptoJS.AES.decrypt(message, process.env.CRYPTO_AES).toString(CryptoJS.enc.Utf8);
  }
}
