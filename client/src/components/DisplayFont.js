import React from "react";
import PropTypes from "prop-types";
import * as opentype from "opentype.js";
import "./index.css";

const DisplayFont = ({ fontName }) => {
  var font = { fontName };
  font = JSON.stringify(font);
  font = font.slice(13, -2);

  opentype.load(font, function(err, font) {
    if (err) {
      console.log("font couldnt be loaded");
    } else {
      var ctx = document.getElementById("canvas").getContext("2d");
      var text = "Woven silk pyjamas exchanged for blue quartz.";
      var test = document.getElementById("slider").value;
      font.draw(ctx, text, 0, 50, test);
    }
  });

  const reloadFont = e => {
    var ctx = document.getElementById("canvas").getContext("2d");
    var text = "Woven silk pyjamas exchanged for blue quartz.";
    var test = document.getElementById("slider").value;

    font.draw(ctx, text, 0, 50, test);
  };

  const sliderVal = e => {
    document.getElementById("fontSize").innerHTML = document.getElementById("slider").value;
    reloadFont();
  };

  const sampleText = e => {
    var inputBox = document.getElementById("input");
    document.getElementById("output").value = inputBox.value;

    opentype.load(font, function(err, font) {
      if (err) {
        console.log("font couldnt be loaded");
      } else {
        var ctx = document.getElementById("canvas").getContext("2d");
        var text = inputBox.value;
        var test = document.getElementById("slider").value;
        font.draw(ctx, text, 0, 50, test);
      }
    });
  };

  return (
    <div>
      <canvas id='canvas'></canvas>
      <input type='range' name='' id='slider' onChange={sliderVal} />
      <p id='fontSize'></p>
      <input type='text' id='input' onChange={sampleText} />
      <input type='text' id='output' disabled />
    </div>
  );
};

DisplayFont.propTypes = {
  fontName: PropTypes.string
};

export default DisplayFont;
