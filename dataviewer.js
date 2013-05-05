/* Current version: BETA 2.1 // BETA 5.0 goes to RC , BETA 10.0 = RC 5.0 goes to V 1.0  */
/* Debugging and CHANGE LOG
 * 1.8 :: BugFix with search implementation
 
 * 1.9 :: 17:44 5.11.2010. 
	- Baloon/FieldConstructor contentEditable fix 
	- default display and hide events change to "mousenter" and "mouseleave". 
 
 * 2.0 :: 0:14 9.12.2010. :: 
	- inlineEditable :: added TAB && SHIFT TAB functionality to switch between cell's. 
	- added KEYEVENTS MAP BETA to track key states
	- added inlineEditable checking of update, no ajax update is called if value doesn't change :: bandwith_saving++ :-)
	
 * 2.1 :: 17:04 22.2.2011.
	- uniqueToggler :: added field constructor for radio button
	- Added "additional" param for updateField function, determines update context (e.g. preoperations...)
	- Modified $.fn.construct function :: added objectKeySuffix used for passing an INSTANCE ID for grouping objects in DATA GRID
	  such as radiobuttons (since the name determines the group)
	  
 * 2.2 :: 15:56 23.6.2011.
	- autoWidth :: fields marked with autoWidth make their cell stretched to content
	- label :: determines if a field displays like a label (e.g. for Property-Value pairs)
	- align :: determines alignment of field: align:{fieldName:alignType} where alignType is from ['left','center','right']
	- labelCheckbox :: boolean / determines if the CheckBox acts like label (gray bg)
	- purified and changed CSS : Font is Tahoma now
	- changed Dragger image
	- changed refresh and loading indicator image
	- changed order of status bar elements
	- new status bar text format
	- new scrollbar design
	- operations field and checkbox field both now have autoWidth property set
	- allowed entering a larger number than total record number into "View limit" field // still needs fixing (limit not consistent when adding data)
	- debugged inlineEditable span dimensions (annoying click only in text feature)
	
 */
 

/* 
KEY EVENTS MAP   jQuery extension 
Developed by Kristijan Burnik :: (c) 2010 :: http://www.invision-web.net/

jQuery Extensions:
	$.fn.keyboardBuffer
	$.fn.keymap
	$.fn.keydownmap
	$.fn.keyupmap
	$.iskeydown

DOM extensions
	document.usesBuffer
	document.buffer
	document.keynames
	document.keycodes
	element._kf  -- temporary function
*/
(function($) {
	$.fn.extend({
		keyboardBuffer:function(options) {
			var t=this[0];
			if (t.usesBuffer) return true;
			(function(t) {
				t.usesBuffer=true;
				t.buffer={};
				t.keynames={"8":"backspace", "9":"tab", "13":"enter", "16":"shift", "17":"ctrl", "18":"alt", "19":"pause", "20":"capslock", "27":"escape","32":"space", "33":"pageup", "34":"pagedown", "35":"end", "36":"home", "37":"leftarrow", "38":"uparrow", "39":"rightarrow", "40":"downarrow", "45":"insert", "46":"delete", "48":"0", "49":"1", "50":"2", "51":"3", "52":"4", "53":"5", "54":"6", "55":"7", "56":"8", "57":"9", "65":"a", "66":"b", "67":"c", "68":"d", "69":"e", "70":"f", "71":"g", "72":"h", "73":"i", "74":"j", "75":"k", "76":"l", "77":"m", "78":"n", "79":"o", "80":"p", "81":"q", "82":"r", "83":"s", "84":"t", "85":"u", "86":"v", "87":"w", "88":"x", "89":"y", "90":"z", "91":"leftwindowkey", "92":"rightwindowkey", "93":"selectkey", "96":"numpad0", "97":"numpad1", "98":"numpad2", "99":"numpad3", "100":"numpad4", "101":"numpad5", "102":"numpad6", "103":"numpad7", "104":"numpad8", "105":"numpad9", "106":"multiply", "107":"add", "109":"subtract", "110":"decimalpoint", "111":"divide", "112":"f1", "113":"f2", "114":"f3", "115":"f4", "116":"f5", "117":"f6", "118":"f7", "119":"f8", "120":"f9", "121":"f10", "122":"f11", "123":"f12", "144":"numlock", "145":"scrolllock", "186":"semi-colon", "187":"equalsign", "188":"comma", "189":"dash", "190":"period", "191":"forwardslash", "192":"graveaccent", "219":"openbracket", "220":"backslash", "221":"closebraket", "222":"singlequote"};
				t.keycodes={'backspace':8, 'tab':9, 'enter':13, 'shift':16, 'ctrl':17, 'alt':18, 'pause':19, 'capslock':20, 'escape':27, 'space':32,'pageup':33, 'pagedown':34, 'end':35, 'home':36, 'leftarrow':37, 'uparrow':38, 'rightarrow':39, 'downarrow':40, 'insert':45, 'delete':46, '0':48, '1':49, '2':50, '3':51, '4':52, '5':53, '6':54, '7':55, '8':56, '9':57, 'a':65, 'b':66, 'c':67, 'd':68, 'e':69, 'f':70, 'g':71, 'h':72, 'i':73, 'j':74, 'k':75, 'l':76, 'm':77, 'n':78, 'o':79, 'p':80, 'q':81, 'r':82, 's':83, 't':84, 'u':85, 'v':86, 'w':87, 'x':88, 'y':89, 'z':90, 'leftwindowkey':91, 'rightwindowkey':92, 'selectkey':93, 'numpad0':96, 'numpad1':97, 'numpad2':98, 'numpad3':99, 'numpad4':100, 'numpad5':101, 'numpad6':102, 'numpad7':103, 'numpad8':104, 'numpad9':105, 'multiply':106, 'add':107, 'subtract':109, 'decimalpoint':110, 'divide':111, 'f1':112, 'f2':113, 'f3':114, 'f4':115, 'f5':116, 'f6':117, 'f7':118, 'f8':119, 'f9':120, 'f10':121, 'f11':122, 'f12':123, 'numlock':144, 'scrolllock':145, 'semi-colon':186, 'equalsign':187, 'comma':188, 'dash':189, 'period':190, 'forwardslash':191, 'graveaccent':192, 'openbracket':219, 'backslash':220, 'closebraket':221, 'singlequote':222 };
				$(t).keydown(function(e){t.buffer[e.keyCode]=true;}).keyup(function(e){delete t.buffer[e.keyCode];});
			})(t);
		},
		keymap:function(e,map) {
			var r;
			var t = $(this)[0];
			var kc = e.keyCode;
			var kn = $(document)[0].keynames[kc];
			
			if (typeof (t._kf=map[kn]) == 'function') r = t._kf(e,kc,kn); 
			else if (typeof (t._kf=map['other']) == 'function') r = t._kf(e,kc,kn);
			else if (typeof (t._kf=map['any']) == 'function') r = t._kf(e,kc,kn);
			
			delete t._kf;
			return r;
		},
		keydownmap:function(map) {return $(this).keydown(function(e) {return $(this).keymap(e,map);});},
		keyupmap:function(map) {return $(this).keyup(function(e) {return $(this).keymap(e,map);});}
	});

	$.extend({
		iskeydown:function(key){
			var t=$(document)[0];
			if (typeof key == 'string') key = t.keycodes[key];
			return (typeof t.buffer[key] != 'undefined');
		}
	});

	$(function() {$(document).keyboardBuffer();});
})(jQuery);
// 
 
// implode @ PHP JS 
function implode (glue, pieces) { var i = '', retVal='', tGlue=''; if (arguments.length === 1) { pieces = glue; glue = '';} if (typeof(pieces) === 'object') { if (pieces instanceof Array) { return pieces.join(glue);} else { for (i in pieces) { retVal += tGlue + pieces[i]; tGlue = glue;} return retVal; } } else { return pieces; }}
// arraymerge @ PHP JS
function array_merge () {
    var args = Array.prototype.slice.call(arguments),retObj = {}, k, j = 0, i = 0, retArr = true;
    
    for (i=0; i < args.length; i++) {
        if (!(args[i] instanceof Array)) {
            retArr=false;
            break;
        }
    }
    
    if (retArr) {
        retArr = [];
        for (i=0; i < args.length; i++) {
            retArr = retArr.concat(args[i]);
        }
        return retArr;
    }
    var ct = 0;
    
    for (i=0, ct=0; i < args.length; i++) {
        if (args[i] instanceof Array) {
            for (j=0; j < args[i].length; j++) {
                retObj[ct++] = args[i][j];
            }
        } else {
            for (k in args[i]) {
                if (args[i].hasOwnProperty(k)) {
                    if (parseInt(k, 10)+'' === k) {
                        retObj[ct++] = args[i][k];
                    } else {
                        retObj[k] = args[i][k];
                    }
                }
            }
        }
    }
    return retObj;
}

// TO JSON functions
(function ($) { var m = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' }, s = { 'array': function (x) { var a = ['['], b, f, i, l = x.length, v; for (i = 0; i < l; i += 1) { v = x[i]; f = s[typeof v]; if (f) { v = f(v); if (typeof v == 'string') { if (b) { a[a.length] = ','; } a[a.length] = v; b = true; } } } a[a.length] = ']'; return a.join(''); }, 'boolean': function (x) { return String(x); }, 'null': function (x) { return "null"; }, 'number': function (x) { return isFinite(x) ? String(x) : 'null'; }, 'object': function (x) { if (x) { if (x instanceof Array) { return s.array(x); } var a = ['{'], b, f, i, v; for (i in x) { v = x[i]; f = s[typeof v]; if (f) { v = f(v); if (typeof v == 'string') { if (b) { a[a.length] = ','; } a.push(s.string(i), ':', v); b = true; } } } a[a.length] = '}'; return a.join(''); } return 'null'; }, 'string': function (x) { if (/["\\\x00-\x1f]/.test(x)) { x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) { var c = m[b]; if (c) { return c; } c = b.charCodeAt(); return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16); }); } return '"' + x + '"'; } };  $.toJSON = function(v) { var f = isNaN(v) ? s[typeof v] : s['number']; if (f) return f(v); };  $.parseJSON = function(v, safe) { if (safe === undefined) safe = $.parseJSON.safe; if (safe && !/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(v)) return undefined; return eval('('+v+')'); };  $.parseJSON.safe = false;  })(jQuery); 
// MOUSEWHEEL jQuery extenstion
(function(c){var a=["DOMMouseScroll","mousewheel"];c.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var d=a.length;d;){this.addEventListener(a[--d],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var d=a.length;d;){this.removeEventListener(a[--d],b,false)}}else{this.onmousewheel=null}}};c.fn.extend({mousewheel:function(d){return d?this.bind("mousewheel",d):this.trigger("mousewheel")},unmousewheel:function(d){return this.unbind("mousewheel",d)}});function b(f){var d=[].slice.call(arguments,1),g=0,e=true;f=c.event.fix(f||window.event);f.type="mousewheel";if(f.wheelDelta){g=f.wheelDelta/120}if(f.detail){g=-f.detail/3}d.unshift(f,g);return c.event.handle.apply(this,d)}})(jQuery);

