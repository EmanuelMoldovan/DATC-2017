using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullStack
{
    class SensorsData
    {
        public SensorsData()
        {
            //Sensors = new List<float>();                
        }

        public string id { get; set; }

        public float[] sensors { get; set; }

        public string timestamp { get; set; }

        public string date { get; set; }
    }
}
