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

namespace Data2Cloud
{

    

    public partial class Form1 : Form
    {

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

        private void SerialPort1_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            string txt = "", new_info;
            new_info = serialPort1.ReadExisting().ToString();
            txt += new_info;

            if (new_info.Contains("Sensor 1"))
            {
                updateLabel8Text(new_info.Substring(10));
            }
            else if (new_info.Contains("Sensor 2"))
            {
                updateLabel9Text(new_info.Substring(10));
            }
            else if (new_info.Contains("Sensor 3"))
            {
                updateLabel10Text(new_info.Substring(10));
            }
            else if (new_info.Contains("Sensor 4"))
            {
                updateLabel10Text(new_info.Substring(10));
            }
            else if (new_info.Contains("Sensor 5"))
            {
                updateLabel10Text(new_info.Substring(10));
            }

        }


        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            serialPort1.Close();
            serialPort1.PortName = comboBox1.Text;
            propertyGrid1.SelectedObject = serialPort1;
            serialPort1.Open();

        }


    }
}
