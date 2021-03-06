'use strict';

exports.json = function(input) {
  return JSON.stringify(input, null, '    ');
};

exports.convertBytes = function(input) {
  input = parseInt(input, 10);
  if (input < 1024) {
    return input.toString() + ' Bytes';
  } else if (input < 1024 * 1024) {
    //Convert to KB and keep 2 decimal values
    input = Math.round((input / 1024) * 100) / 100;
    return input.toString() + ' KB';
  } else if (input < 1024 * 1024 * 1024) {
    input = Math.round((input / (1024 * 1024)) * 100) / 100;
    return input.toString() + ' MB';
  } else if (input < 1024 * 1024 * 1024 * 1024) {
    input = Math.round((input / (1024 * 1024 * 1024)) * 100) / 100;
    return input.toString() + ' GB';
  } else if (input < 1024 * 1024 * 1024 * 1024 * 1024) {
    input = Math.round((input / (1024 * 1024 * 1024 * 1024)) * 100) / 100;
    return input.toString() + ' TB';
  } else {
    return input.toString() + ' Bytes';
  }
};

exports.to_string = function(input) {
  return (input !== null && input !== undefined) ? input.toString() : '';
};

exports.to_display = function(input) {

  // Images inline
  if (
    typeof input === 'string' &&
    (
      input.substr(0, 22) === 'data:image/png;base64,' ||
      input.substr(0, 22) === 'data:image/gif;base64,' ||
      input.substr(0, 23) === 'data:image/jpeg;base64,'
    )
  )  {
    return '<img src="' + input + '"/>';
  }

  // Audio inline
  if (
    typeof input === 'string' &&
    (
      input.substr(0, 22) === 'data:audio/ogg;base64,' ||
      input.substr(0, 22) === 'data:audio/mp3;base64,'
    )
  )  {
    return '<audio controls src="' + input + '"/>';
  }

  // Video inline
  if (
    typeof input === 'string' &&
    (
      input.substr(0, 23) === 'data:video/webm;base64,' ||
      input.substr(0, 22) === 'data:video/mp4;base64,'  ||
      input.substr(0, 22) === 'data:video/ogv;base64,'
    )
  )  {
    return '<video controls><source type="' + input.substring(input.indexOf(':') + 1, input.indexOf(';')) + '" src="' + input + '"/></video>';
  }

  if (typeof input === 'object' && input.toString() === '[object Object]') {
    return '<pre>' + JSON.stringify(input, null, 2) + '</pre>';
  }

  // Concatenate long strings
  if (typeof input === 'string' && input.length > 50) {
    return input.substr(0, 49) + '…';
  }

  // Try and output .toString()
  if (input !== null && input !== undefined) {
    return input.toString();
  }

  return '';
};

exports.is_embeddedDocumentNotation = function(input) {
  return /^(?:[a-zA-Z0-9_]+\.)+[a-zA-Z0-9_]+/.test(input);
};
