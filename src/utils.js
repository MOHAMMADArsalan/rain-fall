import axios from "axios";

const utils = {
    chanceOfRain: function (pressure, temperature, amount) {
        var score = Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);
        var mean = Math.min(Math.max(score, 0), 100);
        var upper_bound = Math.min(1.5 * mean, 100);
        var lower_bound = Math.max(0.5 * mean, 0);
        return [lower_bound, mean, upper_bound];
    },
    get: function (url) {
        return axios.get(url);
    }
}

export default utils;