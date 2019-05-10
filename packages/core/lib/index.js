"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Grid_1 = __importDefault(require("./Grid"));
const Cell_1 = __importDefault(require("./Cell"));
exports.Cell = Cell_1.default;
const Game = (rows, options = {}) => {
    Grid_1.default.init(rows, options);
    return Grid_1.default;
};
exports.default = Game;
