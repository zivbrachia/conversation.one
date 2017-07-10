'use strict'

let express = require('express');
let router = express.Router();

let att = [
    { "col_name": "title" },
    { "col_name": "description" },
    { "col_name": "category_name" },
    { "col_name": "actor_name" },
    { "col_name": "language_name" },
];

let list = ["categories", "languages", "actors"];

router.get('/', function (req, res) {
    res.send('API V.1');
});

// http://localhost:8000/v1.0/search?title=ziv&description=brachia
router.get('/search', [isValidQuery, searchAction, logAction, returnResult]);

// http://localhost:8000/v1.0/search?title=ziv&description=brachia
router.get('/list/:query_subject/:query', function (req, res) {
    if (list.includes(req.params.query_subject)) {
        // TODO build list by query_subject
        res.json( {
            "query_subject" : req.params.query_subject,
            "result" : ["A", "B", "C"]
        });
    }
    else {
        res.json({
            "status" : "error - list can be on: categories, languages or actors"
        });
        
    }
});

router.get('/search_log', function (req, res) {
    res.send('API V.1 search_log');
});

function isValidQuery(req, res, next) {
    req.search = [];

    for (let i = 0; i < att.length; i++) {
        if (req.query[att[i].col_name]) {
            req.search.push(
                { 
                    "name": att[i].col_name, 
                    "value": req.query[att[i].col_name] 
                });
        }
    }

    if (req.search.length) {
        next();
    }
    else {
        res.json({
            "status" : "error - one of the parameters to search is oblegatory: title, description, category_name, actor_name, language_name"
        });
    }
}

function searchAction(req, res, next) {
    let select = "SELECT *";
    let from = "FROM TABLE";
    let where = "";
    
    for (let i = 0; i < req.search.length; i++) {
        let param = req.search[i];
        if (i===0) {
            where = param.col_name + " LIKE " + "'%"+ param.value + "%'";
        }
        else {
            where = where + " OR " + param.col_name + " LIKE " + "'%"+ param.value + "%'"
        }
    }
        
    
    let sql_query = select + " " + from + " " + where;
    // TODO :
    // 1. mysql query
    // 2. req.query_result = buildResult(query_result) -> req.query_result will hold json object
    next();
}

function logAction(req, res, next) {
    // TODO log req.query_result
    let sql_statement = "INSERT INTO search_log (column1, column2) VALUES (value1, value2)";
    
    next();
}

function returnResult(req, res) {
    // TODO build array of json with the results
    let arr_result = [];
    arr_result.push(
        {
            "title": "title",
            "desc": "desc",
            "category_name": "title",
            "relese_year": "title",
            "language_name": "title",
            "length": "title",
            "rating" : "rating",
            "actor names": ["name1", "name2"]
        }
    );
    res.json(arr_result);
}

function buildResult(query_result) {
    // TODO build array of json with the results
    let arr_result = [];
    arr_result.push(
        {
            "title": "title",
            "desc": "desc",
            "category_name": "title",
            "relese_year": "title",
            "language_name": "title",
            "length": "title",
            "rating" : "rating",
            "actor names": ["name1", "name2"]
        }
    );
    return arr_result;
}

module.exports = router;
