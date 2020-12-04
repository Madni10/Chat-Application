using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webAPI.Hubs;
using webAPI.Entities;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController : ControllerBase 
    {
        private readonly chatAppDBContext _context;
        //protected readonly IHubContext<ChatHub> _ChatHub;

        public FriendController(chatAppDBContext context)
        {
            _context = context;
        }

        [HttpPost("AddAsFriend/{request?}")]
        public async Task<ActionResult<bool>> AddAsFriend(Friends request)
        {
            try
            {
                var allFriendships = await _context.Friends.ToListAsync();
                var currentFriendship = allFriendships.Where(a => a.FriendOneId == request.FriendOneId && a.FriendTwoId == request.FriendTwoId).FirstOrDefault();
                if (currentFriendship == null)
                {
                    Friends newFriendship = new Friends();
                    newFriendship.FriendOneId = request.FriendOneId;
                    newFriendship.FriendTwoId = request.FriendTwoId;
                    _context.Friends.Add(newFriendship);
                    int success = _context.SaveChanges();
                    if (success > 0)
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

        [HttpPost("getFriends/{request?}")]
        public async Task<ActionResult<object>> GetFriends(Friends request)
        {
            try
            {
                var allfriendships = await _context.Friends.ToListAsync();
                var currentFriendshipsOneIds = allfriendships.Where(a => a.FriendOneId == request.FriendOneId).Select(z=>z.FriendTwoId).ToList();   //request.friend1 id is current user id
                var currentFriendshipsTwoIds = allfriendships.Where(a => a.FriendTwoId == request.FriendOneId).Select(z=>z.FriendOneId).ToList();   //request.friend1 id is current user id
                var allUsers = _context.Users.Where(a=>a.Id != request.FriendOneId).ToList();

                List<Users> allFriendsOne = allUsers.Where(a => currentFriendshipsOneIds.Contains(a.Id)).ToList();
                List<Users> allFriendstwo = allUsers.Where(a => currentFriendshipsTwoIds.Contains(a.Id)).ToList();

                allFriendsOne.AddRange(allFriendstwo);

                var notFriends = allUsers.Except(allFriendsOne).ToList();

                object lists = new
                {
                    FriendList = allFriendsOne,
                    UnknownList = notFriends
                };

                return lists;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

       
    }
}
