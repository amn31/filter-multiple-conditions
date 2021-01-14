
# Like a SQL query, filter a array of objects

To simplify searching in a array of objects like a SQL query, you can use [amn31@filter-multiple-conditions].
If datas is stored in database, you can use package [@amn31/convert2sequelize] to complete your needs. 


# Query example

```ts

    // Example of request 
    let whereJSON = [ 
            [
                "Imei",
                "not like",
                "'%33680090%'"
            ],
            "and",
            [
                [
                    "EnrollmentStatus",
                    "=",
                    "Unnrolled"
                ],
                "or",
                [
                    "EnrollmentStatus",
                    "=",
                    "Enrolled"
                ],
            ]
        ]
```

# Installation

$ npm install @amn31/filter-multiple-conditions


# Launch queries

How use [amn31@filter-multiple-conditions] ?

```ts
  
   import { FilterConditions, MaFilter } from "@amn31/filter-multiple-conditions"

    // Create query
    let conditions :FilterConditions = [
        [
            "id",
            ">",
            // Number
            "13"
        ],
        "and",
        [
            [
                "isLeasing",
                "=",
                "1" // '1' => true, 
            ],
            "or",
            [
                [
                    "isLeasing",
                    "isnull",
                    ""
                ],
                "and",
                [
                    "Platform",
                    "like",
                    "%Apple%"
                ],
            ]
        ]
    ];

    // Data to filter
    let data = [
        ...
        {
            "id": 10,
            "Imei": "01326007739292",
            "Platform": "Apple",
            "Model": "iPad 3rd Gen LTE (GSM) (64 GB)",
            "OperatingSystem": "9.3.5",
            "EnrollmentStatus": "Enrolled",
            "lastseen": "2021-02-08",
            "isLeasing": true
        },
        ...
    ]

    // Result of filtering
    let dataFiltered = MaFilter.FilterByConditions(conditions, data);

    console.log(dataFiltered)
    
```

### Operators 

```sql
    and
    or
    =
    !=
    >
    <
    >=
    <=
    like
    not like
    regex
    notRegexp
    startswith
    endswith
    contains
    isnull
    isnotnull
```

## License

[MIT](LICENSE)

[Angular](https://angular.io/)

[Sequelize](https://sequelize.org/master/manual/model-querying-basics.html)

[@amn31/convert2sequelize](https://www.npmjs.com/package/@amn31/convert2sequelize)

[@amn31/filter-multiple-conditions](https://www.npmjs.com/package/@amn31/filter-multiple-conditions)