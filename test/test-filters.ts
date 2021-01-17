
import { DATA } from './data';
import { FilterConditions, MaFilter } from '../lib/db-filters';

console.log("Nb record",DATA.length);
console.log("First record:",DATA[0]);

let conditions :FilterConditions = [
    [
        "id",
        ">",
        "13"
    ],
    "and",
    [
        [
            "isLeasing",
            "=",
            "1"
        ],
        "or",
        [
            [
                "isLeasing",
                "isnull",
                "1"
            ],
            "and",
            [
                "id",
                "=",
                "20"
            ],
        ],
        "or",
        [
            [
                "isLeasing",
                "=",
                "0"
            ],
        ],
        "or",
        [
            [
                "id",
                ">=",
                "25"
            ],
            "and", [
                [
                    "EnrollmentStatus",
                    "=",
                    "Enrolled"
                ],
                "and",
                [
                    "Imei",
                    "=",
                    "013409000525251"
                ],
                "and",
                [
                    [
                        "EnrollmentStatus",
                        "=",
                        "Enrolled"
                    ],
                    "and",
                    [
                        "Imei",
                        "like",
                        "%1340%"
                    ]
                ]
            ]
        ],
    ],
    "and",
    [
        "id",
        "<",
        "27"
    ],

];

var r = MaFilter.FilterByConditions(conditions, DATA);
console.log("RESULT: " + r.length, r);
let c : Array<number> = new Array(14,15,16,20,26);
for(var o of r) {
    console.log(o.id+' '+((c.find(d1 => d1  == o.id) ?true:false)));
}

if (r.length != 5) {
    throw("Unexpected result!")
}

console.log("RESULT FILTER: " );
var r = MaFilter.FilterByConditions(conditions, DATA,{field: 'id'});
let i=0;
for(var o of r) {
    console.log(o.id+' '+(c[i++]  == o.id));
}

console.log("RESULT FILTER REVERSE: " );
var r = MaFilter.FilterByConditions(conditions, DATA,{field: 'id',reverse: true});
i=c.length -1;
for(var o of r) {
    console.log(o.id+' '+(c[i--]  == o.id));
}