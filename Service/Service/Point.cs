using System;

namespace Service
{

    public class Point : IComparable<Point>
    {
        public int X { get; set; }
        public int Y { get; set; }

        public Point(int x, int y)
        {
            X = x;
            Y = y;
        }

        public int CompareTo(Point other)
        {
            if (Y < other.Y) return -1;
            else if (Y == other.Y)
            {
                if (X < other.X) return -1;
                else if (X == other.X) return 0;
                else return 1;
            }
            else return 1;
        }

        public override string ToString()
        {
            return $"{X},{Y}";
        }
    }
}
