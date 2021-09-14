using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using JetBrains.dotMemoryUnit;

namespace Service.Tests
{
    [TestClass]
    public class MainTest
    {
        [TestMethod]
        [DotMemoryUnit(CollectAllocations = true)]
        public void GetPatternsTest_1K()
        {
            var list = new List<Point>();
            var random = new Random();
            for (int i = 0; i < 1000; i++)
                list.Add(new Point(random.Next(1, 1000), random.Next(1, 1000)));

            var ts = new Stopwatch();
            ts.Start();
            var mb = new MagicBox();
            var result = mb.GetPatterns(list);
            ts.Stop();
            Assert.IsTrue(result != null && result.Any());
            Debug.WriteLine(ts.ElapsedMilliseconds);
        }

        [TestMethod]
        [DotMemoryUnit(CollectAllocations = true)]
        public void GetPatternsTest_10K()
        {
            var list = new List<Point>();
            var random = new Random();
            for (int i = 0; i < 10000; i++)
                list.Add(new Point(random.Next(1, 1000), random.Next(1, 1000)));

            var ts = new Stopwatch();
            ts.Start();
            var mb = new MagicBox();
            var result = mb.GetPatterns(list);
            ts.Stop();
            Assert.IsTrue(result != null && result.Any());
            Debug.WriteLine(ts.ElapsedMilliseconds);

        }
    }
}
