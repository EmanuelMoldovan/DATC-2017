const int TRIG1_PIN = 2;
const int ECHO1_PIN = 3;
const int TRIG2_PIN = 4;
const int ECHO2_PIN = 5;
const int TRIG3_PIN = 9;
const int ECHO3_PIN = 10;
const int TRIG4_PIN = 6;
const int ECHO4_PIN = 7;

String sensors_data;
// Anything over 400 cm (23200 us pulse) is "out of range"
const unsigned int MAX_DIST = 23200;

void setup() {

  // The Trigger pin will tell the sensor to range find
  pinMode(TRIG1_PIN, OUTPUT);
  digitalWrite(TRIG1_PIN, LOW);
  pinMode(TRIG2_PIN, OUTPUT);
  digitalWrite(TRIG2_PIN, LOW);
  pinMode(TRIG3_PIN, OUTPUT);
  digitalWrite(TRIG3_PIN, LOW);
  pinMode(TRIG4_PIN, OUTPUT);
  digitalWrite(TRIG4_PIN, LOW);

  // We'll use the serial monitor to view the sensor output
  Serial.begin(9600);
}


void loop() {
  //Serial.print("Sensor 1: ");
  sensors_data+="Sensor 1: ";
  SonarSensor(TRIG1_PIN, ECHO1_PIN);
    // Wait at least 60ms before next measurement
  delay(60);

  //Serial.print("Sensor 2: ");
  sensors_data+="Sensor 2: ";
  SonarSensor(TRIG2_PIN, ECHO2_PIN);
    // Wait at least 60ms before next measurement
  delay(60);

    //Serial.print("Sensor 3: ");
    sensors_data+="Sensor 3: ";
  SonarSensor(TRIG3_PIN, ECHO3_PIN);
    // Wait at least 60ms before next measurement

    //Serial.print("Sensor 4: ");
    sensors_data+="Sensor 4: ";
  SonarSensor(TRIG4_PIN, ECHO4_PIN);
    // Wait at least 60ms before next measurement
  Serial.println(sensors_data);
  delay(500);
  sensors_data = " ";
}

void SonarSensor(int trig_pin, int echo_pin)
{
  unsigned long pulse_width;
  float cm;

  // Hold the trigger pin high for at least 10 us
  digitalWrite(trig_pin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig_pin, LOW);

  // Wait for pulse on echo pin
  // Measure how long the echo pin was held high (pulse width)
  // Note: the micros() counter will overflow after ~70 min
  pulse_width = pulseIn(echo_pin, HIGH, 40000);

  /* Calculate distance in centimeters and inches. The constants
     are found in the datasheet, and calculated from the assumed speed 
     of sound in air at sea level (~340 m/s).*/
  cm = pulse_width / 58.0;

  // Print out results
  if( (pulse_width > MAX_DIST) || (pulse_width == 0)) 
  {
    sensors_data += "Out of range ";
    //Serial.println("Out of range");
  } 
  else 
  {
    sensors_data+= cm;
    //Serial.print(cm);
    sensors_data += " cm ";  
    //Serial.println(" cm");   
  }
}
