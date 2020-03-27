import React from 'react';
import PropTypes from 'prop-types';
import * as opentype from 'opentype.js';
import './index.css';

const DisplayFont = ({ file }) => {
  opentype.load(file, function(err, font) {
    if (err) {
      console.log('font couldnt be loaded');
    } else {
      var ctx = document.getElementById('canvas').getContext('2d');
      ctx.canvas.width = 0.9 * window.innerWidth;
      var text = 'Woven silk pyjamas exchanged for blue quartz.';
      var test = document.getElementById('slider').value;
      font.draw(ctx, text, 0, 50, test);

      var glyphsDiv = document.getElementById('glyphs');
      var amount = font.glyphs.length;
      glyphsDiv.innerHTML = '';
      for (var i = 0; i < amount; i++) {
        var glyph = font.glyphs.get(i);
        ctx = createGlyphCanvas(glyph, 60);
        glyph.draw(ctx, 15, 45, 40);
      }
    }
  });

  const createGlyphCanvas = (glyph, size) => {
    var canvasId, html, glyphsDiv, wrap, canvas, ctx;
    canvasId = 'c' + glyph.index;
    html =
      '<div class="wrapper glyph-canvas" style="width:' +
      size +
      'px"><canvas id="' +
      canvasId +
      '" width="' +
      size +
      '" height="' +
      size +
      '"></canvas><span>' +
      glyph.index +
      '</span></div>';
    glyphsDiv = document.getElementById('glyphs');
    wrap = document.createElement('div');
    wrap.innerHTML = html;
    glyphsDiv.appendChild(wrap);
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext('2d');
    return ctx;
  };

  const reloadFont = e => {
    var inputBox = document.getElementById('input');
    opentype.load(file, function(err, font) {
      if (err) {
        console.log('font cant be loaded');
      } else {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (inputBox.value !== '') {
          var text = inputBox.value;
        } else {
          text = 'Woven silk pyjamas exchanged for blue quartz.';
        }
        var test = document.getElementById('slider').value;
        font.draw(ctx, text, 0, 80, test);
      }
    });
  };

  const sliderVal = e => {
    document.getElementById('fontSize').innerHTML =
      'Size: ' + document.getElementById('slider').value + ' px';
    reloadFont();
  };

  const sampleText = e => {
    var inputBox = document.getElementById('input');

    opentype.load(file, function(err, font) {
      if (err) {
        console.log('font couldnt be loaded');
      } else {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        var text = inputBox.value;
        var test = document.getElementById('slider').value;
        font.draw(ctx, text, 0, 50, test);
      }
    });
  };

  const windowResize = e => {
    console.log('hello');
  };

  return (
    <div onresize={windowResize}>
      <div className='info'>
        <div className='display-font-top'>
          <input
            type='text'
            id='input'
            onChange={sampleText}
            placeholder='Type here to preview text'
          />
          <input type='range' name='' id='slider' onChange={sliderVal} />
          <p id='fontSize'>Size: 50px</p>
        </div>
        <br />
        <div className='info'>
          <canvas id='canvas'></canvas>
        </div>
      </div>

      <div id='glyphs'></div>
    </div>
  );
};

DisplayFont.propTypes = {
  fontName: PropTypes.string
};

export default DisplayFont;
