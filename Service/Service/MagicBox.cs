using System;
using System.Collections.Generic;
using System.Linq;

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
        public IEnumerable<Pattern> GetPatterns(IEnumerable<Point> set)
        {
            var patterns = new List<Pattern>();
            var points = set.ToArray();

            for (int i = 1; i < points.Length; i++)
            {
                var origin = points[i - 1];
                var res = Calculate(origin, i, points);
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
                decimal slope = 0;
                if (x == 0) slope = (decimal)int.MaxValue;
                else slope = y / x;
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

                    var pts = new ArraySegment<decimal[]>(slopes, i - ci, ci)
                        .Select(_ => points[(int)_[0]]);
                    pts.Append(origin);
                    result.Add(new Pattern(pts));

                    ci = 1;
                }
                else ci++;
            }
            return result;
        }
    }
}
