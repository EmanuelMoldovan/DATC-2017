using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System;

namespace FullStack
{
    static class Program
    {
        private static string _rawDataUrl = "https://phmparking.firebaseio.com/raw-data/.json";
        private static string _pastDataUrl = "https://phmparking.firebaseio.com/past-data/.json";
        private static string _finalDataUrl = "https://phmparking.firebaseio.com/parking-data";
        private static string _databaseUrl = "https://phmparking.firebaseio.com/.json";

        static void Main(string[] args)
        {            
            while (true)
            {
                var dictionary = GetData();

                var json = EditLastDataFromList(dictionary.LastOrDefault());

                Update(json, dictionary.LastOrDefault().Key);
            }  
        }

        public static KeyValuePair<T, V> CastFrom<T, V>(Object obj)
        {
            return (KeyValuePair<T, V>)obj;
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

                //dynamic dynJson = JsonConvert.DeserializeObject<dynamic>(json);
                //foreach (object item in dynJson)
                //{
                //    var type = CastFrom<string,object>(item);

                //    //var myString = item.Key;

                //    //Console.WriteLine(myItem.date + " " + myItem.time + " " + myItem.sensors );
                //}

                return elist;
            }           
        }

        public static string EditLastDataFromList(KeyValuePair<string, SensorsData> obj)
        {
            var nr = obj.Value.sensors.Count();
            float[] parcari = new float[nr];

            var index = 0;
            foreach (var item in obj.Value.sensors)
            {
                if (item <= 7 && item >= 0)
                {
                    parcari[index++] = 1;
                }
                else
                {
                    parcari[index++] = 0;
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

            using (var wb = new WebClient())
            {
                var response = wb.UploadData(_finalDataUrl + "/" + id + "/.json", "PUT", buffer);
            }
        }
    }
}
