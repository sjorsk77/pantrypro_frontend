import React, {useState, useRef, useEffect} from "react";
import {EditableText} from "../Inputs/InputBox";
import useApiWrapper from "../../api/ApiWrapper";
import useFormatServices from "../../Services/FormatServices";
import DietTypeSelection from "./DietTypeSelection";

export function Diet ({diet, onClick}) {


    return (
        <div className='bg-background-gray rounded-lg p-5 overflow-auto h-fit w-full flex flex-row justify-between'>
            <h1>{diet.name}</h1>
            <button onClick={onClick}>
                <box-icon type='solid' name='info-circle'></box-icon>
            </button>
        </div>
    );

}