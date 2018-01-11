using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;
using System.Threading;
using System.Configuration;



namespace Data2Cloud
{

    

    public partial class Form1 : Form
    {
        private static string Url = "https://phmparking.firebaseio.com/raw-data/.json";

        public string[] sensor = new string[6];
        public float[] sensors = new float[] { -1, -1, -1, -1, -1 };
        public int btn_active = 0;

        public Form1()
        {
            InitializeComponent();
            var ports = SerialPort.GetPortNames();
            comboBox1.Items.AddRange(ports);
        }


        delegate void SetTextCallback(string text);
        delegate void SetTextCallback2(string s);



        void availableports()
        {
            string[] ArrayComPortsNames = null; // Salveaza denumirile porturilor fizice
            ArrayComPortsNames = SerialPort.GetPortNames();
            comboBox1.Items.Clear();
           foreach (string portName in ArrayComPortsNames)
            {
                comboBox1.Items.Add(portName);
            }
            comboBox1.SelectedIndex = 0;
            // Conectarea obiectului serialPort1 cu portul fizic prin denumirea portului fizic
            serialPort1.PortName = comboBox1.Text; 
            
        }


        delegate void updateLabelTextDelegate(string newText);
        private void updateLabel8Text(string newText)
        {
     
            if (label8.InvokeRequired)
            {
                // this is worker thread
                updateLabelTextDelegate del = new updateLabelTextDelegate(updateLabel8Text);
                label8.Invoke(del, new object[] { newText });
            }
            else
            {
                // this is UI thread
                label8.Text = newText;
            }
        }

        private void updateLabel9Text(string newText)
        {

            if (label9.InvokeRequired)
            {
                // this is worker thread
                updateLabelTextDelegate del = new updateLabelTextDelegate(updateLabel9Text);
                label9.Invoke(del, new object[] { newText });
            }
            else
            {
                // this is UI thread
                label9.Text = newText;
            }
        }
        private void updateLabel10Text(string newText)
        {

            if (label10.InvokeRequired)
            {
                // this is worker thread
                updateLabelTextDelegate del = new updateLabelTextDelegate(updateLabel10Text);
                label10.Invoke(del, new object[] { newText });
            }
            else
            {
                // this is UI thread
                label10.Text = newText;
            }
        }
        private void updateLabel11Text(string newText)
        {

            if (label11.InvokeRequired)
            {
                // this is worker thread
                updateLabelTextDelegate del = new updateLabelTextDelegate(updateLabel11Text);
                label11.Invoke(del, new object[] { newText });
            }
            else
            {
                // this is UI thread
                label11.Text = newText;
            }
        }
        private void updateLabel12Text(string newText)
        {

            if (label12.InvokeRequired)
            {
                // this is worker thread
                updateLabelTextDelegate del = new updateLabelTextDelegate(updateLabel12Text);
                label12.Invoke(del, new object[] { newText });
            }
            else
            {
                // this is UI thread
                label12.Text = newText;
            }
        }

        private void SerialPort1_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            string txt = "";
            string new_info = string.Empty;

            new_info = serialPort1.ReadExisting().ToString();

            if (new_info.StartsWith("Sensor 1"))
            {
                updateLabel8Text(new_info.Substring(10));
                txt = new_info.Substring(10);
                var text = txt.Split(' ');
                float senzor1 = -1;
                try
                {
                    senzor1 = float.Parse(text[0]);
                }
                catch
                {

                }

                sensors[0] = senzor1;
            }
            else if (new_info.StartsWith("Sensor 2"))
            {
                updateLabel9Text(new_info.Substring(10));
                txt = new_info.Substring(10);
                var text = txt.Split(' ');
                float senzor2 = -1;
                try
                {
                    senzor2 = float.Parse(text[0]);
                }
                catch
                {

                }

                sensors[1] = senzor2;
            }
            else if (new_info.StartsWith("Sensor 3"))
            {
                updateLabel10Text(new_info.Substring(10));
                txt = new_info.Substring(10);
                var text = txt.Split(' ');
                float senzor3 = -1;
                try
                {
                    senzor3 = float.Parse(text[0]);
                }
                catch
                {

                }

                sensors[2] = senzor3;
            }
            else if (new_info.StartsWith("Sensor 4"))
            {
                updateLabel11Text(new_info.Substring(10));
                txt = new_info.Substring(10);
                var text = txt.Split(' ');
                float senzor4 = -1;
                try
                {
                    senzor4 = float.Parse(text[0]);
                }
                catch
                {

                }

                sensors[3] = senzor4;
            }
            else if (new_info.StartsWith("Sensor 5"))
            {
                updateLabel12Text(new_info.Substring(10));
                txt = new_info.Substring(10);
                var text = txt.Split(' ');
                float senzor5 = -1;
                try
                {
                    senzor5 = float.Parse(text[0]);
                }
                catch
                {

                }

                sensors[4] = senzor5;
            }

            new_info = string.Empty;

        }


        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            serialPort1.Close();
            serialPort1.PortName = comboBox1.Text;
            propertyGrid1.SelectedObject = serialPort1;
            serialPort1.Open();
            timer1.Start();
        }
        

        static void Upload(string data)
        {
            var buffer = Encoding.UTF8.GetBytes(data);

            using (var wb = new WebClient())
            {
                var response = wb.UploadData(Url, "POST", buffer);
            }
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if(btn_active == 1)
            {
                var json = Newtonsoft.Json.JsonConvert.SerializeObject(new
                {
                    sensors = sensors,
                    timestamp = DateTime.Now.ToString("HH:mm:ss"),
                    date = DateTime.Now.ToString("dd.MM.yyyy")
                });

                Upload(json);
            }
            
        }

        private void send2cloud_button_Click(object sender, EventArgs e)
        {
            if(btn_active == 0)
            {
                btn_active = 1;
                send2cloud_button.Text = "Stop Uploading";
                send2cloud_button.BackColor = Color.LimeGreen;
            }
            else
            {
                btn_active = 0;
                send2cloud_button.Text = "Start Uploading";
                send2cloud_button.BackColor = Color.Red;
            }
        }
    }
}

