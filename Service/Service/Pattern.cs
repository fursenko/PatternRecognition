using System.Collections.Generic;

namespace Service
{
    public class Pattern
    {
        public IEnumerable<Point> Data { get; set; }
        public Pattern(IEnumerable<Point> pattern)
        {
            Data = pattern;
        }
    }
}