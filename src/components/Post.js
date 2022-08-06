import Component from "../Component";
import DOMNode from "../Helpers/elements";
import Title from "./Title";
import Button from "./Button";
import {createState, refreshContent} from "../Helpers/state";
import Navbar from "./Navbar";
import Table from "./Table";




function changeState() {
    state.count = state.count + 1
}