const DataControl = require("./data/data_control")

var dcenter = new DataControl()
dcenter.init()

G = {
    DataControl: dcenter,
}