export default class GeneralUtils{

    static URL = 'http://wwww.localhost:8080';
    static DATE_FORMAT_CALENDAR = 'yy-mm-dd';
    static DATE_FORMAT_MOMENT = 'YYYY-MM-DD';

    static changeDecimalSeperator (str,from,to) {
        return str.replace(from,to).replace(' ','');
    }
    static formatNumber(num) {
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    static numberFormatter(number){
        if (!isNaN(number) && number != "NaN" && number != 0 && number != Infinity){
            return  this.changeDecimalSeperator(number.toString(),'.',',');
            //return  this.formatNumber(this.changeDecimalSeperator(number.toString(),'.',','));
        }
    }

    static isNullOrEmpty(value) {
        return (!value || value === undefined || value === "" || value.length === 0 || JSON.stringify(value) === JSON.stringify({}));
    }

    static deleteDot(str){
            return str.replace('.','')
    }
}