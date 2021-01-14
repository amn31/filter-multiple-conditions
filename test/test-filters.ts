
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
if (r.length != 5) {
    
    throw("Unexpected result!")
}

