function Enum()  {
    return {
        "ESpecialValue": {
            'NotFound':1,
        },
        "ELogLevel": {
            "Info": 1,
            "Debug": 2,
            "Waring": 3,
            "Error": 4,
        }
    }
}

ELogLevel = {
    "Info": 1,
    "Debug": 2,
    "Waring": 3,
    "Error": 4,
}

module.exports =  Enum();