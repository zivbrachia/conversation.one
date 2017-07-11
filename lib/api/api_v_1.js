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
    req.all_columns = {};
    req.all_columns.search = [];

    if (req.query["all_columns"]) {
        req.all_columns.value = req.query["all_columns"];
    }

    for (let i = 0; i < att.length; i++) {
        if (req.query[att[i].col_name]) {
            req.search.push(
                { 
                    "col_name": att[i].col_name, 
                    "value": req.query[att[i].col_name] 
                }
            );
        }
        else {
            req.all_columns.search.push(
                { 
                    "col_name": att[i].col_name, 
                }
            );
        }
    }

    if (req.search.length || req.all_columns.value) {
        next();
    }
    else {
        res.json({
            "status": "error - one of the parameters to search is oblegatory: title, description, category_name, actor_name, language_name or free text"
        });
    }
}

function searchAction(req, res, next) {
    let select = "SELECT *";
    let from = "FROM TABLE";
    let where_and = "";
    let where_or = ""
    let where = "";
    
    for (let i = 0; i < req.search.length; i++) {
        let param = req.search[i];
        if (i===0) {
            where_and = "(" + param.col_name + " LIKE " + "'%"+ param.value + "%')";
        }
        else {
            where_and = where_and + " AND (" + param.col_name + " LIKE " + "'%"+ param.value + "%')"
        }
    }
    where = where_and;

    if (req.all_columns.value) {
        for (let i = 0; i < req.all_columns.search.length; i++) {
            let param = req.all_columns.search[i];
            if (i === 0) {
                where_or = "(" + param.col_name + " LIKE " + "'%" + req.all_columns.value + "%')";
            }
            else {
                where_or = where_or + " OR (" + param.col_name + " LIKE " + "'%" + req.all_columns.value + "%')"
            }
        }
        if ((where_and) && (where_or)) {
            where = (" (" + where_and + ") ")+ "AND (" + where_or + ")";
        }
        else if (where_or) {
            where = "(" + where_or + ")";
        }
        
    }
        
    
    let sql_query = select + " " + from + " " + where;
    // TODO :
    // 1. mysql query
    // 2. req.query_result = buildR""esult(query_result) -> req.query_result will hold json object
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
