import winston from "winston-browser";

console.log(winston)

const logger = winston.createLogger({
  level: "info"
});

export default logger;
