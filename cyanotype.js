import processing.serial.*;
import codeanticode.syphon.*;

SyphonServer server;

Serial myPort;

int sensor0 = 0;
int sensor1 = 0;
int sensor2 = 0;
int sensor3 = 0;
int sensor4 = 0;
int sensor5 = 0;

float val0 = 0;
float val1 = 0;
float val2 = 0;
float val3 = 0;
float val4 = 0;
float val5 = 0;

float v0 = 0;
float v1 = 0;
float v2 = 0;
float v3 = 0;
float v4 = 0;
float v5 = 0;

float blue1;
float blue2;
float blue3;
float blue4;
float blue5;
float blue6;
float vb;

void settings () {
  size(400, 225, P3D);
  //fullScreen(P3D);
  PJOGL.profile=1;
}

void setup () {
  noCursor();
  server = new SyphonServer(this, "Processing Syphon");
  //fullScreen();

  println(Serial.list());
  myPort = new Serial(this, Serial.list()[3], 9600);
  myPort.bufferUntil('\n');
  background(0);
}

void draw () {

  //  background(, 200);

  noStroke();

  color from = color(9, 22, 48);
  color to = color(178, 204, 255);
  color inter1 = lerpColor(from, to, blue1);
  color inter2 = lerpColor(from, to, blue2);
  color inter3 = lerpColor(from, to, blue3);
  color inter4 = lerpColor(from, to, blue4);
  color inter5 = lerpColor(from, to, blue5);
  color inter6 = lerpColor(from, to, blue6);


  val0 = float(sensor0);
  val1 = float(sensor1);
  val2 = float(sensor2);
  val3 = float(sensor3);
  val4 = float(sensor4);
  val5 = float(sensor5);

  v0 = map (val0, 0, 1023, 0.8, 0);
  v1 = map (val1, 0, 1023, 0.8, 0);
  v2 = map (val2, 0, 1023, 0.8, 0);
  v3 = map (val3, 0, 1023, 0.8, 0);
  v4 = map (val4, 0, 1023, 0.8, 0);
  v5 = map (val5, 0, 1023, 0.8, 0);

  //vb = map (val1, 0, 1023, 1, 0);

  blue1 = v0;
  blue2 = v1;
  blue3 = v2;
  blue4 = v3;
  blue5 = v4;
  blue6 = v5;





  fill(inter1);
  rectMode(CENTER);
  rect((width/2-75), height/2, 50, height-150);

  fill(inter2);
  rectMode(CENTER);
  rect(width/2-25, height/2, 50, height-150);

  fill(inter3);
  rectMode(CENTER);
  rect((width/2+25), height/2, 50, height-150);

  fill(inter4);
  rectMode(CENTER);
  rect((width/2+75), height/2, 50, height-150);

  fill(inter5);
  rectMode(CENTER);
  rect((width/2+125), height/2, 50, height-150);

  fill(inter6);
  rectMode(CENTER);
  rect((width/2-125), height/2, 50, height-150);

  print(inter1 +  inter2 +  inter3 + inter4 + inter5 +  inter6 );
  //println(blue);

  server.sendScreen();
}

void serialEvent (Serial myPort) {
  String inString = myPort.readStringUntil('\n');

  if (inString != null) {
    inString = trim(inString);
    int[] sensors = int(split(inString, ","));
    if (sensors.length >=6) {
      sensor0 = sensors[0];
      sensor1 = sensors[1];
      sensor2 = sensors[2];
      sensor3 = sensors[3];
      sensor4 = sensors[4];
      sensor5 = sensors[5];
    }
  }
}
