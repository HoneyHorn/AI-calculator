import React, { useState } from 'react';

function BlueCircles({ filledStates }) {
  return (
    <div class="blue-circes">
        <div class="circle"></div>
        {filledStates.map((state) => (
            <><div class="line"></div>
            <div class={state === 0 ? "circle-empty" : "circle"}></div></>
        ))}           
    </div>
  );
}

export default BlueCircles;
