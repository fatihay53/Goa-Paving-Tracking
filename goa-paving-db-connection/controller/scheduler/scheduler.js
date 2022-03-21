const connection = require('../connectiongmt3');

module.exports = () => {
    var sql = `select *
               from estimate_template
               where status = 'Pending'`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;

        if (result != null && result.length > 0){
            let runningDate = new Date();
            let ids = [];
            result.map(elem=>{
                if (runningDate > new Date(elem.date)){
                   ids.push(elem.id);
                }
            })

            if(ids.length>0){
                var sql = "update estimate_template set status='Active' where id=?";
                ids.map(id=>{
                    connection.query(sql, id, function (error, rows) {
                        if (error) throw error;
                    });
                })
            }
        }
    });

}