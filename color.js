function ColorRadians(radians)
{
	var offset = radians/Math.PI/2.0;
	if( offset < 0)
	{
		radians += Math.Round(Math.abs(offset)+1)*Math.PI*2
	}
	
	radians = radians % (Math.PI*2)
 	var h = radians/Math.PI/2.0;
	  h = h*6
	  var c = 1
	  var x = 1 - Math.abs((h % 2) - 1)
	  var r = 0;
	  var g = 0;
	  var b = 0;
	  if  ( h < 1)
	  { 
	  	r = c;
	  	g = x;
	  }
	  else if(h < 2)
	{
		r = x;
		g = c;
	}
	else if(h < 3)
	{
		g = c;
		b = x;
	}
	else if(h < 4)
	{
		g = x;
		b = c;

	}
	else if(h < 5)
	{
		r = x;
		b = c;

	}
	else
	{
		r = c;
		b = x;

	}
	r = 255*r;
	g = 255*g;
	b = 255*b;
	  return [r,g,b]

}

function ColorMultiply(rgb,magnify)
{
	r = Math.max( Math.min(rgb[0]*magnify,255),0)
	g = Math.max(Math.min(rgb[1]*magnify,255),0)
	b = Math.max(Math.min(rgb[2]*magnify,255),0)
	
 	return [r,g,b]
}

function ColorRadians2(radians)
{
  PI = Math.PI

  r = (Math.sin(radians + 2*PI*0/3)+1 )/2* 255
  g = (Math.sin(radians + 2*PI*1/3)+1 )/2* 255
  b = (Math.sin(radians + 2*PI*2/3)+1 )/2* 255

  return [r,g,b]
}

function ColorAdd(rgb,rgb2)
{
	var out = [0,0,0]
    out[0] = Math.min(rgb[0] + rgb2[0],255)
    out[1] = Math.min(rgb[1] + rgb2[1],255)
    out[2] = Math.min(rgb[2] + rgb2[2],255)
    
    out[0] = Math.max(out[0],0)
    out[1] = Math.max(out[1],0)
    out[2] = Math.max(out[2],0)
    return out;
}
function HexToColor(hex)
{
    var out = [0,0,0]
    out[0] = parseInt('0x' + hex[1] + hex[2])
    out[1] = parseInt('0x' + hex[3] + hex[4])
    out[2] = parseInt('0x' + hex[6] + hex[5])
    return out;
}
function ColorBlend(rgb2, rgb1, per)
{
    var out = [0,0,0]
    out[0] = rgb1[0]*per + (1-per)*rgb2[0];
    out[1] = rgb1[1]*per + (1-per)*rgb2[1];
    out[2] = rgb1[2]*per + (1-per)*rgb2[2];
    return out;
}
function ColorToHex(rgb)
{
	var round = Math.round;
	var r = rgb[0]
	var g = rgb[1]
	var b = rgb[2]
	rgb = 256*256*round(r) + 256*round(g) + round(b);
	return '#' + (0x1000000 | rgb).toString(16).substring(1)
}

/** Taken from Earl F. Glynn's web page:
* <a href="http://www.efg2.com/Lab/ScienceAndEngineering/Spectra.htm">Spectra Lab Report</a>
* */
function waveLengthToRGB( Wavelength){
    var Gamma = .80;
    var IntensityMax = 255;

	var round = Math.round;
    var factor;
    var Red;
    var Green;
    var Blue;
    if((Wavelength >= 380) && (Wavelength<440)){
        Red = -(Wavelength - 440) / (440 - 380);
        Green = 0.0;
        Blue = 1.0;
    }else if((Wavelength >= 440) && (Wavelength<490)){
        Red = 0.0;
        Green = (Wavelength - 440) / (490 - 440);
        Blue = 1.0;
    }else if((Wavelength >= 490) && (Wavelength<510)){
        Red = 0.0;
        Green = 1.0;
        Blue = -(Wavelength - 510) / (510 - 490);
    }else if((Wavelength >= 510) && (Wavelength<580)){
        Red = (Wavelength - 510) / (580 - 510);
        Green = 1.0;
        Blue = 0.0;
    }else if((Wavelength >= 580) && (Wavelength<645)){
        Red = 1.0;
        Green = -(Wavelength - 645) / (645 - 580);
        Blue = 0.0;
    }else if((Wavelength >= 645) && (Wavelength<781)){
        Red = 1.0;
        Green = 0.0;
        Blue = 0.0;
    }else{
        Red = 0.0;
        Green = 0.0;
        Blue = 0.0;
    };

    // Let the intensity fall off near the vision limits

    if((Wavelength >= 380) && (Wavelength<420)){
        factor = 0.3 + 0.7*(Wavelength - 380) / (420 - 380);
    }else if((Wavelength >= 420) && (Wavelength<701)){
        factor = 1.0;
    }else if((Wavelength >= 701) && (Wavelength<781)){
        factor = 0.3 + 0.7*(780 - Wavelength) / (780 - 700);
    }else{
        factor = 0.0;
    };


    var rgb = [0,0,0];

    // Don't want 0^x = 1 for x <> 0
    rgb[0] = Red==0.0 ? 0   : round(IntensityMax * Math.pow(Red   * factor, Gamma));
    rgb[1] = Green==0.0 ? 0 : round(IntensityMax * Math.pow(Green * factor, Gamma));
    rgb[2] = Blue==0.0 ? 0  : round(IntensityMax * Math.pow(Blue  * factor, Gamma));

    return rgb;
}
