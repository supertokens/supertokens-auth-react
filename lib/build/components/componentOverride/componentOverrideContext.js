"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentOverrideContext = void 0;
var react_1 = __importDefault(require("react"));
exports.ComponentOverrideContext = react_1.default.createContext("IS_DEFAULT");
