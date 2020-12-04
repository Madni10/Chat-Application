using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Entities
{
    public partial class Message
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }
        [Column("SENDERID")]
        public int? SenderId { get; set; }
        [Column("RECEIVERID")]
        public int? ReceiverId { get; set; }
        [Column("MESSAGEBODY")]
        public string Messagebody { get; set; }

        [ForeignKey(nameof(ReceiverId))]
        [InverseProperty(nameof(Users.MessageReceiver))]
        public virtual Users Receiver { get; set; }
        [ForeignKey(nameof(SenderId))]
        [InverseProperty(nameof(Users.MessageSender))]
        public virtual Users Sender { get; set; }
    }
}
