using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Entities
{
    public partial class Users
    {
        public Users()
        {
            FriendsFriendone = new HashSet<Friends>();
            FriendsFriendtwo = new HashSet<Friends>();
            MessageReceiver = new HashSet<Message>();
            MessageSender = new HashSet<Message>();
        }

        [Key]
        [Column("ID")]
        public int Id { get; set; }
        [Required]
        [Column("USERNAME")]
        public string Username { get; set; }
        [Column("EMAIL")]
        public string Email { get; set; }
        [Required]
        [Column("PASSWORD")]
        public string Password { get; set; }

        [InverseProperty(nameof(Friends.Friendone))]
        public virtual ICollection<Friends> FriendsFriendone { get; set; }
        [InverseProperty(nameof(Friends.Friendtwo))]
        public virtual ICollection<Friends> FriendsFriendtwo { get; set; }
        [InverseProperty(nameof(Message.Receiver))]
        public virtual ICollection<Message> MessageReceiver { get; set; }
        [InverseProperty(nameof(Message.Sender))]
        public virtual ICollection<Message> MessageSender { get; set; }
    }
}
