using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System;
using System.Threading;

namespace FullStack
{
    static class Program
    {
        private static string quote = "\"";
        private static string _rawDataUrl = "https://phmparking.firebaseio.com/raw-data/.json?orderBy=" + quote + "$key" + quote + "&limitToLast=1";
        private static string _pastDataUrl = "https://phmparking.firebaseio.com/past-data/.json";
        private static string _finalDataUrl = "https://phmparking.firebaseio.com/parking-data";
        private static string _databaseUrl = "https://phmparking.firebaseio.com/.json";

        private static DateTime now;

        static void Main(string[] args)
        {            
            while (true)
            {
                var dictionary = GetData();
                now = DateTime.Now.ToUniversalTime();

                var json = EditLastDataFromList(dictionary.LastOrDefault());

                Update(json, dictionary.LastOrDefault().Key);
            }  
        }

        
        static Dictionary<string, SensorsData> GetData()
        {
            var request = (HttpWebRequest)WebRequest.Create(_rawDataUrl);
            request.ContentType = "application/json: charset-utf-8";
            var response = request.GetResponse() as HttpWebResponse;

            using (var responseStream = response.GetResponseStream())
            {
                var read = new StreamReader(responseStream, Encoding.UTF8);
                var json = read.ReadToEnd();

                var elist = JsonConvert.DeserializeObject<Dictionary<string, SensorsData>>(json);
                

                return elist;
            }           
        }

        public static string EditLastDataFromList(KeyValuePair<string, SensorsData> obj)
        {
            var nr = obj.Value.sensors.Count();
            float[] parcari = new float[nr];

            var index = 0;
            var year = Convert.ToInt32(obj.Value.date.Split('.')[2]);
            var month = Convert.ToInt32(obj.Value.date.Split('.')[1]);
            var day = Convert.ToInt32(obj.Value.date.Split('.')[0]);

            var hour = Convert.ToInt32(obj.Value.timestamp.Split(':')[0]);
            var minutes = Convert.ToInt32(obj.Value.timestamp.Split(':')[1]);
            var seconds = Convert.ToInt32(obj.Value.timestamp.Split(':')[2]);

            var date = new DateTime(year, month, day, hour, minutes, seconds).ToUniversalTime();
            var elapsed = (now.AddHours(2) - date).TotalSeconds;
            //var elapsed = (now - date).TotalSeconds;

            Console.WriteLine(date);
            Console.WriteLine(now);
            Console.WriteLine(elapsed);

            if (elapsed > 10)
            {
                for (int i = 0; i < parcari.Length; i++)
                {
                    parcari[i] = -1;
                }
            }
            else
            {
                foreach (var item in obj.Value.sensors)
                {
                    if (item <= 10 && item >= 0)
                    {
                        parcari[index++] = 1;
                    }
                    else if (item == -1)
                    {
                        parcari[index++] = -1;
                    }
                    else
                    {
                        parcari[index++] = 0;
                    }

                }
            }                        
            
            return Newtonsoft.Json.JsonConvert.SerializeObject(parcari);
        }

        static void Upload(string data)
        {
            var buffer = Encoding.UTF8.GetBytes(data);

            using (var wb = new WebClient())
            {
                var response = wb.UploadData(_finalDataUrl + "/.json", "POST", buffer);
            }
        }

        static void Update(string data, string id)
        {
            var buffer = Encoding.UTF8.GetBytes(data);

            var wb = new WebClient();

            wb.UploadData(new Uri(_finalDataUrl + "/date" + "/.json"), "PUT", buffer);                

        }
    }
}
