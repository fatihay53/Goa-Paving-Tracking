export default class DateUtil {
    static getDateFormat(date, formatNumber, seperator) {
        if (date == null) return "-";
        if (isNaN(date.getTime()))
            return "-";
        let year, month, day, hour, minute, second, miliSecond;
        year = date.getFullYear().toString();
        month = ((date.getMonth() + 1).toString()).length > 1 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1).toString();
        day = (date.getDate().toString()).length > 1 ? date.getDate().toString() : "0" + date.getDate().toString();
        hour = (date.getHours().toString()).length > 1 ? date.getHours().toString() : "0" + date.getHours().toString();
        minute = (date.getMinutes().toString()).length > 1 ? date.getMinutes().toString() : "0" + date.getMinutes().toString();
        second = (date.getSeconds().toString()).length > 1 ? date.getSeconds().toString() : "0" + date.getSeconds().toString();
        miliSecond = date.getMilliseconds().toString();

        switch (formatNumber) {
            case  "1":
                return year.concat(seperator).concat(month).concat(seperator).concat(day).concat(" ").concat(hour).concat(":").concat(minute).concat(":").concat(second).concat(".").concat(miliSecond);
                break;// YYYY-MM-DDTHH:mm:ss. sssZ
            case  "2":
                return year.concat(seperator).concat(month).concat(seperator).concat(day).concat(" ").concat(hour).concat(":").concat(minute).concat(":").concat(second);
                break;// YYYY-MM-DDTHH:mm:ss
            case  "3":
                return year.concat(seperator).concat(month).concat(seperator).concat(day);
                break;// YYYY-MM-DD
            case  "4":
                return hour.concat(":").concat(minute).concat(":").concat(second);
                break;
        }
    }
}