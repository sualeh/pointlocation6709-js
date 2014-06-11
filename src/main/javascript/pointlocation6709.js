var Field = function(ordinal, name, symbol) {

  var _name = name;
  var _ordinal = ordinal;
  var _symbol = symbol;

  this.ordinal = function() {
    return _ordinal;
  };

  this.name = function() {
    return _name;
  };

  this.toString = function() {
    return _symbol;
  };

};

Field.DEGREES = new Field(0, 'degrees', '\u00B0');
Field.MINUTES = new Field(1, 'minutes', '"');
Field.SECONDS = new Field(2, 'seconds', '\'');



/**
* Represents an angle in degrees or radians. Has convenience methods to do
* trigonometric operations, and normalizations.
*
* @author Sualeh Fatehi
*/
var Angle = function(radians) {

  var _radians = radians;

  this.getDegrees = function() {
    return _radians * 180.0 / Math.PI;
  };

  this.getRadians = function() {
    return _radians;
  };

  this.checkRange = function(range) {
    var degrees = this.getDegrees();
    if (Math.abs(degrees) > range) {
      throw new Error("" + degrees + Field.DEGREES.toString() + " is out of range, +/-" + range + Field.DEGREES.toString());
    }
  };

  this.sin = function() {
    return Math.sin(_radians);
  };

  this.cos = function() {
    return Math.cos(_radians);
  };

  this.getDirection = function() {
    return null;
  };

  this.getField = function(field) {
    /// <summary>Gets an angle field - such as degrees, minutes, or seconds. Signs
    /// will be consistent.</summmary>
    /// <param name="field">One of the field constants specifying the field to be
    ///        retrieved.</parameter>
    /// <return>Value of the specified field.</return>

    /**
    * Splits a double value into it's sexagesimal parts. Each part has the same
    * sign as the provided value.
    *
    * @param value
    *          Value to split
    * @return Split parts
    */
    function sexagesimalSplit(value) {

      var absValue;
      var units;
      var minutes;
      var seconds;
      var sign = value < 0 ? -1 : 1;

      // Calculate absolute integer units
      absValue = Math.abs(value);
      units = Math.floor(absValue);
      seconds = Math.round((absValue - units) * 3600.0);

      // Calculate absolute integer minutes
      minutes = seconds / 60; // Integer arithmetic
      if (minutes == 60) {
        minutes = 0;
        units++;
      }
      minutes = Math.floor(minutes);

      // Calculate absolute integer seconds
      seconds = seconds % 60;

      // Correct for sign
      units = units * sign;
      minutes = minutes * sign;
      seconds = seconds * sign;

      return [units, minutes, seconds];

    }
    return sexagesimalSplit(this.getDegrees())[field.ordinal()];
  };

  this.toString = function() {
    var absIntDegrees = Math.abs(this.getField(Field.DEGREES));
    var absIntMinutes = Math.abs(this.getField(Field.MINUTES));
    var absIntSeconds = Math.abs(this.getField(Field.SECONDS));
    var direction = this.getDirection();

    var angleString = "" + absIntDegrees + Field.DEGREES.toString() + " " + absIntMinutes + Field.MINUTES.toString();
    if (absIntSeconds > 0) {
      angleString = angleString + " " + absIntSeconds + Field.SECONDS.toString();
    }
    if (direction === null) {
      if (this.getRadians() < 0) {
        angleString = '-' + angleString;
      }
    }
    else {
      angleString = angleString + " " + direction;
    }

    return angleString;
  };

};


/**
* Static construction method, constructs an angle from the degree
* value provided.
*
* @param degrees
*        Value of the angle in degrees.
* @return A new Angle.
*/
Angle.fromDegrees = function(degrees) {
  return Angle.fromRadians(degrees * Math.PI / 180.0);
};

/**
* Static construction method, constructs an angle from the radian
* value provided.
*
* @param radians
*        Value of the angle in radians.
* @return A new Angle.
*/
Angle.fromRadians = function(radians) {
  return new Angle(radians);
};


/**
* Represents a latitude in degrees or radians.
*
* @author Sualeh Fatehi
*/
var Latitude = function(angle) {

  var latitude = new Angle(angle.getRadians());

  latitude.checkRange(90);

  latitude.getDirection = function() {
    if (latitude.getRadians() < 0) {
      return "S";
    }
    else {
      return "N";
    }
  };

  return latitude;

};

/**
* Represents a longitude in degrees or radians.
*
* @author Sualeh Fatehi
*/
var Longitude = function(angle) {

  var longitude = new Angle(angle.getRadians());

  longitude.checkRange(180);

  longitude.getDirection = function() {
    if (longitude.getRadians() < 0) {
      return "W";
    }
    else {
      return "E";
    }
  };

  return longitude;

};