// TOP Z-INDEX jQuery extension
(function(a){a.topZIndex=function(b){return Math.max(0,Math.max.apply(null,a.map(a(b||"body *"),function(d){return parseInt(a(d).css("z-index"))||null})))};a.fn.topZIndex=function(b){if(this.length===0){return this}b=a.extend({increment:1,selector:"body *"},b);var d=a.topZIndex(b.selector),c=b.increment;return this.each(function(){a(this).css("z-index",d+=c)})}})(jQuery);

// PHP JS functions
function utf8_encode ( argString ) {var string = (argString+''); var utftext = "";var start, end;var stringl = 0;start = end = 0;stringl = string.length;for (var n = 0; n < stringl; n++) {var c1 = string.charCodeAt(n);var enc = null;if (c1 < 128) {end++;} else if (c1 > 127 && c1 < 2048) {enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);} else {enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);}if (enc !== null) {if (end > start) {utftext += string.substring(start, end);}utftext += enc;start = end = n+1;}}if (end > start) {utftext += string.substring(start, string.length);}return utftext;}
function md5 (str) {var xl;var rotateLeft = function (lValue, iShiftBits) {return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));};var addUnsigned = function (lX,lY) {var lX4,lY4,lX8,lY8,lResult;lX8 = (lX & 0x80000000);lY8 = (lY & 0x80000000);lX4 = (lX & 0x40000000);lY4 = (lY & 0x40000000);lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);if (lX4 & lY4) {return (lResult ^ 0x80000000 ^ lX8 ^ lY8);}if (lX4 | lY4) {if (lResult & 0x40000000) {return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);} else {return (lResult ^ 0x40000000 ^ lX8 ^ lY8);}} else {return (lResult ^ lX8 ^ lY8);}};var _F = function (x,y,z) { return (x & y) | ((~x) & z); };var _G = function (x,y,z) { return (x & z) | (y & (~z)); };var _H = function (x,y,z) { return (x ^ y ^ z); };var _I = function (x,y,z) { return (y ^ (x | (~z))); };var _FF = function (a,b,c,d,x,s,ac) {a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));return addUnsigned(rotateLeft(a, s), b);};var _GG = function (a,b,c,d,x,s,ac) {a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));return addUnsigned(rotateLeft(a, s), b);};var _HH = function (a,b,c,d,x,s,ac) {a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));return addUnsigned(rotateLeft(a, s), b);};var _II = function (a,b,c,d,x,s,ac) {a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));return addUnsigned(rotateLeft(a, s), b);};var convertToWordArray = function (str) {var lWordCount;var lMessageLength = str.length;var lNumberOfWords_temp1=lMessageLength + 8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;var lNumberOfWords = (lNumberOfWords_temp2+1)*16;var lWordArray=new Array(lNumberOfWords-1);var lBytePosition = 0;var lByteCount = 0;while ( lByteCount < lMessageLength ) {lWordCount = (lByteCount-(lByteCount % 4))/4;lBytePosition = (lByteCount % 4)*8;lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}lWordCount = (lByteCount-(lByteCount % 4))/4;lBytePosition = (lByteCount % 4)*8;lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);lWordArray[lNumberOfWords-2] = lMessageLength<<3;lWordArray[lNumberOfWords-1] = lMessageLength>>>29;return lWordArray;};var wordToHex = function (lValue) {var wordToHexValue="",wordToHexValue_temp="",lByte,lCount;for (lCount = 0;lCount<=3;lCount++) {lByte = (lValue>>>(lCount*8)) & 255;wordToHexValue_temp = "0" + lByte.toString(16);wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length-2,2);}return wordToHexValue;};var x=[],k,AA,BB,CC,DD,a,b,c,d,S11=7, S12=12, S13=17, S14=22,S21=5, S22=9 , S23=14, S24=20,S31=4, S32=11, S33=16, S34=23,S41=6, S42=10, S43=15, S44=21;str = this.utf8_encode(str);x = convertToWordArray(str);a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;xl = x.length;for (k=0;k<xl;k+=16) {AA=a; BB=b; CC=c; DD=d;a=_FF(a,b,c,d,x[k+0], S11,0xD76AA478);d=_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);c=_FF(c,d,a,b,x[k+2], S13,0x242070DB);b=_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);a=_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);d=_FF(d,a,b,c,x[k+5], S12,0x4787C62A);c=_FF(c,d,a,b,x[k+6], S13,0xA8304613);b=_FF(b,c,d,a,x[k+7], S14,0xFD469501);a=_FF(a,b,c,d,x[k+8], S11,0x698098D8);d=_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);c=_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=_FF(a,b,c,d,x[k+12],S11,0x6B901122);d=_FF(d,a,b,c,x[k+13],S12,0xFD987193);c=_FF(c,d,a,b,x[k+14],S13,0xA679438E);b=_FF(b,c,d,a,x[k+15],S14,0x49B40821);a=_GG(a,b,c,d,x[k+1], S21,0xF61E2562);d=_GG(d,a,b,c,x[k+6], S22,0xC040B340);c=_GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);a=_GG(a,b,c,d,x[k+5], S21,0xD62F105D);d=_GG(d,a,b,c,x[k+10],S22,0x2441453);c=_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);a=_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);d=_GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);b=_GG(b,c,d,a,x[k+8], S24,0x455A14ED);a=_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);c=_GG(c,d,a,b,x[k+7], S23,0x676F02D9);b=_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);d=_HH(d,a,b,c,x[k+8], S32,0x8771F681);c=_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);d=_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);c=_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);b=_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);c=_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);b=_HH(b,c,d,a,x[k+6], S34,0x4881D05);a=_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);d=_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);a=_II(a,b,c,d,x[k+0], S41,0xF4292244);d=_II(d,a,b,c,x[k+7], S42,0x432AFF97);c=_II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=_II(b,c,d,a,x[k+5], S44,0xFC93A039);a=_II(a,b,c,d,x[k+12],S41,0x655B59C3);d=_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);c=_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=_II(b,c,d,a,x[k+1], S44,0x85845DD1);a=_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);d=_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=_II(c,d,a,b,x[k+6], S43,0xA3014314);b=_II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=_II(a,b,c,d,x[k+4], S41,0xF7537E82);d=_II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);b=_II(b,c,d,a,x[k+9], S44,0xEB86D391);a=addUnsigned(a,AA);b=addUnsigned(b,BB);c=addUnsigned(c,CC);d=addUnsigned(d,DD);}var temp = wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d);return temp.toLowerCase();}
function microtime (get_as_float) {var now = new Date().getTime() / 1000;var s = parseInt(now, 10);return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;}


// Auxiliary methods start here
var foreach = function(object,func) {
	for (x in object) {
		func(object[x],x);
	}
	return true;
}

if (typeof $.fn.construct == 'undefined') {
	$.fn.construct = function(object,constructor,objectKey,objectKeySuffix) {
		var $parent = $(this);
		var constructor = constructor;
		var objectKeySuffix = objectKeySuffix;
		
		if (typeof objectKeySuffix == 'undefined')  objectKeySuffix = ""  ;
				
		if (typeof constructor != 'function') {
			
			var constructor = function(data,key,objectKeySuffix) {
				return data;
			}
		}
		if (typeof object == "string") {
			$parent.append(constructor(object,objectKey,objectKeySuffix));
		} else {
			for (key in object) $parent.append(constructor(object[key],key,objectKeySuffix));
		}
		return $(this);
	}
}


$.fn.bindEvents = function(events) {
	if (typeof events == 'object' || events.length > 0) {
		
		
		for (var event in events) {
			var func = events[event];
			if (typeof func == 'function') $(this).bind(event,func);
		}
		
		
	}
	return $(this);
}

$.fn.unbindEvents = function(events) {
	if (typeof events == 'object' || events.length > 0) {
		for (var event in events) {
			var func = events[event];
			if (typeof func == 'function') $(this).unbind(event,func);
		}
	}
	return $(this);
}
$.fn.ifso = function(condition,func,else_func) {
	var func = func, condition = condition;
	if (condition) {
		$(this).each(func);
	} else if (typeof else_func == 'function') {
		$(this).each(else_func);
	}
	return $(this);
}

$.fn.overwrite = function(data) {
	for (x in data) {
		this[0][x] = data[x];
	}
	return this[0];
}

$.fn.pickout = function(fields) {
	var newobj = {};
	var objfields = {};
	var obj = this[0];
	
	for (x in fields) objfields[fields[x]] = true;
	for (x in obj) {
		if (objfields[x]) newobj[x] = obj[x];
	}	
	
	return newobj;
}


$.fn.ensureDefaults = function (defaults) {
	return $(defaults).overwrite(this[0]);
}

$.fn.run = function(func,directlyAsObject,args) {
	if (typeof func == "function") {
		if (directlyAsObject) {
			this[0].func = func;
			return this[0].func(args);
		} else {
			this.func = func;
			return this.func(args);
		}
	}	
}


