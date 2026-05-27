const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const filesToFix = ['charts.js', 'charts_locacao.js', 'charts_condominio.js'];

function decodeBdata(obj) {
  if (obj && obj.bdata && obj.dtype) {
    const buf = Buffer.from(obj.bdata, 'base64');
    const arr = [];
    if (obj.dtype === 'f8' || obj.dtype === '<f8') {
      for (let i = 0; i < buf.length; i += 8) arr.push(buf.readDoubleLE(i));
    } else if (obj.dtype === 'f4' || obj.dtype === '<f4') {
      for (let i = 0; i < buf.length; i += 4) arr.push(buf.readFloatLE(i));
    } else if (obj.dtype === 'i4' || obj.dtype === '<i4') {
      for (let i = 0; i < buf.length; i += 4) arr.push(buf.readInt32LE(i));
    }
    return arr;
  }
  return obj;
}

function processFile(filename) {
  const filePath = path.join(projectRoot, 'src', filename);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // We need to parse the window.chartsData
  // It usually starts with "window.chartsData = {" and ends with "};"
  const jsonStart = content.indexOf('{');
  const jsonEnd = content.lastIndexOf(';');
  
  if (jsonStart === -1) return;
  
  let jsonString = content.substring(jsonStart, jsonEnd);
  
  let data;
  try {
    data = JSON.parse(jsonString);
  } catch (e) {
    console.error(`Failed to parse JSON in ${filename}`);
    return;
  }
  
  for (const chartId in data) {
    const chart = data[chartId];
    if (!chart.data) continue;
    
    let isGlobalTextArray = false;
    let globalTextArray = null;
    let expectedTotalLength = 0;
    
    // First pass: decode bdata and detect if text arrays are duplicated
    chart.data.forEach(trace => {
      if (trace.y && trace.y.bdata) {
        trace.y = decodeBdata(trace.y);
      }
      if (trace.x && trace.x.bdata) {
        trace.x = decodeBdata(trace.x);
      }
      if (trace.z && trace.z.bdata) {
        trace.z = decodeBdata(trace.z);
      }
      
      const len = Array.isArray(trace.y) ? trace.y.length : (Array.isArray(trace.x) ? trace.x.length : 0);
      expectedTotalLength += len;
      
      if (Array.isArray(trace.text) && trace.text.length > len && len > 0) {
        // Text array is longer than data, probably global!
        isGlobalTextArray = true;
        globalTextArray = trace.text;
      }
    });
    
    // Second pass: fix text arrays
    if (isGlobalTextArray && globalTextArray) {
      let textOffset = 0;
      chart.data.forEach(trace => {
        const len = Array.isArray(trace.y) ? trace.y.length : (Array.isArray(trace.x) ? trace.x.length : 0);
        if (len > 0 && Array.isArray(trace.text)) {
           trace.text = globalTextArray.slice(textOffset, textOffset + len);
           textOffset += len;
        }
      });
    }
  }
  
  const newContent = `window.chartsData = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, newContent);
  console.log(`Fixed ${filename}`);
}

filesToFix.forEach(processFile);
