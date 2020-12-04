using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Entities
{
    public partial class Friends
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }
        [Column("FRIENDONEID")]
        public int? FriendOneId { get; set; }
        [Column("FRIENDTWOID")]
        public int? FriendTwoId { get; set; }

        [ForeignKey(nameof(FriendOneId))]
        [InverseProperty(nameof(Users.FriendsFriendone))]
        public virtual Users Friendone { get; set; }
        [ForeignKey(nameof(FriendTwoId))]
        [InverseProperty(nameof(Users.FriendsFriendtwo))]
        public virtual Users Friendtwo { get; set; }
    }
}
