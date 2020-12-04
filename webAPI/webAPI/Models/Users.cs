using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(max)")]
        public string Username { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string Password { get; set; }
    }
}
