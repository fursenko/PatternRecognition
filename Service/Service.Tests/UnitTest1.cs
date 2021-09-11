using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace Service.Tests
{
    [TestClass]
    public class MainTest
    {
        [TestMethod]
        public void TestMethod1()
        {
            /*
             *19000,10000;18000,10000;32000,10000;21000,10000;1234,5678;14000,10000
             */
            var points = new List<Point>();
            var data = "19000,10000;18000,10000;32000,10000;21000,10000;1234,5678;14000,10000".Split(';');
            for (int i = 0; i < data.Length; i++)
            {
                var cell = data[i].Split(',');
                var point = new Point(Convert.ToInt32(cell[0]), Convert.ToInt32(cell[1]));
                points.Add(point);
            }
            Debug.WriteLine("TEST");
            //var magicBox = new MagicBox(points);
            //var result = magicBox.GetPatterns();

            //foreach (var pattern in result)
            //{
            //    foreach (var point in pattern.Data)
            //    {
            //        Debug.WriteLine($"{point.X}, {point.Y}");
            //    }
            //}

        }
    }
}
