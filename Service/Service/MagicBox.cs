using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service
{
    class SlopesComparer : IComparer<decimal[]>
    {
        public int Compare(decimal[] x, decimal[] y)
        {
            if (x[1] > y[1]) return 1;
            else if (x[1] < y[1]) return -1;
            else return 0;
        }
    }

    public class MagicBox
    {
        private Point[] _points;

        public MagicBox(IEnumerable<Point> points)
        {
            _points = points.ToArray();
            Array.Sort(_points);
        }

        public IEnumerable<Pattern> GetPatterns()
        {
            var patterns = new List<Pattern>();

            for (int i = 1; i < _points.Length; i++)
            {
                var origin = _points[i - 1];
                var res = Calculate(origin, 0, _points);
                patterns.AddRange(res);
            }

            return patterns;
        }

        public IEnumerable<Pattern> Calculate(Point origin, int start, Point[] points)
        {
            var x0 = origin.X;
            var y0 = origin.Y;
            var result = new List<Pattern>();
            var slopes = new decimal[points.Length - start][];
            int j = 0;
            for (int i = start; i < points.Length; i++, j++)
            {
                decimal y = points[i].Y - y0;
                decimal x = points[i].X - x0;
                decimal slope = y / ((x == 0) ? (decimal)int.MaxValue : x);
                slopes[j] = new decimal[2] { i, slope };
            }

            Array.Sort(slopes, new SlopesComparer());

            var current = slopes[0];
            int ci = 1;
            for (int i = 1; i < slopes.Length; i++)
            {
                if (current[1] != slopes[i][1] || i == slopes.Length - 1)
                {
                    if (ci < 4)
                    {
                        current = slopes[i];
                        ci = 1;
                        continue;
                    }

                    var segment = new ArraySegment<decimal[]>(slopes, i - ci, ci);
                    var pts = new List<Point>();

                    foreach (var item in segment)
                        pts.Add(_points[(int)item[0]]);

                    result.Add(new Pattern(pts));

                    ci = 1;
                }
                else ci++;
            }
            return result;
        }
    }
}
