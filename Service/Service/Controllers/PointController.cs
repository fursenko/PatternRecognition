using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PointController: ControllerBase
    {
        [HttpGet]
        [Route("random")]
        public IEnumerable<Point> Random(int n, int x, int y)
        {
            var list = new List<Point>();
            var random = new Random();
            for (int i = 0; i < n; i++)
                list.Add(new Point(random.Next(1, x), random.Next(1, y)));

            return list;
        }

        [HttpPost]
        [Route("run")]
        public IEnumerable<Pattern> Run([FromBody]RunRequest request)
        {
            var mb = new MagicBox();
            return mb.GetPatterns(request.Data);
        }
    }
}
