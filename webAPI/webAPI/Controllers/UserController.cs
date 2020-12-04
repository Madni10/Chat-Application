using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webAPI.Entities;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly chatAppDBContext _context;

        public UserController(chatAppDBContext context)
        {
            _context = context;
        }
        
        [HttpPost("checkLogin/")]
        public async Task<ActionResult<object>> checkLogin(Users user)
        {
            try
            {
                var allUsers = await _context.Users.ToListAsync();
                var currentUser = allUsers.Where(a => a.Username == user.Username && a.Password == user.Password).FirstOrDefault();
                object objUser = new object();
                if(currentUser != null)
                {
                    objUser = new
                    {
                        Status = true,
                        id = currentUser.Id,
                        username = currentUser.Username
                    };

                    return objUser;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
                
            }
        }

        [HttpPost("registerUser/{user?}")]
        public async Task<ActionResult<bool>> registerUser(Users user)
        {
            try
            {
                var allUsers = await _context.Users.ToListAsync();
                var currentUser = allUsers.Where(a => a.Email == user.Email).FirstOrDefault();
                if(currentUser == null)
                {
                    Users newUser = new Users();
                    newUser.Email = user.Email;
                    newUser.Username = user.Username;
                    newUser.Password = user.Password;
                    _context.Users.Add(newUser);
                    int success = _context.SaveChanges();
                    if(success > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                return false;
            }
        }
        
        [HttpGet("getAllUsers")]
        public async Task<ActionResult<IEnumerable<Users>>> getAllUsers()
        {
            return await _context.Users.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> getUserbyId(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<Users>> addUser(Users user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { Id = user.Id }, user);
        }
    }
}
