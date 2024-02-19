// JavaScript source code
import './index.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LogInfo({ write }) {
    return (
        <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput"></input>
            <label for="floatingInput">{write}</label>
        </div>
    )
}
export default LogInfo;