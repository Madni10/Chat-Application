using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webAPI.Hubs;
using webAPI.Entities;
namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        //protected readonly IHubContext<ChatHub> _ChatHub;
        private readonly chatAppDBContext _context;


        public ChatController(chatAppDBContext context)


        {
            //_ChatHub = ChatHub;
            _context = context;
        }

        //[HttpPost("Sendchat/{message?}")]
        //public async Task<IActionResult> Sendchat(Message message)
        //{
        //    await _ChatHub.Clients.All.SendAsync("ReceiveMessage", message.MessageText);
        //    return Ok();
        //}

        [HttpPost("SaveMessages/{messages?}")]
        public async Task<ActionResult<bool>> SaveMessages(Message message)
        {
            try
            {
                    var msg = new Message();
                    msg.SenderId = message.SenderId;
                    msg.ReceiverId= message.ReceiverId;
                    msg.Messagebody= message.Messagebody;
                     _context.Message.Add(msg);

                int success = _context.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        [HttpPost("GetMessages/{messages?}")]
        public async Task<ActionResult<List<Message>>> GetMessages(Message messages){
            try
            {
                var allMessages =  _context.Message.ToList();
                List<Message> currentSender = allMessages.Where(a => a.SenderId == messages.SenderId && a.ReceiverId == messages.ReceiverId).ToList();
                List<Message> currentReceiver = allMessages.Where(a => a.ReceiverId == messages.SenderId && a.SenderId == messages.ReceiverId).ToList();
                List<Message> filterMsgs = new List<Message>(); 
                if(currentSender.Count < 1 && currentReceiver.Count > 1)
                {
                    return currentReceiver;
                }
                else if(currentReceiver.Count < 1 && currentSender.Count > 1)
                {
                    return currentSender;
                }

                filterMsgs = currentSender.Concat(currentReceiver).OrderBy(a=>a.Id).ToList();
                return filterMsgs;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }
    }
}
