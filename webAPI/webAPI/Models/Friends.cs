using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class Friends
    {
        [Key]
        public int Id { get; set; }
        
        public int FriendOneId { get; set; }
        
        public int FriendTwoId { get; set; }
    }
}
