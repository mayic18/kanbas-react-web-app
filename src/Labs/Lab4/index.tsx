import React from 'react';
import ClickEvent from './ClickEvent';
import PassingDataOnEvent from './PassingDataOnEvent';
import PassingFunctions from "./PassingFunctions";
import EventObject from './EventObject';
import Counter from './Counter';
import BooleanStateVariables from './BooleanStateVariables';
import StringStateVariables from './StringStateVariables';
import DateStateVariable from './DateStateVariable';
import ObjectStateVariable from './ObjectStateVariable';
import ParentStateComponent from './ParentStateComponent';
import ChildStateComponent from './ParentStateComponent';
import ArrayStateVariable from './ArrayStateVariable';
import ReduxExamples from "./ReduxExamples";
export default function Lab4(){
    function sayHello() {
        alert("Hello");
      }    
    return (
        <div id="wd-passing-functions">
            <h2>Lab 4</h2>
            <ClickEvent/>
            <PassingDataOnEvent/>
            <PassingFunctions theFunction={sayHello} />
            <EventObject/>
            <Counter/>
            <BooleanStateVariables/>
            <StringStateVariables/>
            <DateStateVariable/>
            <ObjectStateVariable/>
            <ArrayStateVariable/>
            <ParentStateComponent/>
            <ChildStateComponent/>
            <ReduxExamples/>
        </div>
      );
}