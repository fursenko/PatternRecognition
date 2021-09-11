namespace Service
{
    public class Edge
    {
        public Point V { get; set; }
        public Point W { get; set; }
        public Edge(Point v, Point w)
        {
            if(v.CompareTo(w) < 0)
            {
                V = v;
                W = w;
            }
            else
            {
                V = w;
                W = v;
            }
        }

        public override string ToString()
        {
            return $"{V.ToString()};{W.ToString()}";
        }
    }
}