$.fn.applyStripes = function() {
	var $table = $(this);
	$table.find("tr:even").removeClass("odd").addClass("even");
	$table.find("tr:odd").removeClass("even").addClass("odd");
}

$.fn.switchClass = function(oldClass,newClass) {
	return $(this).removeClass(oldClass).addClass(newClass);
}	

	
$.DATA_CACHE = {datacache:{},expires:100000};
$.cachedpost = function(url,vars,complete,type,expires,dontCache) {
	if (typeof $.DATA_CACHE.datacache == 'undefined') $.DATA_CACHE.datacache = {};
	
	if (typeof url == 'object') {
		if (url.clear) $.DATA_CACHE.datacache = {};
		$.DATA_CACHE.expires = url.expires;
	} else {
		if (typeof expires == "undefined" && expires !== 0) {
			expires = $.DATA_CACHE.expires;
		}
		
		var serVars = md5(url + $.toJSON(vars));
		
		if ((typeof $.DATA_CACHE.datacache[serVars] != 'undefined') && (!dontCache)) {
			complete($.DATA_CACHE.datacache[serVars]);
			return true;
		} else {
			$.post(url,vars,function(response) {
				complete(response);
				if (expires > 0) {
					$.DATA_CACHE.datacache[serVars] = response;
					setTimeout(function() {
						try	{delete $.DATA_CACHE.datacache[serVars];} catch(e) {};
					},expires);
				}
			},type)			
		}
		
	}
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

var DATA_GRID = function(options) {
	var options = options;
	
	if (!options) {
		return $('<table>').append($('<thead>')).append($('<tbody>'));
	}
	

	// INSTANCE ID CONTROL and ROW data and functions
	var INSTANCE = microtime(true)*1000;
	var gid = function(id) {
		return INSTANCE+'_'+id;
	}
	
	$.fn.setId = function(id) {
		$(this).attr("id",gid(id));
		return $(this);
	}
	
	$.fn.getId = function() {
		var id = $(this).attr("id").split("_");
		id.shift();
		return id.toString().replace(",","_"); 
	}
	
	var gridDATA = {};
	$.fn.setData = function(data) {
		$(this)[0].rowData = data;
		return $(this);
	}
	
	$.fn.getData = function() {
		return $(this)[0].rowData;
	}
	
	
	var fieldNAMES = {};
	$.fn.getFieldName = function() {
		return $(this)[0].fieldName;
	}
	
	$.fn.setFieldName = function(fieldName) {
		$(this)[0].fieldName=fieldName;
		return $(this);
	}
	
	
	
	$.fn.selectRow = function(onSelect) {
		var onSelect = onSelect;
		if ($(this).length>1) {
			$(this).each(function() { $(this).selectRow(onSelect);});
		} else {	
			var onSelect = onSelect;
			$(this).addClass("selected");
			$(this).find("input[type='checkbox']:first").attr("checked",true);
			$(this).run(onSelect);
		}
		return $(this);	
	}
	$.fn.deselectRow = function(onDeselect) {
		var onDeselect = onDeselect;
		if ($(this).length>1) {
			$(this).each(function() { $(this).deselectRow(onDeselect);});
		} else {		
			var onDeselect = onDeselect;
			$(this).removeClass("selected");
			$(this).find("input[type='checkbox']:first").attr("checked",false);
			$(this).run(onDeselect)
		}
		return $(this);	
	}
	/////////////////////////////////////////////////
	
	
	
	var getConstructorByFieldName = function(fieldName) {
		
		
		var cons = (fc[fieldName]) ?  fc[fieldName] : fc['default'];
		
		if (o.fieldActions[fieldName]) {			
			var fieldName = fieldName;
			return function(data) {
				var $a = $('<a>').append(cons(data)).addClass("field-action");
				
				if (typeof o.fieldActions[fieldName] == 'function') {
					var func = o.fieldActions[fieldName];
					$a.click(function() {
						$(this).parent().parent().run(func);
					}).attr({href:'javascript:'});
				} else {
					var url = o.fieldActions[fieldName]; 
					var data = c.currentRowData;
					for (x in data) url = url.replace('{'+x+'}',data[x]);
					$a.attr({href:url,target:'_blank'});
				}
				
				return $a;
				
			}
		} else {
			return cons;
		}
		
	}

	var getRecordIdFromRecordData = function(data) {
		if (data[o.identifier]) return data[o.identifier];
		for (x in data) return data[x];
	}
	
	var getHeaderFromData = function(data) {
		var h = {};
		for (x in data[0]) h[x] = x;
		return h;
	}
	
	var getIdsFromRecords = function () {
		var ids = [];
		$table.find("tbody tr").each(function() {
			ids.push($(this).getId());
		});
		return ids;
	}
	
	

	
	// shorthands
	
	
	var dragging = false;
	/////////////////////////////////////////////////
	var defaults = {
		reconstruct:false,
		existingGrid:{},
		selection:{},
		applyStripes:true,
		useHoverMarker:true,
		showHeader:true,
		isSelectable:true,
		isReordable:true,
		animDuration:300,
		hiddenFields:{},
		path:'./',
		imagesPath:'images/', 
		height:false,
		fieldActions:{},
		events: {
			onReorder:function(ids) {},
			onColumnClick:function(){},
			onSelect:function() {},
			onDeselect:function() {},
			onMouseOver:function() {},
			onMouseOut:function() {}
		},
		
		operations:{},		// json of operation name and functions respectively
		useOperations:true, // meaning use all provided operations
		operationImages:{}, // basename of image for each operation
		operationConstructor:function(opFunc,opName) {
			var opFunc = opFunc;
			if (typeof o.useOperations == 'object') {
				if (!o.useOperations[opName]) return false;
			}
			var $a = $('<a>').attr({href:'javascript:'}).addClass("operation").click(function() {
				$(this).parent().parent().run(opFunc);
			});
			
			if (o.operationImages[opName]) {
				$a.append($('<img>').attr({src:o.imagesPath+'/'+o.operationImages[opName],alt:opName,title:opName}));
			} else {
				$a.html(opName);
			}
			return  $a;
		},
		fieldConstructors:{}
	}
	
	////////////////////////////////////////////////////////////
	var options = $(defaults).overwrite(options);
	////////////////////////////////////////////////////////////
	var o = options;
	
	var maxAutoWidth = 0;
	
	if (typeof o.fieldConstructors['default'] == 'undefined') o.fieldConstructors['default'] = function(data) {return data;};
	
	var constructors = {
		table:function(header,data) {
			return $('<table>')
						.setId(INSTANCE)
						.append(c.thead(header))
						.append(c.tbody(data))
						.ifso(o.height != false,function() {
							$(this).css({height:o.height,overflow:'auto',display:'block'});
						})
			;
		},
		thead:function(header) {
			
			return $('<thead>')
						.append(c.thead_tr(header))
						.ifso(o.showHeader === false,function() {
							$(this).hide();
						})
			;
		},
		tbody:function(data) {
			
			return $('<tbody>')
						.construct(data,c.tr)
			;
		},			
		thead_tr:function(header) {
			
			return $('<tr>')
					.append(
						c.th('','_dragger').addClass("dragger").ifso(!o.isReordable,function() {
							$(this).hide();
						})
					)
					.append(
						c.th('','_checkbox').addClass("checkbox").ifso(!o.isSelectable,function() {
							$(this).hide();
						})
					)				
					.construct(header,c.th)
					.ifso(o.useOperations,function() {
						$(this).append(
							c.th('','oprations').ifso(typeof o.operations != 'object',function() {
								$(this).hide();
							})
						)
					})
			;
		},
		th:function(thData,thName) {
			return $("<th>")
						.setId(thName)
						.ifso(thData!='',function() {$(this).addClass('column');})
						.construct(thData)
						.bindEvents(e.column)
						.ifso(o.hiddenFields[thName],function() {
							$(this).hide();
						}).ifso(o.autoWidth[thName],function(){
							$(this).addClass("autowidth");
						}).ifso(o.align[thName],function(){
							$(this).css({'text-align':o.align[thName]});
						})
		},
		tr:function(trData,trName) {
			c.currentRowData = trData;
			rowIndex++;
			return $('<tr>')
						.setId(getRecordIdFromRecordData(trData))
						.setData(trData)
						.append(c.td_dragger(trData,trName))
						.append(c.td_checkbox(trData,trName))
						.construct(trData, c.td)
						.ifso(o.useOperations,function() { $(this).append(c.td_operations(trData,trName)); })
						.ifso(o.selection[getRecordIdFromRecordData(trData)],function() { $(this).selectRow(); })
						.bindEvents(e.tr)
			;
		},
		td:function(tdData,tdName) {
			return $('<td>')
						.setId(tdName + '-' +rowIndex)
						.setFieldName(tdName)
						.construct(tdData, getConstructorByFieldName(tdName),tdName,INSTANCE)
						.bindEvents(e.td)
						.ifso(o.hiddenFields[tdName],function() {
							$(this).hide();
						})
						.ifso(o.autoWidth[tdName],function(){
							$(this).addClass("autowidth");
						})
						.ifso(o.align[tdName],function(){
							$(this).css({'text-align':o.align[tdName]});
						})
						.ifso(o.labels[tdName],function(){
							$(this).addClass("label");
						})
			;
		},
		td_checkbox:function(trData,trName) {
			return $('<td>')
						.addClass("checkbox")
						.append(c.checkbox(trData,trName))
						.ifso(o.labelCheckbox,function() {
							$(this).addClass("label");
						})
						.ifso(!o.isSelectable,function() {
							$(this).hide();
						})
			;
		},
		checkbox:function(trData,trName) {
			return $('<input>')
						.attr({type:'checkbox'})
						.setId(getRecordIdFromRecordData(trData))
						.bindEvents(e.checkbox)
			;
		},
		td_dragger:function(trData,trName) {
			return $('<td>')
						.ifso(!o.isReordable,function() {
							$(this).hide();
						})
						.addClass("dragger")
						.bindEvents(e.dragger)
						
			;
		},
		td_operations:function(trData,trName) {
			return $('<td>')
						.ifso(typeof o.operations != 'object',function() {
							$(this).hide();
						})
						.addClass("operations")
						.construct(o.operations,o.operationConstructor)
						.attr({nowrap:'nowrap','width':'1%'})
			;		
		}
	}
	
	var events = {
		th:{
		
		},
		tr:{
			mouseover:function() {
				if (!dragging && o.useHoverMarker) $(this).addClass("hover");
				$(this).run(o.events.onMouseOver);
			},
			mouseout:function() {
				if (o.useHoverMarker) $(this).removeClass("hover");
				$(this).run(o.events.onMouseOut);
			}
		},
		td:{
		
		},
		checkbox:{
			click:function() {
				var $tr = $(this).parent().parent();
				if ($(this).attr("checked")) {
					$tr.selectRow(o.events.onSelect);
				} else {
					$tr.deselectRow(o.events.onDeselect);
				}
			}
		},
		dragger:{
			mousedown:function() {
				dragging = true;
				var $tr = $(this).parent();
				var $tbody_tr = $tr.siblings();
				
				var tbody_trMM = function(e) {
					if (dragging) {
						var height = $(this).height();
						var pos = e.clientY-$(this).offset().top;
						if (pos < height/2) {
							$tr.insertBefore($(this));
						} else {
							$tr.insertAfter($(this));
						}
						return false;
					}
				}
				
				$tbody_tr.bind("mousemove",tbody_trMM);

				
				$tr.fadeTo(o.animDuration,0.3);
				
				var onReorder  = o.events.onReorder;
				var docMU = function() {
					$tr.fadeTo(o.animDuration,1);
					$(this).unbind("mouseup",docMU);
					$tbody_tr.unbind("mousemove",tbody_trMM);
					
					if (o.applyStripes) $table.applyStripes();
					if (typeof onReorder == 'function') onReorder(getIdsFromRecords());
					dragging = false;
				}
				
				$(document).bind("mouseup",docMU);
				
				return false;
			}
		},
		column:{
			click:function() {				
				$(this).run(o.events.onColumnClick);
			},
			mouseover:function() {
				$(this).addClass("hover");
			},
			mouseout:function() {
				$(this).removeClass("hover");
			}
			
		}
	}

	var c = constructors;
	var fc = o.fieldConstructors;
	var e = events;

	var rowIndex = 0;
	if (o.data) {
		var plainHeader = getHeaderFromData(o.data);
		var fancyHeader = o.header;
		
		o.header = $(plainHeader).overwrite(fancyHeader);
	}
	
	
	
	var haveData  = false;
	if (o.reconstruct) {
		

		$table = o.existingGrid;
		
		
		
		var $tbody = $table.find("tbody");
		$tbody.children().remove();
		
		var $thead = $table.find("thead");
		$thead.children().remove();
			
		
		if (typeof o.data == 'string') {
			haveData = false;
			$tbody.append($('<tr>').append($('<td>').addClass("nodata").html(o.data)));
		} else {
			$thead.append(c.thead_tr(o.header));
			haveData = true;
			$tbody.construct(o.data,c.tr);
		}
		
	} else {
		$table = c.table(o.header,o.data);
	}
	
	if (o.applyStripes && haveData) $table.applyStripes();
	
	if (typeof o.autoWidth == 'object') {
		var setAutoWidth = function(){
				$table.find(".autowidth").attr({"width":'1%','nowrap':'nowrap'});
		};
		
		$(setAutoWidth);
		
	};
	return $table;
	
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

var DATA_CHANNEL = function(options) {
	var defaults = {
		readAll:false,
		enforceLimitLength:false,
		cacheExpires:100000,
		serverScript:'dataviewer/dataviewer.php',
		requestDefaults:{
			action:'view',
			query:'',
			fields:'*',
			start:0,
			limit:20,
			currentLimit:20,
			order:'',
			filter:''
		},
		autoLoad:true,
		onSendRequest:function(){
			
		},
		onDataReady:function(data,count,start,limit,currentLimit){ 
			
		},
		onLoad:function(data,count,start,limit,currentLimit) {
		
		},
		onUpdate:function(data) {
		
		},
		onInsert:function(data) {
		
		},
		clearCacheOnUpdate:true,
		refreshOnUpdate:true
	}
	

	////////////////////////////////////////////////////////////
	var options = $(defaults).overwrite(options);
	////////////////////////////////////////////////////////////
	
	
	// shorthands
	var o = options;
	var r = o.request;
	
	r.currentLimit = r.limit;
	
	var ensureBounded = function(number,min,max) {
		if (number<min) return min;
		if (number>max) return max;
		return number;
	}
	
	var initRequest = o.request;
	
	
	
	// main stuff
	var t = {
		data:[],
		count:0,
		
		initRequest:initRequest,
		options:options,
		
		// com
		sendRequest:function(onComplete,dontCache) {
			var url = o.serverScript;
			
			if (o.request['url']) url = o.request['url'];
			
			// ensure defaults for request.
			var	requestVars = $(o.requestDefaults).overwrite(r);
			
			r = requestVars;
			
			o.onSendRequest(t.data,t.getCount(),t.getStart(),t.getLimit());
			
			if (o.readAll) {
				delete requestVars.start;
				delete requestVars.limit;
			}
			
			
			
			$.cachedpost(url,requestVars,function(response) {
				if (typeof response != 'object' || response.error) {
					alert("Cannot get data from server!");
					return false;
				}
				t.data = response.data;
				t.count = response.count;
				
				if (o.readAll) t.setLimit(r.count);
				
				t.setCurrentLimit( (typeof response.data == 'object') ? response.data.length : 0 );
				
				// console.log(requestVars.query,t.getCurrentLimit(),t.data);
				o.onDataReady(t.data,t.getCount(),t.getStart(),t.getLimit(),t.getCurrentLimit());
				if (typeof onComplete == 'function') {
					onComplete(t.data,t.getCount(),t.getStart(),t.getLimit(),t.getCurrentLimit());
				}
				return true;
			},'json',o.cacheExpires,dontCache);
		},
		sendUpdate:function(updateRequest,refresh) {
			var refresh = refresh;
			var url = o.serverScript;
			if (o.request['url']) url = o.request['url'];
			if (o.request) updateRequest.query = o.request.query;
			
			$.post(url,updateRequest,function(response) {
				o.onUpdate(response);
				if (o.clearCacheOnUpdate) $.cachedpost({clear:true});
				if ((typeof refresh != 'undefined') && refresh) if (o.refreshOnUpdate) t.sendRequest(false,true);
			},'json');
			
		},
		sendInsert:function(insertRequest,refresh) {
			var refresh = refresh;
			var url = o.serverScript;
			if (o.request['url']) url = o.request['url'];
			
			if (!insertRequest.action) insertRequest.action='insert';
			// flatten inserts subobject for sending;
			if (insertRequest.inserts) {
				for (x in insertRequest.inserts) insertRequest['inserts['+x+']'] = insertRequest.inserts[x];
				delete insertRequest.inserts;
			}
			if (o.request) insertRequest.query = o.request.query;
			
			$.post(url,insertRequest,function(response) {
				o.onInsert(response);
				if (o.clearCacheOnUpdate) $.cachedpost({clear:true});
				if ((typeof refresh == 'function' || refresh == true)) {
					t.sendRequest(refresh,true);
				}
			},'json');
		},
		modifyRequest:function(modifiedRequest,sendAfterModify) {
			for (x in modifiedRequest) {
				r[x] = o.request[x] = modifiedRequest[x];
			}
			if (sendAfterModify) t.sendRequest(false,true);
		},
		setRequest:function(newRequest) {
			var newRequest = newRequest;
			delete o.request;
			o.request = {};
			for (x in newRequest) {
				o.request[x] = newRequest[x];
			}
		},
	
		// navigation
		readNext:function() {
			t.skipTo(r.start + r.limit);
		},
		readPrev:function() {
			t.skipTo(r.start - r.limit);
		},
		skipTo:function(start) {
			r.start = Math.round(ensureBounded(start,0,t.getMaxStart()));
			t.sendRequest();
		},
		read:function(from,limit) {
			if (from == r.start && limit == r.limit) return false;
			if (typeof from != 'undefined') { 
				if (limit > 0) t.setCurrentLimit(limit);
					
				t.skipTo(from);
			} else {
				t.readNext();
			}
		},
		readAll:function() {
			if (confirm("You're about to read all "+t.count+" records. This may cause problems in performance when large data gets collected. Do you want to continue?")) t.read(0,t.count);			
		},
		reset:function() {
			o.request = initRequest;
			t.read(0,r.limit);
		},
		refresh:function() {
			t.sendRequest(false,true)
		},
		setLimit:function(newLimit) {
			if (newLimit < 1) newLimit = 1;
			o.request.limit = r.limit = newLimit;
		},
		setCurrentLimit:function(newLimit) {
			// if (newLimit < 1) newLimit = 1;
			o.request.currentLimit = r.currentLimit = newLimit;
		},
		
		
		// range
		getCount:function() {
			return t.count;
		},
		getStart:function() {
			return r.start;
		},
		getLimit:function() {
			return r.limit;
		},
		getCurrentLimit:function() {
			return r.currentLimit;
		},
		getEnd:function() {
			return r.start+r.limit-1;
		},
		getMaxStart:function() {
			return (o.enforceLimitLength) ? (t.count-r.limit) : (t.count-1);
		},
		isAllRead:function() {
			return (r.limit >= t.count);
		},
		getFields:function(){
			var fields = [];
			if (t.data) {
				if (t.data[0])
				for (var field in t.data[0]) {
					fields.push(field);
				}
			}
			return fields;
		},
		// construct
		construct:function() {
			
			if (o.autoLoad) this.sendRequest(o.onLoad);
			
			//if (o.readAll) 
			return this;
		}
	};
	
	
	t.construct();
	return t;
}


var SCROLLBAR = function(parent,options) {
	
	var defaults = {
		type:'horizontal',
		length:1000,
		limit:10,
		start:0,
		hideWhenFull:true,
		onScroll:function(start,limit,length) {
		
		},
		onScrollEnd:function(start,limit,length) {

		}
	}
	
	////////////////////////////////////////////////////////////////////
	var o = defaults;
	for (x in options) o[x] = options[x];
	var options = o;
	////////////////////////////////////////////////////////////////////
	
	$parent = $(parent);
	
	// create DOM
	//var $prev = $('<a>').addClass("prev");
	var $bar = $('<span>').addClass("bar");
	var $scroller = $('<span>').addClass("scroller");
	//var $next = $('<a>').addClass("next");
	var $status = $('<span>').addClass("scrollstatus");
	
	// $parent.append($prev);
	$parent.append($bar.append($scroller).append($status));
	//	$parent.append($next);
	
	var barInitWidth = $bar.width();
	
	var e =	{
			scrolling:false,
			jumping:false
	}
	var resolution;
	
	var cancelScrollingEvent = false ;
	
	var scroll = function(inc,slide) {
		lastScrollMicroTime = microtime(true)*1000;
		
		if (inc) o.start += inc;
		//if (o.start > Math.floor(o.length/o.limit)*o.limit) o.start = o.length;
		if (o.start < 0) o.start = 0;
		if (o.start > (o.length-o.limit)) {o.start = o.length-o.limit;}
		//if ()
		
		
		var resolution = getResolution();
		var x = o.start * resolution;
		
		
		if (x+$scroller.width() > $bar.width()) x = $bar.width() - $scroller.width();
		
		if (x >= 0 ){
			var left = Math.round(x)+'px';
		} else {
			var left = '0px';
		}
		
		$scroller.css({left:left});
		
		o.onScroll(o.start,o.limit,o.length);
		showScrollStatus();	
	
	}
	
	var jump = function(inc) {
		var inc = inc;
		if (e.jumping) {
			scroll(inc);
			setTimeout(function() {jump(inc)},200);
		}
	}
	
	var getResolution = function() {
		var width = $bar.width();
		
		var length = o.length;
		if (length==0) return 0;
		
		var res = width/length;
		
		
		//if (res<1) res=1;
		return res;
	}
	
	
	var showScrollStatus = function() {

		var left = o.start*getResolution();
		left = (left > 0) ? left : 0;
		
		$status.css({left:left+'px'});
		$status.show().html(o.start+1+' to '+(o.start+o.limit) + ' of ' + o.length);
		
		scheduleHideScrollStatus();
	}
	
	
	var scheduleHideScrollStatus = function() {
		
		setTimeout(function() {
			if ((microtime(true)*1000 - lastScrollMicroTime) > 1000 && !e.scrolling) {
				$status.fadeOut(300);
			} else {
				scheduleHideScrollStatus();
			}
			
		},700);
		
	}
	
	
	$scroller
	.mouseover(function() {
		$scroller.stop().fadeTo(300,0.7);
	})
	.mouseout(function() {
		$scroller.stop().fadeTo(300,1);
	})
	.mousedown(function(event) {
		var startX =  event.clientX - $(this).offset().left;
		e.scrolling = true;
		$(document).mousemove(function(event) {
			if (e.scrolling)  {
				resolution = getResolution();
				var x = event.clientX-$bar.offset().left-startX;
				if (x < 0) x = 0;
				if (x + $scroller.width() <= $bar.width() ) {
					o.start = Math.round(x/resolution);
				} else {
					if (o.start+o.limit < o.length) o.start++;
				}
				scroll();
			}			
		}).mouseup(function() {	
			if (e.scrolling) {
				o.onScrollEnd(o.start,o.limit,o.length);
			} 
			
			e.scrolling = false;
		
		});
		return false;
	})
	
	
	$bar.mousedown(function(event) {
		relX = event.clientX;
		
		e.jumping = true;
		if (relX > $scroller.offset().left+$scroller.width()) jump(o.limit);
		if (relX < $scroller.offset().left)	jump(-o.limit);
		$(document).mouseup(function(){
			if (e.jumping) {
				o.onScrollEnd(o.start,o.limit,o.length);
				e.jumping = false;
			}
		});
	});
	
	
	
	
	var t = {
		bar:$bar,
		scroller:$scroller,
		setup:function(start,limit,length) { 
			o.start = start;
			o.limit = limit;
			o.length = length;
			
			if (o.length < o.limit) o.limit = o.length;
			
			var limit = o.limit;
			var length = o.length;
			
			var width = (length>0) ?  Math.round((o.limit/o.length)*100) : 0;
			
		
			scroll();
			width = (width>0) ? width : 0;
			$scroller.css({width:width+'%'});		
		
			var barWidth = barInitWidth-2;
			if (barWidth>0) $bar.css({width:barWidth+'px'});
		
		
			if (o.hideWhenFull && limit >= length) {$bar.hide();} else {$bar.show();}
			
			
			return this;
		},
		hideStatus:function() {
			$status.fadeOut(300);
		}
	}
	
	
	t.setup(o.start,o.limit,o.length);
	
	return t;
}



$.fn.scrollbar = function(options) {
	var options = options;
	if ($(this).length == 1) {
		if (this[0].scrollbar) {
			return this[0].scrollbar;
		} else {
			this[0].scrollbar = new SCROLLBAR(this,options);
			return this[0].scrollbar;
		}
	}
	$(this).each(function() {
		
		this.scrollbar = new SCROLLBAR(this,options);
		
	});
	
}

var COLUMN_SORTER = function(parent,options) {
	var parent = parent;
	var $parent = $(parent);
	var options = options;
	
	if (typeof parent.column_sorter != 'undefined') return parent.column_sorter;
	
	var defaults = {
		sortStatus:{},		
		allowMultiple:true,
		implode:true,
		ascClass:"asc",
		descClass:"desc",
		ascKeyword: "asc",
		descKeyword: "desc",
		columnClass: ".column",
		onChange:function(status) {
			
		}
	}
	
	
	//////////////////////////////////////////////////////////////
	options = $(defaults).overwrite(options);
	//////////////////////////////////////////////////////////////
	
	
	var o = options;
	var t = {}; // reserve object
	
	var classByKeyword = {};
	classByKeyword[o.ascKeyword] = o.ascClass;
	classByKeyword[o.descKeyword] = o.descClass;
	
	
	var docEvents = {
		keydown:function(e) {
			if (e.keyCode == 17) t.cancelMode = true;
			if (e.keyCode == 16 && o.allowMultiple) {
				t.multipleSort = true;
			}
		},	
		keyup:function(e) {
			if (e.keyCode == 17) t.cancelMode = false;
			if (e.keyCode == 16 && o.allowMultiple) {
				t.multipleSort = false;
			}	
		}
	}
	
	$(document).bindEvents(docEvents);
	
	$parent.find("th"+o.columnClass).each(function() {
		$(this).click(function() {
			
			var id = $(this).getId();
			
			if (t.cancelMode) {
				$(this).removeClass(o.ascClass).removeClass(o.descClass);
				delete o.sortStatus[id];
			} else {
				if (!t.multipleSort) {
					$(this).siblings().removeClass(o.ascClass).removeClass(o.descClass);
					o.sortStatus = {};
				}
				
	 			var order = '';
				if ($(this).hasClass(o.descClass)) {
					$(this).switchClass(o.descClass,o.ascClass);
					order = o.ascKeyword;
				} else if ($(this).hasClass(o.ascClass)) {
					$(this).switchClass(o.ascClass,o.descClass);
					order = o.descKeyword;
				} else {
					$(this).addClass(o.ascClass);
					order = o.ascKeyword;
				}
				o.sortStatus[id] = order;
			}
			
			o.onChange(t.getSortStatus());
			
		}).mousedown(function(){
			if (t.multipleSort || t.cancelMode) return false; // prevent cell selection by browser
		})
	
	});
	
	
	t = {
		cancelMode:false,
		multipleSort:false,
		$parent:$parent,
		setSortStatus:function() {
			var s = o.sortStatus;
			$parent.find("th"+o.columnClass).each(function() {
				$(this).removeClass(o.ascClass).removeClass(o.descClass);
				var id = $(this).getId();
				if (typeof o.sortStatus[id] == 'string') {
					$(this).addClass(classByKeyword[s[id]]);
				}
			});
			
		},
		getSortStatus:function() {
			var status = o.sortStatus;
			return status;
		},
		reset:function() {
			t.$parent.find("th").removeClass(o.ascClass).removeClass(o.descClass);
		}
	}
	
	
	// set inital sortstatus
	if (typeof o.sortStatus == 'undefined') o.sortStatus = {};
	t.setSortStatus();
	
	return parent.column_sorter = t;
}

$.fn.columnSorter  = function (options) {
	var options = options;
	
	
	if (this.length == 1) return new COLUMN_SORTER(this,options);
	
	$(this).each(function(){
		COLUMN_SORTER(this,options);
	});
	
	
	
	return $(this);
}

var DATA_VIEWER = function(parent,options,userDefaults) {
	var options = options;
	var parent = parent;
	var $parent = $(parent);
	
	var t = {};
	
	var defaults = {
		defaultRequest:{
			url:'',
			filter:'',
			query:'table',
			fields:'*',
			start:0,
			limit:20,
			order:''
		},
		data:{},
		views:{},
		defaultView:'', // if not determined, first view is default
		height:false,
		cacheExpires:0,
		path:'dataviewer',
		imagesPath:'dataviewer/images',
		useOperations:true,
		operationImages:{}, // key is opName and value is basename to image
		showHeader:true,
		autoWidth:{}, // header columns that have autowidth (snap to content)
		align:{},
		labels:{},
		labelCheckbox:false,
		request: {},
		defaultRequest:{},
		fieldActions:{},
		hiddenFields:{},
		isSelectable:true,
		isReordable:true,
		useScrollbar:true,
		animDuration:300,
		useKeys:true,
		useMouseWheel:true,
		applyStripes:true,
		useHoverMarker:true,
		showRefresh:true,
		showStatusBar:true,
		displayAll:false, // determines dynamic limit for data // all rows get displayed
		useSearch:false,
		search:"*",
		searchOperand:'or',
		searchWordOperand:'or',
		searchMethod:'like',
		searchPrefix:'%',
		searchSufix:'%',
		defaultSearchText:"Search",
		buttons:{},
		events: {
			onReorder:function(ids) {
				if (o.isReordable) {
					t.datachannel.sendInsert({action:'reorder',inserts:ids});
				}
			},
			onColumnClick:function(){},
			onSelect:function() {
				var id = $(this).getId();
				t.selection[id] = $(this).getData();
			},
			onDeselect:function() {
				var id = $(this).getId();
				delete t.selection[id];
			},
			onMouseOver:function() {},
			onMouseOut:function() {}
		},
		fieldConstructors:{
			'content':function(data) {
				return data.substring(0,50)+'...';
			},
			'image':function(data) {
				return $('<img>').attr({src:data});
			}
		},
		operations:{} // record operations such as edit and remove
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (typeof userDefaults == 'object') defaults = $(defaults).overwrite(userDefaults);
	///////////////////////////////////////////////////////////////
	options = $(defaults).overwrite(options);
	///////////////////////////////////////////////////////////////
	
	var initRequest = {};
	
	for (x in options.request) {
		initRequest[x] = options.request[x];
	}
	
	var constructors = {
		search:function() {
			if (o.useSearch) {
				var initFilter = o.request.filter;
				
				var $search = $("<div>").addClass("search-container");
				
				var $search_input = $("<input>");
				$search_input.attr({type:"text"});
				$search_input.addClass("search-input");
				
				var $search_go = $("<a>").addClass("search-go");
				$search_go.attr({href:"javascript:"});
				$search_go.bind("click",function() {
					 var searchValue = $search_input.val();
					 var searchQuery = [];
					 
					 if (t.$filters.length>0) {
						t.$filters.find("select").each(function() {
							$(this).val($(this).find("option:first").val());
						});
					 }
					 
					 var request = {filter:initFilter};
					 
					 if (searchValue!='' && searchValue != o.defaultSearchText) {
					 	searchValue = searchValue.replace("\\","");
						searchValue = searchValue.replace("''","''");
					 
						var searchFields = o.search;
						if (searchFields == '*') {
							var searchFields = dc.getFields();
						}
						
						var searchWords = searchValue.split(" ");
						
						
						for (var x in searchFields) {
							var searchSubQuery = [];
							for (var y in searchWords) {
								var searchWord = searchWords[y];
								searchSubQuery.push("( `"+searchFields[x]+"`" + " " + o.searchMethod + " '" + o.searchPrefix + searchWord + o.searchSufix+"' )");
							}
							searchSubQuery = implode(" "+o.searchWordOperand+" ",searchSubQuery );
							searchQuery.push(searchSubQuery);
						}
						 
						var filter = implode(' '+o.searchOperand+' ',searchQuery);
						 
						 // keep init filter context
						 if (initFilter != '' && typeof initFilter != 'undefined') {
							filter = "( " + initFilter + ") and ( " + filter + " )";
						 }
						// modified request for search
					    request = { filter:filter };
					}
					dc.reset();
					t.sortStatus={};					
					dc.modifyRequest(initRequest);
					dc.modifyRequest(request,true);
					
					$(this).blur();
				});
				
				$search_input.val(o.defaultSearchText);
	
				$search_input.focus(function(){
					if ($(this).val()==o.defaultSearchText) {
						$(this).val("");
					}
					$(this).addClass("focused");
				}).blur(function() {
					var val = $(this).val();
					if (val == "") {
						$(this).removeClass("focused").val(o.defaultSearchText);
						// restore rows
						t.$grid.find("tbody tr").show();
					}
				}).keydown(function(e) {
					var $trs = t.$grid.find("tbody tr");
					if (e.keyCode == 13) {
						$search_go.click();
						return false;
					} else if (e.keyCode == 27) {
						$trs.show();
						$(this).val("");
						$(this).blur();
						return false;
					}
					
					var matchText = $(this).val().toLowerCase();
					
					if (matchText=='' || matchText.length<3 || matchText == o.defaultSearchText) {
						//$trs.removeClass("highlighted");
						$trs.show();
					} else {
						$trs.each(function() {
							if ($(this).html().toLowerCase().match(matchText)) {
								//$(this).addClass("highlighted");
								$(this).show();
							} else {
								//$(this).removeClass("highlighted");
								$(this).hide();
							}
						})
					}
					
				
					
					
				});
				
				$search.append($search_input).append($search_go);
			} else {
				$search = "";
			}
			
			return t.$search = $search;
		},
		filters:function() {
			var createSelect = function(name,options,onChange) {
				var createOptions = function($parent,options) {
					for (var x in options) {
						var $option = $("<option>").attr({value:options[x].id});
						$option.html(options[x].name);
						$parent.append($option);
					}
				}
				$select = $('<select>').attr("name",name);
				createOptions($select,options);
				$select.change(onChange);
				return $select;
			}
			
			if (o.filters) {
				t.$filters = $('<div>').addClass("filters");
				for (var field in o.filters) {
					var $label = $('<label>').html(o.filters[field].label+': ');
					var $select = createSelect(field,o.filters[field].data,function() {
						if (t.$search.length>0) {
							var $search_input = t.$search.find(".search-input");
							$search_input.val("");
							$search_input.blur();
						}
						var field = $(this).attr("name");
						var id = $(this).val();
						
						if (id!='*') {
							t.currentFilters[field] = id;
						} else {
							delete t.currentFilters[field];
						}
						
						var filter=[];
						for (var x in t.currentFilters) filter.push("`"+x+"`='"+t.currentFilters[x]+"'");
						if (filter.length>0) {
							filter = implode(" and ",filter);
						} else {
							filter = '';
						}
						var request = {filter:filter};

						dc.reset();
						t.sortStatus={};					
						dc.modifyRequest(initRequest);
						dc.modifyRequest(request,true);

						
						$(this).blur();
					});
					t.$filters.append($label).append($select);
				}
				
			} else {
				t.$filters = "";
			}
			
			return t.$filters;
			
		},
		views:function() {
			if (o.views) {
				
				t.$views = $('<div>').addClass("views");
				var defaultViewIsSet = false;
				
				t.$views.construct(o.views,function(request,view){
					var view = view;
					var request = request;
					var $a = $('<a>').click(function() {
						$(this).siblings().removeClass("current");
						$(this).addClass("current");
						dc.reset();
						t.sortStatus={};
						dc.modifyRequest(initRequest);
						dc.modifyRequest(request,true);
						
						$(this).blur();
					} ).attr({href:'javascript:'}).html(view);
					
					if (view == o.defaultView) { 
						$a.addClass("current");
						defaultViewIsSet = true;
					}
					return $a;
				});
				
				if (!defaultViewIsSet) t.$views.find("a:first").addClass("current");
					
				
				return t.$views;
			} else {
				return  "";
			}
		},
		dataContainer:function() {
			return t.$datacontainer = $('<div>').addClass("data-container");
		},
		scrollbar:function() {
			var $div = $('<div>').addClass("scrollbar");
			t.$scrollbarDiv = $div;
			t.$scrollbar = $div.scrollbar({
				onScrollEnd:function(start,limit,length) {
					dc.skipTo(start);
				}
			});
			
			
			
			if (!o.useScrollbar) $div.hide();
			
			return $div;
		},
		refreshButton:function() {
			return $('<a>').addClass("refresh").attr({href:'javascript:'}).click(function() {
				dc.refresh();
			}).ifso(!o.showRefresh,function() {$(this).hide();});
		},
		prev:function() {
			var $prev = $('<a>').attr({href:'javascript:',title:"Previous"}).addClass("prev"); $prev.html("&nbsp;");
			
			$prev.click(function() {
				dc.readPrev();
			});
			
			
			var $span = $('<span>');
			$span.append($prev);
			t.$prev = $prev;
			if (!o.showStatusBar) $span.hide();
			return $span;
		},
		statusBar:function() {
			var $statusbar = $('<span>');
			
			$statusbar.addClass("status_pane").addClass("viewing-scope").ifso(!o.showStatusBar,function() {$(this).hide();});
			t.$statusbar = $statusbar;
			
			return $statusbar;
		},
		next:function() {
			var $next = $('<a>').attr({href:'javascript:',title:"Next"}).addClass("next"); $next.html("&nbsp;");
			
			
			$next.click(function() {
				dc.readNext();
			});
			
			var $span = $('<span>');
			$span.append($next);
			t.$next = $next;
			if (!o.showStatusBar) $span.hide();
			return $span;
		},
		skipto:function() {
			t.$skipto = $('<input>')
						.attr({type:'text',size:3})
						.addClass("")
						.keydown(function(e) {
							if (e.keyCode == 13) {
								var val = $(this).val()*1;
								var count = dc.getCount();
								if (typeof val != 'number' || !val || val < 1 || val > count) {
									alert("Please enter a number between 1 and " + count);
									$(this).select();
									return false;
								} else {
									dc.skipTo(val-1);
								}
							}
						})
						;
			return $('<span>').addClass("status_pane").append($("<label>").html("Skip to:")).append(t.$skipto).ifso(!o.showStatusBar,function() {$(this).hide();});
		},
		recordsperview:function() {
			t.$recordsperview = $('<input>')
						.attr({type:'text',size:3})
						.addClass("")
						.keydown(function(e) {
							if (e.keyCode == 13) {
								var val = $(this).val()*1;
								var count = dc.getCount();
								if (typeof val != 'number' || !val || val < 1) {
									alert("Please enter a number between 1 and " + count);
									$(this).select();
									return false;
								} else {
									if (val > count) val = count;
									dc.setLimit(val);
									dc.refresh();
								}
							}
						})
						;
			return $('<span>').addClass("status_pane").append($('<span>').html("View limit:")).append(t.$recordsperview).ifso(!o.showStatusBar,function() {$(this).hide();})
		},
		
		useScrolling:function() {
			var chk_id = microtime(true)*1000;
			var $chk = $('<input>').attr({type:'checkbox',id:chk_id,checked:o.useMouseWheel}).click(function() {
				o.useMouseWheel = $(this).attr("checked");
			});
			var $lbl = $('<label>').attr({'for':chk_id});
			$lbl.html("Enable scrolling");
			return $('<span>').addClass("status_pane").append($chk).append($lbl).ifso(!o.showStatusBar,function() {$(this).hide();});
		},
		
		buttons:function() {
			if (o.buttons) {
				t.$buttons = $('<div>').addClass("views");
				t.$buttons.construct(o.buttons,function(onClick,title){
					// t.buttonFunctions[title]
					var onClick	= onClick;
					var title = title;
					var $a = $('<a>').click(function() {
						
						$(t).run(onClick,true);
						
						$(this).blur();
					} ).attr({href:'javascript:'}).html(title);
					
					return $a;
				});
				

				
				return t.$buttons;
			} else {
				return "";
			}
		}
	}

	
	var events = {
	
	}

	var keyNavigation = function(e) {
		if (dc.isAllRead() || !$.DATAVIEWER_GLOBAL_OPTIONS.eventsEnabled) return true;
		
			switch (e.keyCode) {
				case 38:
					dc.read(dc.getStart()-1,dc.getLimit());
					return false;
				break;
				case 40:
					dc.read(dc.getStart()+1,dc.getLimit());
					return false;
				break;
				case 37: 
					dc.readPrev();
					return false;
				break;
				case 39: 
					dc.readNext();
					return false;
				break;
				
			}
	}
	
	
	var scrollNavigation = function(event, delta) {
		if (!dc.isAllRead() && o.useMouseWheel && $.DATAVIEWER_GLOBAL_OPTIONS.eventsEnabled) {
			dc.read(dc.getStart()-delta,dc.getLimit());
			return false;
		}
	}
	
	var columnSorterOptions = {
		sortStatus:{}, // t.sortStatus,
		onChange:function(status) {
			t.sortStatus = status;
			
			var statusAsString = [];
			for (x in status) {
				statusAsString.push(x + ' ' + status[x]);
			}					
			statusAsString = statusAsString.toString();
			
			if (o.request.order != statusAsString) {
				o.request.order = statusAsString;
				dc.modifyRequest({order:statusAsString},true);
			}				
		}				
	}
	
	
	// shorthands
	var e = events;
	var c = constructors;
	var o = options;
	
	
	var $grid = {};
	
	

	
	
	var dc = {}; // reserved for the DATA CHANNEL
	
	t = {
		firstLoad:true,
		func:function() {}, // reserved for calling functions as this
		request:o.request,
		$grid:{},
		instance:microtime(true),
		selection:{}, // ROWS and row DATA that was selected
		$views:{},
		$filters:{},
		currentFilters:{},
		$scrollbar:{},
		$statusbar:{},
		$indicator:{},
		datachannel:dc,
		deselectAll:function() {
			t.$grid.find("tr").deselectRow(o.events.onDeselect);
		},
		selectAll:function() {
			t.$grid.find("tr").selectRow(o.events.onDeselect);
		},
		refreshGrid:function(data) {
			o.data = data;
			o.reconstruct = true;
			o.existingGrid = $grid;
			o.selection = t.selection;
			
			t.$grid = $grid = DATA_GRID(o);
			/*{
				reconstruct:true,
				existingGrid:o.existingGrid,
				path:o.path,
				selection:o.selection,
				hiddenFields:o.hiddenFields,
				operations:o.operations,
				useOperations:o.useOperations,
				imagesPath:o.imagesPath,
				operationImages:o.operationImages,
				fieldActions:o.fieldActions,
				showHeader:o.showHeader,
				header:o.header,
				data:o.data,
				isSelectable:o.isSelectable,
				isReordable:o.isReordable,
				animDuration:o.animDuration,
				events:o.events,
				height:o.height,
				applyStripes:o.applyStripes,
				useHoverMarker:o.useHoverMarker
			}*/
			
	
			
			// COLUMN SORTING OPTIONS
			columnSorterOptions['sortStatus'] = t.sortStatus;
			$grid.find("thead").columnSorter(columnSorterOptions);

		},
		construct:function() {
			$parent.addClass("dataviewer");
			
			$parent.hide();
			
			for (var x in c) {
				$parent.append(c[x]());
			}
		
			
			$grid = new DATA_GRID();
			
			t.gridEvents = {
				keydown: (o.useKeys) ? keyNavigation : false,
				mousewheel: scrollNavigation
			}		

			$grid
			.mouseover(function() {
				$grid.bindEvents(t.gridEvents);
			})
			.mouseout(function() {
				$grid.unbindEvents(t.gridEvents);
			});
			
			// $parent.find(".data-container").children().remove();
			t.$datacontainer.append($grid);
			
			
			// LOADING INDICATOR
			t.$indicator = $('<span>');
			t.$indicator.insertAfter($parent);
		
			t.$indicator.addClass("indicator").show();
			
			var req = o.request;
		
			// data channel
			dc = new DATA_CHANNEL({
				readAll:o.displayAll,
				initData:o.initData,
				enforceLimitLength:true,
				request:req,
				cacheExpires:o.cacheExpires,
				onSendRequest:function(data,count,start,limit) {
					if (t.$scrollbar) {
						t.$scrollbar.setup(start,limit,count);
					}
					
					if ($grid.length > 0) {
						// SHOW LOADING INDICATOR
						// $grid.stop().animate({opacity:0.4},o.animDuration);
						t.$indicator.show();
					}
				},
				onDataReady:function(data,count,start,limit,currentLimit) {
					t.refreshGrid(data);
					t.$scrollbar.setup(start,limit,count);
					
					if (currentLimit > 0) {
						t.$statusbar.html("" + (start+1) + " - " + (start+currentLimit) + " / " + count );
						t.$prev.css("visibility","visible");
						t.$next.css("visibility","visible");
					} else {
						t.$statusbar.html("No data");
						t.$prev.css("visibility","hidden");
						t.$next.css("visibility","hidden");
					}
					t.$skipto.val(start+1);
					if (t.$recordsperview.val() == 0) t.$recordsperview.val(limit);
					t.$indicator.hide();
					// $grid.stop().animate({opacity:1},o.animDuration);
					
					if (t.firstLoad) {
						$parent.fadeIn(o.animDuration);
						t.$datacontainer.append(t.$indicator);
						t.firstLoad = false;
					}
				},
				autoLoad:false
			});
			
			dc.sendRequest();
			
			t.datachannel = dc;
			
			
		}
	
	}
	
	

	// prevent mousewheel events if not available
	if (typeof $.fn.mousewheel != 'function' && o.useMouseWheel) { o.useMouseWheel = false;}
	

	
	//parent.dataviewer = this;
	t.construct();
	
	
	$grid[0].__dw__ = t;
	$parent[0].__dw__ = t;

	return t;
}


$.DATA_VIEWER_USER_DEFAULTS = false;
$.DATAVIEWER_GLOBAL_OPTIONS = {eventsEnabled:true};
$.fn.dataviewer = function (options,userDefaults) {
	var options = options;
	
	if (options == 'defaults' && typeof userDefaults == 'object') {
		$.DATA_VIEWER_USER_DEFAULTS = userDefaults;
		return true;
	}
	
	/*
	if ($(this).length == 1) {		
		if (this[0].dataviewer) {
			return this[0].dataviewer;
		}
	}
	*/
	$(this).each(function() {
		
		this.dataviewer = new DATA_VIEWER(this,options,$.DATA_VIEWER_USER_DEFAULTS);
	});
	return this;
}


$.fn.getDataviewer = function () {
	return this[0].__dw__;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AUXILIARY FUNCTIONS AND EXTENSIONS

var constructUpdateRequest = function(obj) {
	var updateRequest = {
							action:obj.action,
							ids:obj.ids,
							additional:obj.additional
						};
						
	for (x in obj.updates) {
		updateRequest['updates['+x+']'] = obj.updates[x];
	}
	return updateRequest;
}

var getGridFromRow = function(tr) {
	return  $(tr).parent().parent();
}

var getGridFromCell = function(td) {
	return  $(td).parent().parent().parent();
}

var getDataviewerFromRow=function(tr) {
	return getGridFromRow(tr).getDataviewer();
}

var getDataviewerFromCell=function(td) {
	return getGridFromCell(td).getDataviewer();
}

var getDatachannelFromRow = function(tr) {
	return getDataviewerFromRow(tr).datachannel;
}

var getDatachannelFromCell = function(td) {
	return getDataviewerFromCell(td).datachannel;
}


$.fn.updateField = function(content,action,refresh,additional) {
	var $td = $(this);
	var $tr = $td.parent();
	if (typeof action == 'undefined') {action = 'update'};
	if (typeof content == 'undefined') {content = $td.html();}
	if (typeof additional == 'undefined') {additional = false;}
	var DC = getDatachannelFromCell($td);

	var updates = {};
	updates[$td.getFieldName()] = content;

	DC.sendUpdate(constructUpdateRequest({
		action:action,
		ids:[$tr.getId()],
		updates:updates,
		additional:additional
	}),refresh);
}


$.fn.deleteRecord = function(action) {
	var DC = getDatachannelFromRow(this);
	if (typeof action == 'undefined') {action = 'update'};
	DC.sendUpdate({
		action:action,
		ids:$(this).getId()
	},true);
}



var DV_FieldConstructors = {
	filetypeicon:function(data) {
		var path = $.DATA_VIEWER_USER_DEFAULTS.path+'images/fileicons';
		var available = {"7z":1,"ai":1,"aiff":1,"asc":1,"audio":1,"bin":1,"bz2":1,"c":1,"cfc":1,"cfm":1,"chm":1,"class":1,"conf":1,"cpp":1,"cs":1,"css":1,"csv":1,"deb":1,"divx":1,"doc":1,"dot":1,"eml":1,"enc":1,"file":1,"gif":1,"gz":1,"hlp":1,"htm":1,"html":1,"image":1,"iso":1,"jar":1,"java":1,"jpeg":1,"jpg":1,"js":1,"lua":1,"m":1,"mm":1,"mov":1,"mp3":1,"mpg":1,"odc":1,"odf":1,"odg":1,"odi":1,"odp":1,"ods":1,"odt":1,"ogg":1,"pdf":1,"pgp":1,"php":1,"pl":1,"png":1,"ppt":1,"ps":1,"py":1,"ram":1,"rar":1,"rb":1,"rm":1,"rpm":1,"rtf":1,"sig":1,"sql":1,"swf":1,"sxc":1,"sxd":1,"sxi":1,"sxw":1,"tar":1,"tex":1,"tgz":1,"txt":1,"vcf":1,"video":1,"vsd":1,"wav":1,"wma":1,"wmv":1,"xls":1,"xml":1,"xpi":1,"xvid":1,"zip":1};
		var type = 'file';
		if (typeof data == 'string') {
			var ext = data.split('.').pop();
			if (available[ext]) type = ext;
		}
		
		return $('<img>').attr({src:path+'/'+type+'.png',width:16,height:16});
	},
	tick:function(data) {
		var path = $.DATA_VIEWER_USER_DEFAULTS.path;
		var $img = $('<img>');
		$img.attr({src:path + (((data==0) ? 'images/no.gif' : 'images/yes.gif' ))});
		return $img;
	},
	toggler:function(data) {
		var $input = $('<input>').click(function() {
			var $td = $(this).parent();
			$td.updateField($(this).attr("checked") ? 1 : 0, 'update',false);
		}).attr({type:'checkbox',checked:data!=0}).val("1");
		return $input;
	},
	uniqueToggler:function(data,fieldName,instance_id) {
		var fieldName = fieldName+'_'+instance_id;
		var $input = $('<input>').click(function() {
			var $td = $(this).parent();
			$td.updateField($(this).attr("checked") ? 1 : 0, 'update',false,'unique');
		}).attr({type:'radio',checked:data!=0,name:fieldName}).val("1");
		return $input;
	},
	baloon:function(data) {
		var $span =  $('<span>').css({width:'100%',height:'100%',display:'inline-block'});
		$span.html((data.length>0) ? data : "-");
		$span.baloon({shortView:true,maxLength:50});
		return $span; 
	},
	contentEditable:function(data) {
		var span_css = {width:'100%',height:'100%',display:'block',cursor:'text'};
		var $span =  $('<span>').css(span_css);
			$span.html((data.length>0) ? data : "-");
		
		$span.baloon({shortView:true,maxLength:50,onEditStart:function() {
			$.DATAVIEWER_GLOBAL_OPTIONS.eventsEnabled=false;
		},onEditComplete:function(content,$div) {
			var $td = $span.parent();
			$td.updateField(content,'update',false);
			
			$.DATAVIEWER_GLOBAL_OPTIONS.eventsEnabled=true;
		}
		});
		return $span; 
	},
	inlineEditable:function(data,onClick) {
						
		var span_css = {width:'100%',height:'100%',display:'block',cursor:'text'};
		var onClick = onClick;
		var $span =  $('<span>').css(span_css).addClass("DV_inline_editable");
		$span.html((data.length>0) ? data : "-");
		
		$span.click(function() {
			$(".DV_inline_input").remove();
			var lastValue = $span.html();
			var $input = $('<input>').attr({type:'text'}).addClass("DV_inline_input");

			$input.val($span.html());
			var $td = $(this).parent();
			
			$input.css({
				width:($td.width())+'px',
				height:($td.height())+'px',
				display:'inline',
				position:'absolute',
				zIndex:100,
				padding:0,
				margin:0,
				top:$td.offset().top,
				left:$td.offset().left,
				border:'1px solid #aaaaaa',
				fontSize:$td.css("fontSize"),
				fontFamily:$td.css("fontFamily"),
				textAlign:$td.css("text-align")
			});
			//$span.hide();
			
			$("body").append($input);
			
			$input.show().topZIndex();
			$input.select();
			
			$.DATAVIEWER_GLOBAL_OPTIONS.eventsEnabled=false;
			
			var keyDownFunc = $input[0].keyDownFunc = function(e) {
				switch (e.keyCode) {
					case 27:
						$(this).blur();
					break;
					case 13:
						if (lastValue !== $(this).val()) {
							$td.updateField($(this).val(),'update',false);
							$span.html($(this).val());
						}
						$(this).blur();
					break;
					// 22:46 8.12.2010.
					case 9:
						if (lastValue !== $(this).val()) {
							$td.updateField($(this).val(),'update',false);
							$span.html($(this).val());
						}
						$(this).blur();
						
						// tab and shift+tab switchthru elements
						var direction = ($.iskeydown("shift")) ? -1 : 1;
						var $inls = $span.closest("table").find(".DV_inline_editable");
						var $next = false;
						$span.addClass("DV_current_element");
						$inls.each(function(index,el) {
							if ( $(this).hasClass("DV_current_element")) {
								$($inls[index+direction]).click();
								return false;
							}
						})
						$span.removeClass("DV_current_element");
						
						return false;
					break;
				}
			};
			
			$input.keydown(keyDownFunc);
			
			$input.blur(function() {
				$span.show().css(span_css);
				$input.hide();
				$.DATAVIEWER_GLOBAL_OPTIONS.eventsEnabled=true;
			});
			$input.run(onClick);
		});
		return $span;
	},
	inlineEditableDatePicker:function(data) {
		var $span =  DV_FieldConstructors.inlineEditable(data,function() {
			var $input = $(this);
			$(this).datepicker({onSelect:function() {
				$input[0].keyDownFunc({keyCode:13});
			}});
			$(this).datepicker("show");
		});
		
		return $span;
	},
	description:function(data) {
		return data.substring(0,50)+'...';
	},
	image:function(data) {
		return $('<img>').attr({src:'../photos/thumbs/'+data,width:40,height:40});
	},
	select:function(list,enumType) {
		var list = list;
		var enumType = enumType;
		return function (data) {
			var $select = $('<select>');
			var $option = $('<option>');
			for (var x in list) {
				var prop = (enumType) ? list[x] : x;
				var $option = $('<option>').attr({value:prop}).html(list[x]);
				$select.append($option);
			}
			$select.val(data)
			
			$select.change(function() {			
				var $td = $(this).parent();
				$td.updateField($(this).val(),'update',false);
			});
			
			return $select;
		}
	}
}

$.fn.baloon = function(options) {
		
	var o = options;
	$(this).each(function() {
		var $parent = $(this);
		
		$parent.css({position:'relative'});
		
		var defaults = {
			content:$(this).html(),
			shortContent:$(this).html(),
			shortView:true,
			maxLength:0,
			displayEvent:'mouseenter',
			hideEvent:'mouseleave',
			animDuration:300,
			displayDuration:1000,
			globalEffect:true,
			showWhenFull:false,
			editable:true,
			onEditStart:function() {},
			onEditComplete:function() {},
			cancelEditText:'Cancel',
			doneEditText:'Done',
			editWidth:'400px',
			editHeight:'200px'
		}
		
		var o = defaults;
		for (x in options) o[x] = options[x];
	
		function shorten () {
			var content = o.content;
			var maxLength = o.maxLength;
			if (maxLength > 0 && content.length > maxLength) {
				o.shortContent = content.substring(0,maxLength-3)+'...';
				fullyShown = false;
			} else {
				o.shortContent = content;
				fullyShown = true;
			}
		}
		
		var fullyShown = true;

		
		var attachEvents = true;
		shorten(o.content,o.maxLength);
		
		
		var $div = $('<div>');
		
		$parent.html("");
		$div.addClass("baloon").html(o.content);
		
		
				
		
		var $acronym = $('<acronym>');
		$acronym
		.html(o.shortContent);
		
		$parent.append($acronym).append($div);
		
		$div.hide();
		
		
		var showing = false;
		var shown = false;
		var displayFunction = function() {
			$('.baloon.shown').each(function() { if (!$(this).hasClass("editing") ) $(this).hide(); });
			if (showing || shown || fullyShown || $('.baloon.editing').length>0) return true;
			if (o.globalEffect) $('.baloon').each(function() { if (!$(this).hasClass("editing") ) $(this).hide(); });
			showing = true;
			$div.topZIndex();
			$div.fadeIn(o.animDuration,function() {
				showing = false;
				shown = true;
				$div.addClass("shown");
				setTimeout(function() {
					shown = showing = false;
					hideFunction();
					
				},2000);
			});

		}
				
		var hideFunction = function() {
			if (shown && !editing) {
				$div.hide();
				showing = false;
				shown = false;
				$div.removeClass("editing").removeClass("shown");
			}
		}
	
	
		//if (attachEvents) {
			$parent
				.bind(o.displayEvent,displayFunction)
				.bind(o.hideEvent,hideFunction)
			;
		//}

		
		
		
		if (o.editable) {
			var editFunction = function() {
				
				if (editing) return true;
				$div.show();
				$div.addClass("editing");
				
				o.onEditStart();
				editing=true;
				$div.unbind(o.hideEvent,hideFunction);
				var content = $div.html();
				var $txt = $('<textarea>').val(content);
				
				$txt.css({width:o.editWidth,height:o.editHeight});
				$div.html("");
				$div.append($txt);
				
				$done = $('<a>').click(function() {
					o.content = content = $txt.val();
					shorten();
					$acronym.html(o.shortContent);
					
					var r = o.onEditComplete(content,$div.parent());
					if (r !== false) $div.html(content);
					shown = true;
					showing = editing = false;
					hideFunction();
				}).attr({href:'javascript:'}).html(o.doneEditText);
				$cancel = $('<a>').click(function(){
					$div.html(content);
					shown = true;
					showing = editing = false;
					hideFunction();
				}).attr({href:'javascript:'}).html(o.cancelEditText);
				
				$div.append($('<br />')).append($cancel).append($('<span> | </span>')).append($done);
			}
			var editing = false;
			$div.dblclick(editFunction);
			$acronym.dblclick(editFunction);
		}
		
	});
}