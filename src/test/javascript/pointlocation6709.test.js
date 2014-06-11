var PointLocation6709TestCase = new YAHOO.tool.TestCase({

  name: "PointLocation6709 Tests",

  _should: {
    error: {
      testLatitudeClassOutOfRange: true,
      testLongitudeClassOutOfRange: true
    }
  },

  testFieldClass: function() {
    var Assert = YAHOO.util.Assert;
    var field1 = new Field(4, 'microseconds', '~');
    Assert.areEqual(4, field1.ordinal(), "Field ordinal does not match");
    Assert.areEqual('microseconds', field1.name(), "Field name does not match");
    Assert.areEqual('~', field1.toString(), "Field symbol does not match");
  },

  testFieldClassPrivateMembers: function() {
    var Assert = YAHOO.util.Assert;
    var field1 = new Field(4, 'microseconds', '~');
    Assert.isUndefined(field1._ordinal);
    Assert.isUndefined(field1._name);
    Assert.isUndefined(field1._symbol);
  },

  testFieldClassContants: function() {
    var Assert = YAHOO.util.Assert;
    Assert.areEqual('degrees', Field.DEGREES.name(), "Field name does not match");
  },

  testAngleClass: function() {
  var Assert = YAHOO.util.Assert;

    var angle1 = new Angle(1);
    Assert.areEqual(1, angle1.getRadians(), "Radians do not match");
    Assert.areEqual("57° 17\" 45'", angle1.toString(), "Degrees do not match");

    var angle2 = new Angle(-1);
    Assert.areEqual(-1, angle2.getRadians(), "Radians do not match");
    Assert.areEqual("-57° 17\" 45'", angle2.toString(), "Degrees do not match");
  },

  testAngleClassPrivateMembers: function() {
    var Assert = YAHOO.util.Assert;
    var angle1 = new Angle(1);
    Assert.isUndefined(angle1._radians);
  },

  testAngleClassConstructors: function() {
  var Assert = YAHOO.util.Assert;

    var angle1 = Angle.fromRadians(1);
    Assert.areEqual(1, angle1.getRadians(), "Radians do not match");

    var angle2 = Angle.fromDegrees(1);
    Assert.areEqual(1, angle2.getDegrees(), "Degrees do not match");
  },

  testLatitudeClass: function() {
  var Assert = YAHOO.util.Assert;

    var latitude1 = new Latitude(Angle.fromRadians(1));
    Assert.areEqual(1, latitude1.getRadians(), "Radians do not match");
    Assert.areEqual("N", latitude1.getDirection(), "Latitude does not match");
    Assert.areEqual("57° 17\" 45' N", latitude1.toString(), "Latitude does not match");

    var latitude2 = new Latitude(Angle.fromRadians(-1));
    Assert.areEqual(-1, latitude2.getRadians(), "Radians do not match");
    Assert.areEqual("S", latitude2.getDirection(), "Latitude does not match");
    Assert.areEqual("57° 17\" 45' S", latitude2.toString(), "Latitude does not match");
  },

  testLatitudeClassOutOfRange: function() {
  var Assert = YAHOO.util.Assert;

    var latitude1 = new Latitude(Angle.fromRadians(3));
    Assert.areEqual(4, latitude1.getRadians(), "Radians do not match");
  },

  testLongitudeClass: function() {
  var Assert = YAHOO.util.Assert;

    var longitude1 = new Longitude(Angle.fromRadians(1));
    Assert.areEqual(1, longitude1.getRadians(), "Radians do not match");
    Assert.areEqual("E", longitude1.getDirection(), "Longitude does not match");
    Assert.areEqual("57° 17\" 45' E", longitude1.toString(), "Longitude does not match");

    var longitude2 = new Longitude(Angle.fromRadians(-1));
    Assert.areEqual(-1, longitude2.getRadians(), "Radians do not match");
    Assert.areEqual("W", longitude2.getDirection(), "Longitude does not match");
    Assert.areEqual("57° 17\" 45' W", longitude2.toString(), "Longitude does not match");
  },

  testLongitudeClassOutOfRange: function() {
  var Assert = YAHOO.util.Assert;

    var longitude1 = new Longitude(Angle.fromRadians(4));
    Assert.areEqual(4, longitude1.getRadians(), "Radians do not match");
  }

});

YAHOO.tool.TestRunner.add(PointLocation6709TestCase);
