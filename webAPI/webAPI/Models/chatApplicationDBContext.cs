using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webAPI.Models
{
    public class chatApplicationDBContext:DbContext
    {
        public chatApplicationDBContext(DbContextOptions<chatApplicationDBContext> options) : base(options)
        {

        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Friends> Friends { get; set; }
        public DbSet<Message> Message { get; set; }
    }
}
