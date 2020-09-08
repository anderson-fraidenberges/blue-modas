using System.Threading.Tasks;
using Api.Models;
using Api.Repositories.Contracts;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace Api.Controllers
{
    [Route("api/[controller]")]    
    public class ControlAccessController : Controller
    {
        private readonly IApplicationAccessControlRepository _controlAccessRepository;        
        public ControlAccessController(IApplicationAccessControlRepository controlAccessRepository)
        {
            _controlAccessRepository = controlAccessRepository;
        }

        [Route("authenticate")]
        [AllowAnonymous]
        public ActionResult<dynamic> Authenticate([FromHeader(Name = "Access-Aplication-Token")] string token)
        {
            var ctr = new ApplicationAccessControlService(_controlAccessRepository).Get(token);

            if (ctr == null)
                return NotFound(new { message = "Application invalid" });            

            return new { token = TokenService.GenerateToken(ctr) };
        }
    }

}